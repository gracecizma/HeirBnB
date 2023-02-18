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


export const createReviewBySpot = (review, spotId, currUser) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review)
  })

  if (res.ok) {
    const reviewObj = await res.json()
    //console.log("fetch created review", reviewObj)
    dispatch(createReview(reviewObj))
  }
};

export const deleteReviewById = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })

  if (res.ok) {
    dispatch(deleteReview(reviewId))
    return;
  } else {
    throw new Error('Error deleting review')
  }
};

export const getSpotReviews = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (res.ok) {
    const reviews = await res.json()
    //console.log("fetch all reviews", reviews)
    const reviewsObj = {}
    reviews.Reviews.forEach(review => {
      reviewsObj[review.id] = review
    })
    //console.log("normalized spot reviews obj", reviewsObj)
    dispatch(spotReviews(reviewsObj))
    //return reviewsObj
  }
};

export const getUserReviews = () => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/current`);

  if (res.ok) {
    const reviews = await res.json()
    //console.log("fetch user reviews", reviews)
    const reviewsObj = {}
    reviews.Reviews.forEach(review => {
      reviewsObj[review.id] = review
    })
    //console.log("normalized user reviews obj", reviewsObj)
    dispatch(userReviews(reviewsObj))
    //return reviewsObj
  }
};


const initialState = {
  spot: {},
  user: {}
};

export default function reviewsReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_REVIEW:
      const createState = { ...state, spot: { ...state.spot }, user: { ...state.user } }
      //console.log("create review action payload", action.payload)
      createState.spot[action.payload.id] = action.payload
      createState.user[action.payload.id] = action.payload
      //console.log("create review state", createState)
      return createState;
    case DELETE_REVIEW:
      const deleteState = { spot: {}, user: {} }
      delete deleteState.spot[action.payload.id]
      delete deleteState.user[action.payload.id]
      return deleteState;
    case USER_REVIEWS:
      const userState = { ...state, spot: { ...state.spot }, user: { ...state.user } }
      //console.log("user reviews payload", action.payload)
      userState.user = action.payload
      console.log("user reviews state", userState)
      return userState;
    case SPOT_REVIEWS:
      const spotState = { ...state, spot: { ...state.spot }, user: { ...state.user } }
      spotState.spot = action.payload
      console.log("spot reviews state", spotState)
      return spotState;
    default:
      return state
  }
};
