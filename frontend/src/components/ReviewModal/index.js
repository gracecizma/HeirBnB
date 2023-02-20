import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useHistory } from "react-router-dom"
import { createReviewBySpot } from '../../store/reviews';
import StarRating from './StarRating'
import './reviewmodal.css'

function ReviewModal({ spotId }) {
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const [errors, setErrors] = useState([])
  const [disabled, setDisabled] = useState(true)
  //const [errorsLoaded, setErrorsLoaded] = useState(false)

  const currUser = useSelector((state) => state?.session?.user)

  const { closeModal } = useModal()
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    setErrors(validate())
  }, [review, rating])

  useEffect(() => {
    if (!errors.length && rating > 0) {
      setDisabled(false)
    }
  }, [errors])

  const validate = () => {
    const validationErrors = [];
    if (review && review.length < 10) {
      validationErrors.push('Review needs 10 or more characters');
    }
    return validationErrors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault()


    if (!errors.length) {
      const newReview = {
        review,
        stars: rating
      }
      await dispatch(createReviewBySpot(newReview, spotId))
        .then(closeModal)
      history.push(`/spots/${spotId}`)
    } else {
      return;
    }
  }

  return (
    <>
      <div className="review-modal-container">
        <form
          onSubmit={handleSubmit}
          className="review-form"
        >
          <div className="review-header">
            <h2>How was your stay?</h2>
          </div>
          <div className="errors">
            {errors?.map((error, index) =>
              <div key={index} className="error-message">{error}</div>
            )}
          </div>
          <textarea
            cols="60"
            rows="5"
            placeholder="Leave your review here"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          >
          </textarea>
          <div className="stars-container">

            <StarRating rating={rating} setRating={setRating} />
          </div>
          <div className="review-submit">
            <button
              className="submit-review-button"
              disabled={disabled}>
              Submit your review
            </button>
          </div>
        </form>
      </div>
    </>
  )

}

export default ReviewModal;
