import React from "react"
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

}
