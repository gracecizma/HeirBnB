import React from "react"
import { useParams } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { updateSpot } from '../../store/spots'

export default function UpdateSpot() {
  const dispatch = useDispatch()
  const { spotId } = useParams()

  const [validationErrors, setValidationErrors] = useState([])
  const [country, setCountry] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [imageURL, setImageURL] = useState('')

  const updatedSpot = {
    country,
    address,
    city,
    state,
    description,
    name,
    price,
    imageURL
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    const errors = []

    if (typeof updatedSpot.price !== 'number') {
      errors.push('price must be a number')
      setValidationErrors(errors)
    } else {
      const spotDetails = { ...updatedSpot }
      dispatch(updateSpot(spotDetails, spotId))
    }
  }

  return (
    <>
      <h1>Edit a Spot</h1>
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
