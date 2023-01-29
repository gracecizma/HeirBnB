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

const queryValidator = [
  check('page')
    .optional()
    .isInt({ gt: 1 })
    .withMessage("Page must be greater than or equal to 1"),
  check('size')
    .optional()
    .isInt({ gt: 1 })
    .withMessage("Size must be greater than or equal to 1"),
  check('minLat')
    .optional()
    .isDecimal()
    .withMessage("Minimum latitude is invalid"),
  check('maxLat')
    .optional()
    .isDecimal()
    .withMessage("Maximum latitude is invalid"),
  check('minLng')
    .optional()
    .isDecimal()
    .withMessage("Minimum longitude is invalid"),
  check('maxLng')
    .optional()
    .isDecimal()
    .withMessage("Maximum longitude is invalid"),
  check('minPrice')
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Minimum price must be greater than or equal to 0"),
  check('maxPrice')
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Maximum price must be greater than or equal to 0"),
  bodyValidation
];



// Get all spots
router.get('/', queryValidator, async (req, res) => {

  let pagination = {}
  let { page, size } = req.query
  if (!page) page = 1
  if (!size) size = 20

  if (page >= 1 && size >= 1) {
    pagination.limit = size
    pagination.offset = size * (page - 1)
  }

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
      if (!image.preview) {
        spot.previewImage = "No image found"
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

  return res.json({
    spotsArray,
    page,
    size
  })
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


  return res.json({ spotsArray })
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
  };

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
      exclude: ['id', 'spotId', 'createdAt', 'updatedAt']
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
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }

  if (req.user.id != spot.ownerId) {
    res.status(403);
    return res.json({
      message: "Forbidden",
      statusCode: 403
    })
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
    res.status(403);
    return res.json({
      message: "Forbidden",
      statusCode: 403
    })
  }

  const { ownerId, address, city, state, country, lat, lng, name, description, price } = req.body

  spot.set({
    ownerId: req.user.id,
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

  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  };

  if (req.user.id !== spot.ownerId) {
    res.status(403);
    return res.json({
      message: "Forbidden",
      statusCode: 403
    })
  };

  await spot.destroy();
  res.status(200)
  return res.json({
    message: "Successfully deleted",
    statusCode: 200
  });


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
    include: [
      {
        model: User,
        attributes: {
          exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt']
        }
      },
      { model: ReviewImage }
    ]
  })

  return res.json({ 'Reviews': spotReviews })
})



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
  };

  const findReview = await Review.findOne({
    where: {
      userId: userId,
      spotId: spotId
    }
  })

  if (findReview) {
    res.status(403);
    return res.json({
      message: "User already has a review for this spot",
      statusCode: 403
    })
  };

  const newReview = await Review.create({
    spotId,
    userId,
    review,
    stars
  });

  if (!review || stars < 1 || stars > 5) {
    res.status(400);
    return res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        review: "Review text is required",
        stars: "Stars must be an integer from 1 to 5"
      }
    })
  };

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
    res.status(403);
    return res.json({
      message: "Forbidden",
      statusCode: 403
    })
  };


  const { startDate, endDate } = req.body

  if (endDate.getTime() <= startDate.getTime()) {
    res.status(400);
    return res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        endDate: "endDate cannot be on or before startDate"
      }
    })
  }

  const newBooking = await Booking.create({
    userId,
    spotId,
    startDate,
    endDate
  })


  return res.json(newBooking)
});





module.exports = router;
