import React from "react"
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"
import { useState } from 'react'
import { createNewSpot } from '../../store/spots'
import './newspot.css'

export default function CreateNewSpot() {
  const dispatch = useDispatch()
  const history = useHistory()

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

  const handleSubmit = (e) => {
    e.preventDefault()

    const errors = []

    if (typeof spot.price !== 'number') {
      errors.push('price must be a number')
      setValidationErrors(errors)
    } else {
      const newSpotObj = { ...spot }
      console.log("new spot obj", newSpotObj)
      dispatch(createNewSpot(newSpotObj))
      history.push(`spots/${newSpotObj.id}`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>

      <div>
        <label>Address
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
      </div>

      <div>
        <label>State
          <input
            value={state}
            onChange={(e) => setState(e.target.value)}
            type="text"
          />
        </label>
      </div>

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
        <label>Latitude
          <input
            value={latitude}
            onChange={(e) => setLatitude(Number(e.target.value))}
            type="text"
          />
        </label>
      </div>

      <div>
        <label>Longitude
          <input
            value={longitude}
            onChange={(e) => setLongitude(Number(e.target.value))}
            type="text"
          />
        </label>
      </div>

      <div>
        <label>Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
        </label>
      </div>

      <div>
        <label>Description
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
          />
        </label>
      </div>

      <div>
        <label>Price per Night
          <input
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            type="text"
          />
        </label>
      </div>

      <div>
        <label>Image URL
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
  )
}
