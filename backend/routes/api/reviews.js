const express = require('express')

const { requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, sequelize } = require('../../db/models');
const { Op } = require("sequelize");

const router = express.Router();

// Get all reviews of the Current User
router.get('/current', requireAuth, async (req, res) => {
  const allReviews = await Review.findAll({
    include: [
      {
        model: User
      },
      {
        model: Spot
      },
      {
        model: ReviewImage
      }
    ]
  })


  res.json(allReviews)
});





module.exports = router;
