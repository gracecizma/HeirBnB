import React from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"
import { getUserSpots } from '../../store/spots'
import './userspots.css'


export default function UserSpots() {
  const dispatch = useDispatch()
  const userSpots = useSelector((state) => state.spots.userSpots)

  useEffect(() => {
    dispatch(getUserSpots())
  }, [dispatch])

  console.log('userSpots', userSpots)

  if (!Object.values(userSpots)) return null

  return (
    <>
      <div>
        <h1>Manage Your Spots</h1>
        <div className="user-spots">
          {userSpots && Object.values(userSpots.map(spot => (
            <l1 key={spot.name}>
              <p>{spot.name}</p>
              <p>
                <img src={spot.previewImage} style={{ width: 700, height: 500 }} />
              </p>
              <p>{spot.address}</p>
              <p>{spot.city}, {spot.state}</p>
              <p>{spot.description}</p>
              <p>{spot.price}</p>
            </l1>
          )))}
        </div>
      </div>
    </>
  )

}
