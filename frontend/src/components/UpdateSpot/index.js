import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
import { useState } from 'react'
import { getSpot, updateSpot } from '../../store/spots'
import './updatespot.css'

export default function UpdateSpot() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState('')
  const [errorsLoaded, setErrorsLoaded] = useState(false)
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
  const { spotId } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const spotDetails = useSelector((state) => state?.spots?.singleSpot)
  const currUser = useSelector((state) => state?.session?.user)

  const setSpotDetails = async () => {
    const spotData = await dispatch(getSpot(spotId));
    console.log("spotData", spotData)

    setCountry(spotData.country);
    setAddress(spotData.address);
    setCity(spotData.city);
    setState(spotData.state);
    setLatitude(spotData.lat);
    setLongitude(spotData.lng);
    setDescription(spotData.description);
    setName(spotData.name);
    setPrice(spotData.price);
    setImageURL(spotData.SpotImages[0]?.url)
    setIsLoaded(true);
  };

  useEffect(() => {
    setSpotDetails()
  }, [dispatch, spotId]);


  const validate = () => {
    const validationErrors = {};

    if (!country) validationErrors.country = 'Country is required';
    if (!address) validationErrors.address = 'Address is required';
    if (!city) validationErrors.city = 'City is required';
    if (!state) validationErrors.state = 'State is required';
    if (!latitude) validationErrors.latitude = 'Latitude is required';
    if (!longitude) validationErrors.longitude = 'Longitude is required';
    if (description.length < 30) {
      validationErrors.description = 'Description needs a minimum of 30 characters';
    }
    if (!description) validationErrors.description = 'Description is required';
    if (!name) validationErrors.name = 'Name is required';
    if (!price) validationErrors.price = 'Price is required';

    setErrorsLoaded(false)
    return validationErrors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)

    if (!Object.values(validationErrors).length) {
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
    } else {
      return;
    }
  };

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
      {isLoaded && (
        <div className="update-spot-container">
          <div className="update-form">=
            <h1>Edit a Spot</h1>
            <h3>Where's your place located?</h3>
            <h4>Guests will only get your exact address once they booked a reservation.</h4>
            <form onSubmit={handleSubmit}>

              <div>
                <label>
                  Country {errors.country &&
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

              <div>
                <label>
                  City {errors.city &&
                    <span className="error-message">{errors.city}</span>}
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    type="text"
                    placeholder="City"
                  />
                </label>
                <div className="city-state-comma">,</div>
                <label>
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

              <div>
                <label>
                  Latitude {errors.latitude &&
                    <span className="error-message">{errors.city}</span>}
                  <input
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    type="text"
                    placeholder="Latitude"
                  />
                </label>
                <div className="lat-lng-comma">,</div>
                <label>
                  Longitude {errors.longitude &&
                    <span className="error-message">{errors.longitude}</span>}
                  <input
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    type="text"
                    placeholder="Longitude"
                  />
                </label>
              </div>

              <div>
                <div className="error-message">{errors.description}</div>
                <label>Describe your place to Guests
                  <div>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</div>
                  <textarea
                    rows="5"
                    cols="32"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Please write at least 30 characters"
                    className="description-input"
                  />
                </label>
              </div>

              <div>
                <div className="error-message">{errors.name}</div>
                <label>Create a title for your spot
                  <div>Catch guests' attention with a spot title that highlights what makes your place special.</div>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Name of your spot"
                  />
                </label>
              </div>



              <div>
                <div className="error-message">{errors.price}</div>
                <div className="price-header">
                  <h3>Set a base price for your spot</h3>
                  <h4>Competitive pricing can help your listing stand out and rank higher in search results.</h4>
                </div>
                <label>
                  <input
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    type="number"
                    placeholder="Price"
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
          </div>
        </div>
      )}
    </>
  )

}
