import React from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
import { useState } from 'react'
import { createNewSpot } from '../../store/spots'
import './newspot.css'

export default function CreateNewSpot() {
  const dispatch = useDispatch()
  const history = useHistory()
  const currUser = useSelector((state) => state.session.user)

  const [validationErrors, setValidationErrors] = useState([])
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [imageURL, setImageURL] = useState('')

  const spot = {
    address,
    city,
    state,
    country,
    latitude,
    longitude,
    name,
    description,
    price,
    imageURL
  }

  const handleSubmit = async (e) => {
    e.preventDefault()



    const newSpotObj = { ...spot }
    console.log("new spot obj", newSpotObj)
    let res = await dispatch(createNewSpot(newSpotObj, currUser))
    if (res) history.push(`/spots/${res.id}`)
  }


  return (
    <>
      <h1>Create a New Spot</h1>
      <h2>Where's your place located?</h2>
      <h3>Guests will only get your exact address once they booked a reservation.</h3>
      <form onSubmit={handleSubmit}>

        <div>
          <label>Country
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              type="text"
            />
          </label>
        </div>

        <div>
          <label>Street Address
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
            />
          </label>
        </div>

        <div>
          <label>City
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
            />
          </label>
          <label>State
            <input
              value={state}
              onChange={(e) => setState(e.target.value)}
              type="text"
            />
          </label>
        </div>

        <div>
          <label>Latitude
            <input
              value={latitude}
              onChange={(e) => setLatitude(Number(e.target.value))}
              type="text"
            />
          </label>
          <label>Longitude
            <input
              value={longitude}
              onChange={(e) => setLongitude(Number(e.target.value))}
              type="text"
            />
          </label>
        </div>

        <div>
          <label>Describe your place to Guests
            <div>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</div>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
            />
          </label>
        </div>

        <div>
          <label>Create a title for your spot
            <div>Catch guests' attention with a spot title that highlights what makes your place special.</div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
          </label>
        </div>



        <div>
          <label>Price per Night
            <input
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              type="number"
            />
          </label>
        </div>

        <div>
          <label>Liven up your spot with photos
            <input
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              type="text"
            />
          </label>
        </div>

        <div>
          <button type="submit">Create Spot</button>
        </div>
      </form>
    </>
  )
}
