import { csrfFetch } from "./csrf"

const GET_SPOT_REVIEWS = 'reviews/GET_SPOT_REVIEWS'
const ADD_REVIEW = 'reviews/ADD_REVIEW'
const GET_USER_REVIEWS = 'reviews/GET_USER_REVIEWS'


const loadReviews = (spotReviews) => {
  return {
    type: GET_ALL_REVIEWS,
    payload: spotReviews
  }
};

const addReview = (newReview) => {
  return {
    type: ADD_REVIEW,
    payload: newReview
  }
};

const userReviews = (reviewsArray) => {
  return {
    type: GET_USER_REVIEWS,
    payload: reviewsArray
  }
}







const initialState = {
  spots: {},
  user: {}
}

export default function reviewsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SPOT_REVIEWS:
      const getState = { ...state };
      let reviewObj = {}
      action.spotReviews.Reviews.forEach((review) => {
        reviewObj[review.id] = review;
      })
      getState.spots = reviewObj
      return getState;
    case ADD_REVIEW:
      const addState = { ...state };
      addState.spots[action.newReview.id] = action.newReview
      return addState;
    case GET_USER_REVIEWS:
      const userState = { ...state };
      let reviewData = {}
      action.userId.Reviews.forEach((review) => {
        reviewData[review.id] = review
      })
      userState.user = reviewData
      return userState
    default:
      return state
  }
}
