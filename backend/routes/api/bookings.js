const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking, Spot, User } = require('../../db/models');

const router = express.Router();


// Get all current user's bookings
router.get('/current', requireAuth, async (req, res, next) => {
  const { user } = req

  let userBookings = await Booking.findAll({
    where: {
      userId: user.id
    },
    include: {
      model: Spot,
      attributes: {
        exclude: ['description', 'createdAt', 'updatedAt']
      }
    }
  });

  if (!userBookings) {
    res.json('User has no bookings')
    return
  };

  let bookingArr = []
  for (let booking of userBookings) {
    let bookingJSON = booking.toJSON()
    bookingJSON.startDate = bookingJSON.startDate.toISOString()
    bookingJSON.startDate = bookingJSON.startDate.slice(0, 10)

    bookingJSON.endDate = bookingJSON.endDate.toISOString()
    bookingJSON.endDate = bookingJSON.endDate.slice(0, 10)
    //console.log(bookingJSON)

    let images = await booking.Spot.getSpotImages()
    //console.log(images)
    let imageJSON = images[0].toJSON()
    //console.log(imageJSON)
    bookingJSON.Spot['previewImage'] = imageJSON.url

    bookingArr.push(bookingJSON)
  }

  res.json({ 'Bookings': bookingArr })
});

// Edit a booking
router.put('/:bookingId', requireAuth, async (req, res) => {
  const bookingId = req.params.bookingId;
  const booking = await Booking.findByPk(bookingId);
  const userId = req.user.id;
  const { startDate, endDate } = req.body


  if (!booking) {
    res.status(404);
    return res.json({
      message: "Booking couldn't be found",
      statusCode: 404
    })
  };

  if (userId != booking.userId) {
    res.status(403);
    return res.json({
      message: "Forbidden",
      statusCode: 403
    })
  };


  if (booking.endDate.getTime() < booking.startDate.getTime()) {
    res.status(400);
    return res.json({
      message: 'Validation error',
      statusCode: 400,
      errors: {
        endDate: 'endDate cannot come before start date'
      }
    })
  };

  if (booking.endDate.getTime() <= new Date().getTime()) {
    res.status(403);
    return res.json({
      message: "Past bookings can't be modified",
      statusCode: 403
    })
  };

  if ((booking.startDate >= startDate && booking.endDate <= endDate) || booking.startDate <= startDate && booking.endDate >= endDate) {
    res.status(403);
    return res.json({
      message: "Sorry, this spot is already booked for the specified dates",
      statusCode: 403,
      errors: {
        startDate: "Start date conflicts with an existing booking",
        endDate: "End date conflicts with an existing booking"
      }
    })
  };

  booking.set({
    spotId: booking.spotId,
    userId: userId,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  })

  await booking.save()

  return res.json(booking)
});

// Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
  const delBooking = await Booking.findByPk(req.params.bookingId);

  if (!delBooking) {
    res.status(404);
    return res.json({
      message: "Booking couldn't be found",
      statusCode: 404
    });

  };

  const spot = await Spot.findOne({
    where: {
      id: delBooking.spotId
    }
  });

  if (delBooking.userId !== req.user.id && spot.ownerId !== req.user.userId) {
    res.status(403);
    return res.json({
      message: "Forbidden",
      statusCode: 403
    })
  };

  if (delBooking.startDate.getTime() <= new Date().getTime() &&
    new Date().getTime() < delBooking.endDate.getTime()) {
    res.status(403);
    return res.json({
      message: "Bookings that have been started can't be deleted",
      statusCode: 403
    });
  };

  await delBooking.destroy();

  res.status(200);
  return res.json({
    message: "Successfully deleted",
    statusCode: 200
  });
});


module.exports = router;
