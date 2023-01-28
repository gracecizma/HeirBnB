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
    attributes: {
      exclude: ['spotId']
    },
    include: {
      model: Spot,
      attributes: {
        exclude: ['description', 'createdAt', 'updatedAt']
      }
    }
  })

  let bookingArr = []
  for (let booking of userBookings) {
    let bookingJSON = booking.toJSON()
    bookingJSON.startDate = bookingJSON.startDate.toISOString()
    bookingJSON.startDate = bookingJSON.startDate.slice(0, 10)

    bookingJSON.endDate = bookingJSON.endDate.toISOString()
    bookingJSON.endDate = bookingJSON.endDate.slice(0, 10)
    //console.log(bookingJSON)

    let previewImages = await booking.Spot.getSpotImages()
    //console.log(previewImages)
    let imageJSON = previewImages[0].toJSON()
    //console.log(imageJSON)
    bookingJSON.Spot['previewImage'] = imageJSON.url

    bookingArr.push(bookingJSON)
  }
  if (!userBookings) {
    res.json('User has no bookings')
    return
  }
  res.json({ 'Bookings': bookingArr })
});

// Edit a booking
router.put('/:bookingId', requireAuth, async (req, res) => {
  const bookingId = req.params.bookingId;
  const booking = await Booking.findByPk(bookingId);
  const userId = req.user.id;


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
      message: "You can't edit a booking that is not yours",
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

  const { startDate, endDate } = req.body

  booking.set({
    spotId: booking.spotId,
    userId: userId,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  })

  await booking.save()

  // can't edit a booking that happened in the past
  // can't conflict with existing booking

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

  }
  const spot = await Spot.findOne({
    where: {
      id: delBooking.spotId
    }
  });

  // console.log(req.user.id);
  // console.log(spot.ownerId);

  if (delBooking.userId !== req.userId || spot.ownerId !== req.user.id) {
    res.status(400);
    return res.json({
      message: "You do not have authorization to delete this booking"
    });
  }

  if (delBooking.startDate.getTime() <= new Date().getTime() &&
    new Date().getTime() < delBooking.endDate.getTime()) {
    res.status(403);
    return res.json({
      message: "Bookings that have been started can't be deleted",
      statusCode: 403
    });
  }

  await delBooking.destroy();

  res.status(200);
  return res.json({
    message: "Successfully deleted",
    statusCode: 200
  })
});


module.exports = router;
