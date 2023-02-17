import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
import { useState } from 'react'
import { updateSpot } from '../../store/spots'
import { getSpot } from '../../store/spots'

export default function UpdateSpot() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { spotId } = useParams()
  const spotDetails = useSelector((state) => state?.spots?.singleSpot)

  useEffect(() => {
    dispatch(getSpot(spotId))
  }, [dispatch])

  //console.log("spotDetails", spotDetails)
  let image;
  if (spotDetails.name) {
    image = spotDetails.SpotImages[0]?.url
  }

  const [validationErrors, setValidationErrors] = useState([])
  const [country, setCountry] = useState(spotDetails.country)
  const [address, setAddress] = useState(spotDetails.address)
  const [city, setCity] = useState(spotDetails.city)
  const [state, setState] = useState(spotDetails.state)
  const [latitude, setLatitude] = useState(spotDetails.latitude)
  const [longitude, setLongitude] = useState(spotDetails.longitude)
  const [description, setDescription] = useState(spotDetails.description)
  const [name, setName] = useState(spotDetails.name)
  const [price, setPrice] = useState(spotDetails.price)
  const [imageURL, setImageURL] = useState(image)

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    const spotDetails = { ...updatedSpot }
    let res = await dispatch(updateSpot(spotDetails, spotId))
    if (res) history.push(`/spots/${spotId}`)

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
