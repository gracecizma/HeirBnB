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


  return res.json(allReviews)
});

// Add an image to a Review based on the review's id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
  const reviewId = req.params.reviewId
  const foundReview = await Review.findByPk(reviewId);

  if (!foundReview) {
    res.status(404);
    return res.json({
      message: "Review couldn't be found",
      statusCode: 404
    })
  }

  let reviewCount = await ReviewImage.count({
    where: {
      reviewId: reviewId
    }
  })
  console.log(reviewCount)

  if (reviewCount === 10) {
    res.status(403);
    return res.json({
      message: "Maximum number of images for this resource was reached",
      statusCode: 403
    })
  }

  const { url } = req.body;

  const newImg = await ReviewImage.create({
    reviewId,
    url
  })

  return res.json(newImg)
});

// Edit a review
router.put('/:reviewId', requireAuth, async (req, res) => {
  let reviewId = req.params.reviewId;
  const foundReview = await Review.findByPk(reviewId);
  const spotId = foundReview.spotId

  if (!foundReview) {
    res.status(404);
    return res.json({
      message: "Review couldn't be found",
      statusCode: 404
    })
  }

  if (req.user.id !== review.userId) {
    return res.json("Review must belong to current user")
  }

  const { review, stars } = req.body;

  foundReview.set({
    userId: req.user.id,
    spotId: spotId,
    review: req.body.review,
    stars: req.body.stars
  })

  // add body validation errors

  await foundReview.save()

  return res.json(foundReview)
});

// Delete a review
router.delete('/:reviewId', requireAuth, async (req, res) => {
  const reviewId = req.params.reviewId;
  const foundReview = await Review.findByPk(reviewId);

  if (req.user.id !== foundReview.userId) {
    return res.json("Review must belong to current user")
  }

  if (!foundReview) {
    res.status(404);
    return res.json({
      message: "Review couldn't be found",
      statusCode: 404
    })
  } else {
    await foundReview.destroy();
    res.status(200)
    return res.json({
      message: "Successfully deleted",
      statusCode: 200
    })
  }
});





module.exports = router;
