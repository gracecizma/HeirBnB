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
})

module.exports = router;
