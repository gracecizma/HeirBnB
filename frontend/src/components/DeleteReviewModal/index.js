import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewById } from "../../store/reviews";

function DeleteReviewModal({ review }) {
  const { closeModal } = useModal()
  const dispatch = useDispatch()


  const handleClick = (e) => {
    e.preventDefault()
    dispatch(deleteReviewById(review.id)).then(closeModal)
  }

  return (
    <>
      <div className="delete-modal">
        <h1>Confirm Delete</h1>
        <div>Are you sure you want to delete this review?</div>
        <div className="confirm-delete">
          <button
            className="yes-delete"
            onClick={handleClick}
          >
          </button>
          <button
            className="no-delete"
            onClick={closeModal}
          >
          </button>
        </div>
      </div>
    </>
  )
}

export default DeleteReviewModal;
