import React from "react"
import { useParams } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpot } from '../../store/spots'
//import { getAllReviews } from "../../store/reviews";
import './singlespot.css'


export default function SingleSpot() {
  const dispatch = useDispatch()
  const { spotId } = useParams();
  const spotObj = useSelector((state) => state?.spots?.singleSpot)
  console.log("spotObj", spotObj)

  useEffect(() => {
    dispatch(getSpot(spotId))
    //dispatch(getAllReviews(spotId))
  }, [dispatch])

  let image;
  let owner = {};
  if (spotObj.name) {
    image = spotObj.SpotImages[0]?.url
    owner = spotObj.Owner
  }


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
          <div className="price-reviews">
            <p>
              ${spotObj.price} per night
            </p>
            <p>
              {spotObj.numReviews} reviews
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
