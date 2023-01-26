const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review } = require('../../db/models');

const router = express.Router();

// Get all spots
router.get('/', requireAuth, async (req, res) => {

  const spots = await Spot.findAll({
    include: {
      model: Review,
    }
  })
  res.json(spots)
})

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
  let findSpot = await Spot.findByPk(req.params.id, {
    include: {
      model: User,
      attributes: {
        exclude: ["username"]
      }
    },
    include: {
      model: SpotImage,
      attributes: {
        exclude: ['spotId', 'createdAt', 'updatedAt']
      }
    }
  });

  if (findSpot) {
    return res.json(findSpot)
  } else {
    res.status(404)
    res.json("Spot couldn't be found")
    return
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

})

module.exports = router;
