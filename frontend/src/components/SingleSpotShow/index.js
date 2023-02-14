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
  console.log("spot object", spotObj)
  const spotDetail = Object.values(spotObj)
  console.log("spot", spotDetail)


  useEffect(() => {
    dispatch(getSpot(spotId))
  }, [dispatch])


  return
  // (
  // <>
  //   <div className="single-spot-div">
  //     <div className="spot-name">
  //       {spotDetail.name}
  //     </div>
  //     <div className="spot-location">
  //       {spotDetail.city}, {spotDetail.state}, {spotDetail.country}
  //     </div>
  //     <div className="images-container"> images
  //     </div>
  //     <div className="details-container">
  //       <div className="description">
  //         <p>
  //           Hosted by {spotDetail.ownerId.firstName} {spotDetail.ownerId.lastName}
  //         </p>
  //         <p>
  //           {spotDetail.description}
  //         </p>
  //       </div>
  //       <div className="price-reviews">
  //         <p>
  //           ${spotDetail.price} per night
  //         </p>
  //         <p>
  //           {spotDetail.numReviews} reviews
  //         </p>
  //       </div>
  //       <div className="reserve-button">
  //         <button>Reserve</button>
  //       </div>
  //     </div>
  //   </div>
  // </>
  //)
}
