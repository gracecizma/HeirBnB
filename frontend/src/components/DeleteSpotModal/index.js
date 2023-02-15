import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpot } from '../../store/spots'
import './deletespot.css'


export default function DeleteSpotModal({ spotId }) {
  const { closeModal } = useModal()
  const dispatch = useDispatch()

  const handleClick = (e) => {
    e.preventDefault()
    dispatch(deleteSpot(spotId))
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
