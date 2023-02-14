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
  console.log("spot", spotObj)
  // const spot = Object.values(spotObj)
  // console.log("spot array", spot)
  let spot = {}
  let image;
  if (spotObj.spotArray) {
    spot = spotObj.spotArray[0]
    image = spotObj.spotArray[0].SpotImages[0].url
  }
  console.log("image", image)


  useEffect(() => {
    dispatch(getSpot(spotId))
  }, [dispatch])


  return (
    <>
      <div className="single-spot-div">
        <div className="spot-name">
          {spot.name}
        </div>
        <div className="spot-location">
          {spot.city}, {spot.state}, {spot.country}
        </div>
        <div className="images-container">
          <img src={image} style={{ width: 700, height: 500 }} />
        </div>
        <div className="details-container">
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
