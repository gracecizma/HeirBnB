import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
import { useState } from 'react'
import { getSpot, updateSpot } from '../../store/spots'
import './updatespot.css'

export default function UpdateSpot() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { spotId } = useParams()
  const spotDetails = useSelector((state) => state?.spots?.singleSpot)
  const currUser = useSelector((state) => state?.session?.user)


  const [isLoaded, setIsLoaded] = useState(false);
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

  const setSpotDetails = async () => {
    const spotData = await dispatch(getSpot(spotId));
    console.log("spotData", spotData)

    setCountry(spotData.spotArray[0]?.country);
    setAddress(spotData.spotArray[0]?.address);
    setCity(spotData.spotArray[0]?.city);
    setState(spotData.spotArray[0]?.state);
    setLatitude(spotData.spotArray[0]?.lat);
    setLongitude(spotData.spotArray[0]?.lng);
    setDescription(spotData.spotArray[0]?.description);
    setName(spotData.spotArray[0]?.name);
    setPrice(spotData.spotArray[0]?.price);
    setImageURL(spotData.spotArray[0]?.SpotImages[0]?.url)
    setIsLoaded(true);
  };

  useEffect(() => {
    setSpotDetails()
  }, [dispatch, spotId])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const updatedSpot = {
      id: spotDetails.id,
      address,
      city,
      state,
      country,
      lat: parseFloat(latitude),
      lng: parseFloat(longitude),
      name,
      description,
      price: parseFloat(price),
      imageURL
    }
    const spotData = await dispatch(updateSpot(updatedSpot))
    console.log("updated spotData", spotData)

    history.push(`/spots/${spotDetails.id}`)
  }

  // prevent users from attempting to view edit page for spot they don't own
  if (isLoaded && (!currUser || spotDetails.ownerId !== currUser.id)) {
    history.push('/')
    return (
      <div>
        <h1>Forbidden</h1>
      </div>
    )
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
