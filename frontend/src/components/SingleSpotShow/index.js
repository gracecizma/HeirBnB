import React from "react"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpot } from '../../store/spots'
import { getSpotReviews, getUserReviews, deleteReviewById } from "../../store/reviews";
import './singlespot.css'


export default function SingleSpot() {
  const dispatch = useDispatch()
  const { spotId } = useParams();
  const spotObj = useSelector((state) => state?.spots?.singleSpot)
  const currUser = useSelector((state) => state?.session?.user)
  const userReviews = useSelector((state) => state?.reviews?.user)
  const spotReviews = useSelector((state) => state?.reviews?.spot)

  const reviewsArray = Object.values(spotReviews)
  console.log("spot reviews array", reviewsArray)
  const userReviewsArray = Object.values(userReviews)
  //console.log("user reviews array", userReviewsArray)

  const [hasReviewed, setHasReviewed] = useState(false)

  useEffect(() => {
    dispatch(getSpot(spotId))
  }, [spotId, dispatch]);

  useEffect(() => {
    dispatch(getSpotReviews(spotId))
    dispatch(getUserReviews())

    if (userReviewsArray.some((review) => review.spotId === spotId)) {
      setHasReviewed(true)
    }
  }, [dispatch])


  let image;
  let owner = {};
  if (spotObj.name) {
    image = spotObj.SpotImages[0]?.url
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
  const canReview = (currUser && (spotObj.ownerId !== currUser.id) && !hasReviewed)


  return (
    <>
      <div className="single-spot-div">
        <div className="spot-name">
          {spotObj.name}
        </div>
        <div className="images-container">
          <img className="single-spot-img"
            src={image} />
        </div>
        <div className="spot-owner">
          Hosted By: {owner.firstName} {owner.lastName}
        </div>
        <div className="details-container">
          <div className="spot-location">
            {spotObj.city}, {spotObj.state}, {spotObj.country}
          </div>
          <div className="price-num-reviews">
            <p>
              ${spotObj.price} per night
            </p>
            <p>
              {spotObj.numReviews} reviews
            </p>
          </div>
          <div className="spot-reviews">
            {!spotObj.numReviews && canReview ? 'Be the first to post a review!' : ''}
            {reviewsArray.slice(0).reverse().map(review => (
              <div key={review.id} className="single-review">
                <div>{review.User.firstName}</div>
                <div>{review.createdAt.split('T')[0]}</div>
                <div>{review.review}</div>
                {review.userId === currUser.id && (
                  <button onClick={() => deleteReview(review.id)}>Delete</button>
                )}
              </div>
            ))}
          </div>
          <div className="reserve-button">
            <button onClick={reserveButton}>Reserve</button>
          </div>
        </div>
      </div>
    </>
  )
}
