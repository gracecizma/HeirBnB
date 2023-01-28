const express = require('express')

const { requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');
const { Op } = require("sequelize");
const { check } = require('express-validator');
const { validationResult } = require('express-validator');
const e = require('express');

const router = express.Router();

// delete a review image
router.delete('/:imageId', requireAuth, async (req, res) => {
  const imageId = req.params.imageId;
  const image = await ReviewImage.findByPk(imageId);

  if (!image) {
    res.status(404);
    return res.json({
      message: "Review Image couldn't be found",
      statusCode: 404
    })
  }


  const review = await Review.findOne({
    where: {
      id: image.reviewId
    }
  });

  if (req.user.id != review.userId) {
    res.status(403);
    return res.json({
      message: "Forbidden",
      statusCode: 403
    })
  };


  await image.destroy();
  res.status(200);
  return res.json({
    message: "Successfully deleted",
    statusCode: 200
  })

});


module.exports = router;
