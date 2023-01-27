const express = require('express')

const { requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, sequelize } = require('../../db/models');
const { Op } = require("sequelize");
// const user = require('../../db/models/user');
// const review = require('../../db/models/review');

const router = express.Router();

// Get all spots
router.get('/', requireAuth, async (req, res) => {
  const allSpots = await Spot.findAll({
    attributes: {
      include: [
        [
          sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'
        ]

      ]
    },
    include: {
      model: Review,
      attributes: []
    }
  })

  let spotsArray = []
  allSpots.forEach(spot => {
    spotsArray.push(spot.toJSON())
  })
  console.log(spotsArray)


  return res.json(allSpots)
});



// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
  const userSpots = await Spot.findAll({
    include: [
      { model: User }
    ],
    where: { ownerId: req.user.id }
  })
  return res.json(userSpots)
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



module.exports = router;
