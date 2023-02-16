import React from "react"
import { useParams } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpot } from '../../store/spots'
import './singlespot.css'


export default function SingleSpot() {
  const dispatch = useDispatch()
  const { spotId } = useParams();
  const spotObj = useSelector((state) => state.spots.singleSpot)

  let spot = {};
  let images = {};
  let owner = {};
  if (spotObj.spotArray) {
    spot = spotObj.spotArray[0]
    images = spotObj.spotArray[0].SpotImages
    owner = spotObj.spotArray[0].Owner
  }

  useEffect(() => {
    dispatch(getSpot(spotId))
  }, [dispatch])


  return (
    <>
      <div className="single-spot-div">
        <div className="spot-name">
          {spot.name}
        </div>
        <div className="images-container">
          <img className="single-spot-img" src={images[0].url} />
        </div>
        <div className="spot-owner">
          Hosted By: {owner.firstName} {owner.lastName}
        </div>
        <div className="details-container">
          <div className="spot-location">
            {spot.city}, {spot.state}, {spot.country}
          </div>
          <div className="price-reviews">
            <p>
              ${spot.price} per night
            </p>
            <p>
              {spot.numReviews} reviews
            </p>
          </div>
          <div className="reserve-button">
            <button>Reserve</button>
          </div>
        </div>
      </div>
    </>
  )
}
