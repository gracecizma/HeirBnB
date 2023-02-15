import React from "react"
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { createNewSpot } from '../../store/spots'
import './newspot.css'

export default function CreateNewSpot() {
  const dispatch = useDispatch()

  const [validationErrors, setValidationErrors] = useState([])
  const [country, setCountry] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [imageURL, setImageURL] = useState('')

  const spot = {
    country,
    streetAddress,
    city,
    state,
    description,
    title,
    price,
    imageURL
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('spot', spot)

    const errors = []

    if (typeof spot.price !== 'number') {
      errors.push('price must be a number')
      setValidationErrors(errors)
    } else {
      const newSpotObj = { ...spot }
      dispatch(createNewSpot(newSpotObj))
    }
  }

  return (
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
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
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
        <label>Description
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
          />
        </label>
      </div>

      <div>
        <label>Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
