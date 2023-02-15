import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpot } from '../../store/spots'
import { useHistory } from "react-router-dom"
import './deletespot.css'


export default function DeleteSpotModal({ spotId }) {
  const { closeModal } = useModal()
  const dispatch = useDispatch()
  const history = useHistory()

  const handleClick = (e) => {
    e.preventDefault()
    dispatch(deleteSpot(spotId)).then(closeModal)
    history.push(`/spots/current`)
  }

  return (
    <>
      <h2>Are you sure you want to delete this spot?</h2>
      <button onClick={handleClick}>
        Yes
      </button>
      <button onClick={closeModal}>
        No
      </button>
    </>
  )
}
