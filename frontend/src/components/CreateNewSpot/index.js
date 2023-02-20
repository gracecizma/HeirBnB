import React from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
import { useState } from 'react'
import { createNewSpot } from '../../store/spots'
import './newspot.css'

export default function CreateNewSpot() {
  const dispatch = useDispatch()
  const history = useHistory()
  const currUser = useSelector((state) => state?.session?.user)

  const [errors, setErrors] = useState([]);
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

  const validate = () => {
    const validationErrors = {};
    if (!country) validationErrors.country = 'Country is required';
    if (!address) validationErrors.address = 'Address is required';
    if (!city) validationErrors.city = 'City is required';
    if (!state) validationErrors.state = 'State is required';
    if (!description) validationErrors.description = 'Description is required';
    if (description && description.length < 30) {
      validationErrors.description = 'Description needs a minimum of 30 characters';
    }
    if (!name) validationErrors.name = 'Name is required';
    if (!price) validationErrors.price = 'Price is required';
    if (!imageURL) validationErrors.imageURL = 'Preview Image is required';
    // validate image url
    if (imageURL && !/\.(jpe?g|png)$/i.test(imageURL)) {
      validationErrors.imageURL = 'Image URL must end in .png, .jpg, or .jpeg';
    }
    return validationErrors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)

    if (!Object.values(validationErrors).length) {
      const spot = {
        address,
        city,
        state,
        country,
        lat: parseFloat(latitude),
        longitude: parseFloat(longitude),
        name,
        description,
        price: parseFloat(price),
        imageURL
      }
      const newSpotObj = await dispatch(createNewSpot(spot, currUser))
      history.push(`/spots/${newSpotObj.id}`)
    } else {
      return;
    }

  }


  return (
    <>
      <div className="create-spot-container">
        <div className="create-spot-form">
          <div className="create-header-container">
            <h1>Create a New Spot</h1>
            <h2>Where's your place located?</h2>
            <h3>Guests will only get your exact address once they booked a reservation.</h3>
          </div>
          <form onSubmit={handleSubmit}>

            <div>
              <label>Country {errors.country &&
                <span className="error-message">{errors.country}</span>}
                <input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  type="text"
                  placeholder="Country"
                />
              </label>
            </div>

            <div>
              <label>
                Street Address {errors.address &&
                  <span className="error-message">{errors.address}</span>}
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  placeholder="Address"
                />
              </label>
            </div>

            <div className="create-city-state">
              <label className="create-city-input">
                City {errors.city &&
                  <span className="error-message">{errors.city}</span>}
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                  placeholder="City"
                />
              </label>
              <div className="comma">,</div>
              <label className="create-state-input">
                State {errors.state &&
                  <span className="error-message">{errors.state}</span>}
                <input
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  type="text"
                  placeholder="State"
                />
              </label>
            </div>

            <div className="create-lat-long">
              <label className="create-lat-input">
                Latitude {errors.latitude &&
                  <span className="error-message">{errors.city}</span>}
                <input
                  value={latitude}
                  onChange={(e) => setLatitude(Number(e.target.value))}
                  type="text"
                  placeholder="Latitude"
                />
              </label>
              <div className="comma">,</div>
              <label className="create-long-input">
                Longitude {errors.longitude &&
                  <span className="error-message">{errors.longitude}</span>}
                <input
                  value={longitude}
                  onChange={(e) => setLongitude(Number(e.target.value))}
                  type="text"
                  placeholder="Longitude"
                />
              </label>
            </div>

            <div className="break"></div>

            <div className="create-description-container">
              <label>Describe your place to guests
                <div>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</div>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  placeholder="Please write at least 30 characters"
                  className="description-input"
                />
              </label>
              <div className="error-message">{errors.description}</div>
            </div>
            <div className="break"></div>
            <div className="create-title-container">
              <label>Create a title for your spot
                <div>Catch guests' attention with a spot title that highlights what makes your place special.</div>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Name of your spot"
                />
              </label>
              <div className="error-message">{errors.name}</div>
            </div>
            <div className="break"></div>


            <div className="create-price-container">
              <div className="price-header">
                <h3>Set a base price for your spot</h3>
                <h4>Competitive pricing can help your listing stand out and rank higher in search results.</h4>
              </div>
              <div className="price-input-container">
                <label className="create-price-input">
                  <span className="dollar-sign">$</span>
                  <input
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    type="text"
                    placeholder="Price"
                  />
                </label>
                <div className="error-message">{errors.price}</div>
              </div>
            </div>
            <div className="break"></div>
            <div className="create-photo-container">
              <label>Liven up your spot with photos
                <input
                  value={imageURL}
                  onChange={(e) => setImageURL(e.target.value)}
                  type="text"
                />
              </label>
            </div>
            <div className="break"></div>
            <div className="submit-button-container">
              <button type="submit" className="submit-button">Create Spot</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
