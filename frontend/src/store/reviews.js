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


export const createReviewBySpot = (review, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review)
  })

  if (res.ok) {
    const reviewObj = await res.json()
    console.log("fetch review", reviewObj)
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
  }
};

export const getSpotReviews = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (res.ok) {
    const reviews = await res.json()
    console.log("fetch all reviews", reviews)
    const reviewsObj = {}
    reviews.Reviews.foreach(review => {
      reviewsObj[review.id] = review
    })
    dispatch(spotReviews(reviewsObj))
  }
};

export const getUserReviews = () => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/current`);

  if (res.ok) {
    const reviews = res.json()
    console.log("fetch user reviews", reviews)
    const reviewsObj = {}
    reviews.Reviews.forEach(review => {
      reviewsObj[review.id] = review
    })
    dispatch(userReviews(reviewsObj))
  }
};


const initialState = {
  spot: {},
  user: {}
};

export default function reviewsReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_REVIEW:
      const createState = { spot: {}, user: {} }
      createState.spot[action.review.id] = action.review
      createState.user[action.review.id] = action.review
      return createState;
    case DELETE_REVIEW:
      const deleteState = { spot: {}, user: {} }
      return state;
    case USER_REVIEWS:
      return state;
    case SPOT_REVIEWS:
      return state;
    default:
      return state
  }
};
