import { csrfFetch } from "./csrf"

const GET_ALL_SPOTS = 'spots/getAllSpots'
const GET_SINGLE_SPOT = 'spots/getOneSpot'
const CREATE_SPOT = 'spots/createSpot'

const loadSpots = (spotsArray) => {
  return {
    type: GET_ALL_SPOTS,
    payload: spotsArray
  }
};

const oneSpot = (spot) => {
  return {
    type: GET_SINGLE_SPOT,
    payload: spot
  }
};

const createSpot = (newSpot) => {
  return {
    type: CREATE_SPOT,
    payload: newSpot
  }
};

export const getAllSpots = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots')

  if (res.ok) {
    const spotsObj = await res.json()
    dispatch(loadSpots(spotsObj))
  }
};

let initialState = {
  allSpots: {},
  singleSpot: {}
}

export default function spotsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_SPOTS: {
      const allSpots = { ...action.payload.spotsArray }
      return {
        ...state,
        allSpots
      }
    }
    case GET_SINGLE_SPOT: {
      return {
        ...state,
        singleSpot: action.payload
      }
    }
    default:
      return state
  }
};
