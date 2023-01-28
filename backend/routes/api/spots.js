const express = require('express')

const { requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, sequelize } = require('../../db/models');
const { Op } = require("sequelize");
// const user = require('../../db/models/user');
// const review = require('../../db/models/review');

const router = express.Router();

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
router.post('/', requireAuth, async (req, res) => {
  const { ownerId, address, city, state, country, lat, lng, name, description, price } = req.body;
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

  res.status(200)
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
router.put('/:spotId', requireAuth, async (req, res) => {
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


module.exports = router;
