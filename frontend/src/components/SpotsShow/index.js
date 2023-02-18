import React from "react"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { getAllSpots } from '../../store/spots'
import './spotshow.css'

export default function Spots() {
  const dispatch = useDispatch()
  const spotsObj = useSelector((state) => state?.spots?.allSpots)
  //console.log("spot obj", spotsObj)


  const spots = Object.values(spotsObj)
  // console.log("spot array", spots)

  useEffect(() => {
    dispatch(getAllSpots())
  }, [dispatch])

  if (!spots.length) return null

  return (
    <>
      <div className="spot-div">
        {spots.map(spot => (
          <Link key={spot.id} to={`spots/${spot.id}`} className="spot-tile">
            <div className="spot-img-container">
              <img className="spot-img" src={spot.previewImage} />
            </div>
            <div className="spot-details">
              <div className="location-rating">
                <p className="city-state">
                  {spot.city}, {spot.state}
                </p>
                <p className="stars">
                  Rating:{spot.avgRating ? ' ★ ' + Number(spot.avgRating).toFixed(1) : '★New'}
                </p>
              </div>
              <div className="price-container">
                <p className="price" style={{ "fontWeight": "bold" }}>${spot.price}</p>
                <p className="price-text">night</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
};
