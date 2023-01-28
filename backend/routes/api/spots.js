const express = require('express')

const { requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');
const { Op } = require("sequelize");
const { check } = require('express-validator');
const { validationResult } = require('express-validator');

const router = express.Router();

const bodyValidation = (req, _res, next) => {
  const validErrors = validationResult(req);

  if (!validErrors.isEmpty()) {
    const errors = validErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = Error('Validation Error');
    err.errors = errors;
    err.status = 400;
    next(err)
  }
  next();
}

const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage("City is required"),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage("State is required"),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check('lat')
    .exists({ checkFalsy: true })
    .withMessage("Latitude is not valid"),
  check('lng')
    .exists({ checkFalsy: true })
    .withMessage("Longitude is not valid"),
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  bodyValidation
];

// Get all spots
router.get('/', requireAuth, async (req, res) => {

  const allSpots = await Spot.findAll({
    include: [
      {
        model: Review
      },
      {
        model: SpotImage
      }
    ]
  });

  let spotsArray = []
  allSpots.forEach(spot => {
    spotsArray.push(spot.toJSON())
  })

  spotsArray.forEach(spot => {
    spot.SpotImages.forEach(image => {
      if (image.preview === true) {
        spot.previewImage = image.url
      }
    })
    delete spot.SpotImages
  })

  for (let spot of spotsArray) {
    const avg = await Review.findAll({
      where: {
        spotId: spot.id
      },
      attributes: [
        [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
      ]
    })
    spot.avgRating = avg[0].dataValues.avgRating;
    delete spot.Reviews;
  }

  return res.json(spotsArray)
});



// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
  const userSpots = await Spot.findAll({
    include: [
      { model: User },
      { model: SpotImage },
      { model: Review }
    ],
    where: { ownerId: req.user.id }
  })

  let spotsArray = []
  userSpots.forEach(spot => {
    spotsArray.push(spot.toJSON())
  })

  spotsArray.forEach(spot => {
    spot.SpotImages.forEach(image => {
      if (image.preview === true) {
        spot.previewImage = image.url
      }
    })
    delete spot.SpotImages
  })

  for (let spot of spotsArray) {
    const avg = await Review.findAll({
      where: {
        spotId: spot.id
      },
      attributes: [
        [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
      ]
    })
    spot.avgRating = avg[0].dataValues.avgRating;
    delete spot.Reviews;
    delete spot.User;
  }


  return res.json(spotsArray)
});

// Get details of a Spot from an Id
router.get('/:id', async (req, res) => {
  let spotId = req.params.id
  let spot = await Spot.findByPk(spotId)

  if (!spot) {
    res.status(404)
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }

  const findSpot = await Spot.findByPk(spotId, {
    attributes: {
      include: [
        [
          sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'
        ],
        [
          sequelize.fn('COUNT', sequelize.col('Reviews.review')), 'numReviews'
        ]
      ]
    },
    include: {
      model: Review,
      attributes: []
    }
  });

  const spotImg = await findSpot.getSpotImages({
    attributes: {
      exclude: ['spotId', 'createdAt', 'updatedAt']
    }
  })

  if (findSpot) {
    return res.json({
      findSpot,
      spotImg
    })
  }
});

// Create a Spot
router.post('/', requireAuth, validateSpot, async (req, res) => {
  const ownerId = req.user.id
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const newSpot = await Spot.create({
    ownerId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  })

  res.status(201)
  res.json(newSpot)
});

// Add an Image to a Spot based on the Spot's id
router.post('/:id/images', requireAuth, async (req, res) => {

  let spotId = req.params.id
  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    res.status(404)
    return res.json("Spot couldn't be found")
  }
  const { url, preview } = req.body;

  const newImg = await SpotImage.create({
    spotId,
    url,
    preview
  })
  return res.json(newImg)

});

// Edit a spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
  let spotId = req.params.spotId
  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }

  if (req.user.id !== spot.ownerId) {
    return res.json("Spot must belong to current user")
  }

  const { ownerId, address, city, state, country, lat, lng, name, description, price } = req.body

  spot.set({
    ownerId: req.body.ownerId,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    lat: req.body.lat,
    lng: req.body.lng,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  })

  if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
    return res.json({
      message: "Validation error",
      statusCode: 404
    })
  }


  await spot.save()

  return res.json(spot)
});

// Delete a spot
router.delete('/:spotId', requireAuth, async (req, res) => {
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId);

  if (req.user.id !== spot.ownerId) {
    return res.json("Spot must belong to current user")
  }

  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  } else {
    await spot.destroy();
    res.status(200)
    return res.json({
      message: "Successfully deleted",
      statusCode: 200
    })
  }

});

// Get all reviews by a spot's id
router.get('/:spotId/reviews', async (req, res) => {
  let spotId = req.params.spotId
  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }

  const spotReviews = await Review.findAll({
    where: {
      spotId: spot.id
    },
    include: {
      model: User,
      attributes: {
        exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt']
      }
    }
  })

  // work on returning ReviewImages

  return res.json({
    spotReviews,
    //reviewImg
  })
});

// Create a review for a spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId)
  const userId = req.user.id

  const { review, stars } = req.body

  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot could not be found",
      statusCode: 404
    })
  }

  if (!review || stars < 1 || stars > 5) {

  }

  const newReview = await Review.create({
    spotId,
    userId,
    review,
    stars
  })


  //check if user has already reviewed spot
  // add body validation errors

  res.json(newReview)
})

// Get all bookings for a Spot based on Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
  let spotId = req.params.spotId
  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }

  if (spot.ownerId != req.user.id) {
    const bookings = await Booking.findAll({
      where: {
        spotId: spotId
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'userId']
      }
    })
    res.status(200)
    return res.json(bookings)
  } else {
    const bookings = await Booking.findAll({
      where: {
        spotId: spotId
      },
      include: {
        model: User,
        attributes: {
          exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt']
        }
      }
    })
    res.status(200)
    return res.json(bookings)
  }
});

// create and return a new booking from a spot specified by id
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId);
  const userId = req.user.id

  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  };

  if (userId === spot.ownerId) {
    const err = new Error()
    err.status = 403;
    err.title = "Authorization error";
    err.message = "You cannot make a reservation for a spot you own";
    return next(err);
  };

  const { startDate, endDate } = req.body

  const newBooking = await Booking.create({
    userId,
    spotId,
    startDate,
    endDate
  })

  // add body validation errors, booking conflict

  return res.json(newBooking)
});





module.exports = router;
