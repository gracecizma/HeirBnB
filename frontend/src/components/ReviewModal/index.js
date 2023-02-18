import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useHistory } from "react-router-dom"
import { createReviewBySpot } from '../../store/reviews';
import './reviewmodal.css'

function ReviewModal({ spotId }) {
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const [errors, setErrors] = useState('')
  const [errorsLoaded, setErrorsLoaded] = useState(false)

  const { closeModal } = useModal()
  const dispatch = useDispatch()
  const history = useHistory()

  const validate = () => {
    const validationErrors = {}
    if (review && review.length < 10) {
      validationErrors.review = "Review needs 10 or more characters"
    }
    setErrorsLoaded(false)
    return validationErrors;
  }

  function refreshPage() {
    window.location.reload()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)


    if (!Object.values(validationErrors).length) {
      const newReview = {
        review,
        stars: rating
      }
      const reviewData = await dispatch(createReviewBySpot(newReview, spotId))
        .then(closeModal)
        .then(refreshPage())
      history.push(`/spots/${spotId}`)
    } else {
      return;
    }
  }

  return (
    <>
      <div className="review-modal-container">
        <form onSubmit={handleSubmit}>
          <h2>How was your stay?</h2>
          <textarea
            cols="60"
            rows="5"
            placeholder="Leave your review here"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          >
          </textarea>
          <div className="review-submit">
            <button
              disabled={errors.length > 0}>
              Submit your review
            </button>
          </div>
        </form>
      </div>
    </>
  )

}

export default ReviewModal;
