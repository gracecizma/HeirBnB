import React from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"
import { getUserSpots } from '../../store/spots'
import './userspots.css'


export default function UserSpots() {
  const dispatch = useDispatch()
  // const { userId } = useParams()
  const userSpots = useSelector((state) => state.spots.userSpots)
  console.log("userSpotsObj", userSpots)
  const spots = Object.values(userSpots)
  console.log("user spots array", spots)

  useEffect(() => {
    dispatch(getUserSpots())
  }, [dispatch])


  if (!Object.values(userSpots)) return null

  return (
    <>
      <div>
        <h1>Manage Your Spots</h1>
        <div className="user-spots">
          {(spots.map(spot => (
            <li key={spot.name}>
              <p>{spot.name}</p>
              <p>
                <img src={spot.previewImage} style={{ width: 700, height: 500 }} />
              </p>
              <p>{spot.address}</p>
              <p>{spot.city}, {spot.state}</p>
              <p>{spot.description}</p>
              <p>{spot.price}</p>
            </li>
          )))}
        </div>
        <div className="delete-spot-button">
          <button>Delete Spot</button>
        </div>
        <div className="edit-spot-button">
          <button>Edit Spot</button>
        </div>
      </div>
    </>
  )

}
