import { csrfFetch } from "./csrf"

const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS'
const GET_SINGLE_SPOT = 'spots/GET_SINGLE_SPOT'
const CREATE_SPOT = 'spots/CREATE_SPOT'

const loadSpots = (spotsArray) => {
  return {
    type: GET_ALL_SPOTS,
    payload: spotsArray
  }
};

export const oneSpot = (spotArray) => {
  return {
    type: GET_SINGLE_SPOT,
    payload: spotArray
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

export const getSpot = () => async (dispatch) => {
  const res = await csrfFetch(`api/spots/spotId`)

  if (res.ok) {
    const spotObj = await res.json()
    dispatch(oneSpot(spotObj))
  }
}

export const createNewSpot = (newSpotDetails) => async (dispatch) => {
  const res = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newSpotDetails)
  })

  if (res.ok) {
    const newSpot = await res.json()
    dispatch(createSpot(newSpot))
  }
}


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
      let newState = { ...state }
      newState.singleSpot = action.payload
      return newState
    }
    default:
      return state
  }
};
