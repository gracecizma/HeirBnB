import React from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"
import { getUserSpots } from '../../store/spots'
import './userspots.css'


export default function UserSpots() {
  const dispatch = useDispatch()
  const { userId } = useParams()
  const userSpots = useSelector((state) => state.spots.userSpots)
  console.log(userSpots)

  useEffect(() => {
    dispatch(getUserSpots(userId))
  }, [dispatch])

  console.log('userSpots', userSpots)

  if (!Object.values(userSpots)) return null

  return (
    <>
      <div>
        <h1>Manage Your Spots</h1>
      </div>
    </>
  )

}
