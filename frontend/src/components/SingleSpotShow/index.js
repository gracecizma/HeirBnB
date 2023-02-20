import React from "react"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpot } from '../../store/spots'
import { getSpotReviews, getUserReviews, deleteReviewById } from "../../store/reviews";
import ReviewModal from "../ReviewModal"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteReviewModal from '../DeleteReviewModal'
import './singlespot.css'


export default function SingleSpot() {
  const dispatch = useDispatch()
  const { spotId } = useParams();
  const spotObj = useSelector((state) => state?.spots?.singleSpot)
  console.log("single spot object", spotObj)
  const currUser = useSelector((state) => state?.session?.user)
  const userReviews = useSelector((state) => state?.reviews?.user)
  //console.log("user review obj", userReviews)
  const spotReviews = useSelector((state) => state?.reviews?.spot)

  const reviewsArray = Object.values(spotReviews)
  //console.log("spot reviews array", reviewsArray)
  const userReviewsArray = Object.values(userReviews)
  //console.log("user reviews array", userReviewsArray)

  const [hasReviewed, setHasReviewed] = useState(false)

  useEffect(() => {
    dispatch(getSpot(spotId))
  }, [spotId, dispatch]);

  useEffect(() => {
    dispatch(getSpotReviews(spotId))
    dispatch(getUserReviews())

  }, [dispatch])

  if (userReviewsArray.some((review) => review.spotId === spotId)) {
    setHasReviewed(true)
  }

  let image;
  let owner = {};
  if (spotObj.SpotImages) {
    spotObj.SpotImages.find(pic => {
      if (pic.preview === true) {
        image = pic.url
      }
    })
    owner = spotObj.Owner
  } else {
    return <h1>Unable to retrieve details. Please try again shortly.</h1>
  }


  const deleteReview = (reviewId) => {
    dispatch(deleteReview(reviewId))
    setHasReviewed(false)
  }

  const reserveButton = () => {
    alert("Feature coming soon")
  }

  // check if current user is signed in, is not the owner of the spot, and has not already reviewed
  const canReview = (currUser && spotObj.ownerId !== currUser.id && !hasReviewed)

  let previewImages = []
  spotObj.SpotImages?.forEach(image => {
    if (image.preview === false) {
      previewImages.push(image)
    }
  })
  //console.log(previewImages)


  return (
    <>
      <div className="single-spot-div">

        <div className="spot-container">
          <div className="name-location">
            <h2 className="spot-name">
              {spotObj.name}
            </h2>
            <div className="spot-location">
              {spotObj.city}, {spotObj.state}, {spotObj.country}
            </div>
          </div>
          <div className="images-container">
            <div className="main-image-container">
              <img className="main-spot-img"
                src={image} alt="main-img" />
            </div>
            <div className="preview-images-container">
              {previewImages.map(image => (
                <img
                  key={image.id}
                  className="preview-image"
                  src={image.url}
                  alt="preview-image"
                />
              ))}
            </div>
          </div>

          <div className="description-reserve-container">
            <div className="reserve-container">
              <div className="price-review-reserve">
                <div className="price-stars">
                  <p className="price-container">
                    ${spotObj.price} per night
                  </p>
                  <div className="reviews-rating">
                    <div className="star-rating-reviews">
                      {spotObj.avgRating ? '★' + Number(spotObj.avgRating).toFixed(1) : '★New'}
                    </div>
                    <p className="num-reviews">
                      {spotObj.numReviews === 1 ? spotObj.numReviews + ' review' : ''}
                      {spotObj.numReviews !== 1 ? spotObj.numReviews + ' reviews' : ''}
                    </p>
                  </div>
                </div>
                <div className="reserve-button-container">
                  <button
                    onClick={reserveButton}
                    className="reserve-button"
                  >Reserve</button>
                </div>
              </div>
            </div>
            <div className="description-container">
              <h3 className="spot-owner">
                Hosted By: {owner.firstName} {owner.lastName}
              </h3>
              <div className="spot-description">
                {spotObj.description}
              </div>
            </div>
          </div>
          <div className="break"></div>
          <div className="reviews-container">
            <div className="post-review-container">
              {canReview && (
                <button className="post-review">
                  <OpenModalMenuItem
                    itemText="Post your review"
                    itemTextClassName="review-button-text"
                    modalComponent={<ReviewModal spotId={spotId} />}
                  />
                </button>
              )}
            </div>
            <div className="spot-reviews-container">
              {!spotObj.numReviews && canReview ? 'Be the first to post a review!' : ''}
              {reviewsArray.slice(0).reverse().map(review => (
                <div key={review.id} className="single-review">
                  <div className="review-name">{review.User?.firstName}</div>
                  <div className="review-date">{review.createdAt.split('T')[0]}</div>
                  <div className="review-text">{review.review}</div>
                  {currUser && review.userId === currUser.id && (
                    <button className="delete-review-button">
                      <OpenModalMenuItem
                        itemText="Delete"
                        modalComponent={<DeleteReviewModal review={review} />}
                      />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>


        </div>
      </div>
    </>
  )
}
