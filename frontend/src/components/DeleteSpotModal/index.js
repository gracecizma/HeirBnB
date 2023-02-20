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


  const handleClick = async (e) => {
    e.preventDefault()
    await dispatch(deleteSpot(spotId)).then(closeModal)
    history.push(`/spots/current`)
  }

  return (
    <>
      <div className="delete-spot-container">
        <h2>Are you sure you want to delete this spot?</h2>
        <div className="delete-buttons-container">
          <button
            onClick={handleClick}
            className="delete-button"
          >
            Yes
          </button>
          <button
            onClick={closeModal}
            className="keep-button"
          >
            No
          </button>
        </div>
      </div>
    </>
  )
}
