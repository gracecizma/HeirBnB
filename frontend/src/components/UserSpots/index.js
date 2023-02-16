import React from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { getUserSpots } from '../../store/spots'
import DeleteSpotModal from "../DeleteSpotModal"
import OpenModalButton from "../OpenModalButton"
import './userspots.css'


export default function UserSpots() {
  const dispatch = useDispatch()
  //const currUser = useSelector((state) => state.session.user)
  const userSpots = useSelector((state) => state.spots.userSpots)
  console.log("userSpotsObj", userSpots)
  const spots = Object.values(userSpots)
  //console.log("user spots array", spots)

  useEffect(() => {
    dispatch(getUserSpots())
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

  return (

    <div>
      <h1>Manage Your Spots</h1>
      <div className="user-spots">
        {(spots.map(spot => (
          <li key={spot.name}>
            <p>{spot.name}</p>
            <p>
              <img src={spot.previewImage} />
            </p>
            <p>{spot.address}</p>
            <p>{spot.city}, {spot.state}</p>
            <p>{spot.description}</p>
            <p>{spot.price} per night</p>
            <div className="delete-spot-button">
              <OpenModalButton modalComponent={
                <DeleteSpotModal spotId={spot.id}
                  buttonText={'Delete Spot'}
                />}
              />
            </div>
            <div className="edit-spot-button">
              <Link to={`/spots/${spot.id}/edit`}>
                <button>Edit Spot</button>
              </Link>
            </div>
          </li>
        )))}
      </div>
    </div>
  )
}
