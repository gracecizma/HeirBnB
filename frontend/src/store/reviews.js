import { csrfFetch } from "./csrf"

const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';
const SPOT_REVIEWS = 'reviews/SPOT_REVIEWS';
const USER_REVIEWS = 'reviews/USER_REVIEWS';


const createReview = (review) => {
  return {
    type: CREATE_REVIEW,
    payload: review
  }
};

const deleteReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    payload: reviewId
  }
};

const spotReviews = (reviews) => {
  return {
    type: SPOT_REVIEWS,
    payload: reviews
  }
};

const userReviews = (reviews) => {
  return {
    type: USER_REVIEWS,
    payload: reviews
  }
};




const initialState = {
  spot: {},
  user: {}
}


export default function reviewsReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_REVIEW:
      return state;
    case DELETE_REVIEW:
      return state;
    case USER_REVIEWS:
      return state;
    case SPOT_REVIEWS:
      return state;
    default:
      return state
  }
};
