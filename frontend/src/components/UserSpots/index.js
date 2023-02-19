import React from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getUserSpots } from '../../store/spots'
import DeleteSpotModal from "../DeleteSpotModal"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import './userspots.css'


export default function UserSpots() {
  const dispatch = useDispatch()
  //const currUser = useSelector((state) => state.session.user)
  const userSpots = useSelector((state) => state?.spots?.userSpots)
  console.log("userSpotsObj", userSpots)
  const spots = Object.values(userSpots)
  console.log("user spots array", spots)

  const [isLoaded, setIsLoaded] = useState()

  useEffect(() => {
    dispatch(getUserSpots())
      .then(() => setIsLoaded(true))
  }, [dispatch])


  if (!spots.length) {
    return (
      <>
        <div>Manage Your Spots</div>
        <div>
          <Link to="/spots">
            <button>Create New Spot</button>
          </Link>
        </div>
      </>
    )
  }

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <>

      {isLoaded && (

        <div className="user-spot-div">
          <div className="user-spots">
            <h1 className="user-spots-header">Manage Your Spots</h1>
            {(spots.map(spot => (
              <li key={spot.name} className="user-spot-tile">
                <p className="user-spot-name">{spot.name}</p>
                <div className="user-image-container">
                  <img className="user-spot-img" src={spot?.previewImage} />
                </div>
                <div className="user-spot-details-container">
                  <div className="user-location-rating">
                    <p className="user-location">
                      {spot.city}, {spot.state}
                    </p>
                    <p className="user-rating">
                      Rating:{spot.avgRating ? ' ★ ' + Number(spot.avgRating).toFixed(1) : '★New'}
                    </p>
                  </div>
                  <div className="user-price-container">
                    <p className="user-price">{spot.price} per night</p>
                  </div>
                  <div className="edit-delete-buttons">
                    <button
                      className="delete-spot-button"
                      onClick={handleDelete}
                    >
                      <OpenModalMenuItem
                        itemText="Delete"
                        modalComponent={<DeleteSpotModal spotId={spot.id} />}
                      />
                    </button>
                    <div className="edit-spot-button">
                      <Link to={`/spots/${spot.id}/edit`}>
                        <button>Edit Spot</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            )))}
          </div>
        </div>
      )
      }
    </>
  )
}
