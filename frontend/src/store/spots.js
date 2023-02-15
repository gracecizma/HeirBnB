import { csrfFetch } from "./csrf"

const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS'
const GET_SINGLE_SPOT = 'spots/GET_SINGLE_SPOT'
const CREATE_SPOT = 'spots/CREATE_SPOT'
const GET_USER_SPOTS = 'spots/GET_USER_SPOTS'
const UPDATE_SPOT = 'spots/UPDATE_SPOT'
const DELETE_SPOT = 'spots/DELETE_SPOT'

const loadSpots = (spotsArray) => {
  return {
    type: GET_ALL_SPOTS,
    payload: spotsArray
  }
};

const oneSpot = (spotArray) => {
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

const userSpots = (spotsArray) => {
  return {
    type: GET_USER_SPOTS,
    payload: spotsArray
  }
};


const editSpot = (spotArray) => {
  return {
    type: UPDATE_SPOT,
    payload: spotArray
  }
};

const removeSpot = (spotId) => {
  return {
    type: DELETE_SPOT,
    payload: spotId
  }
}


export const getAllSpots = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots')

  if (res.ok) {
    const spotsObj = await res.json()
    console.log("get all fetch request", spotsObj)
    dispatch(loadSpots(spotsObj))
  }
};

export const getSpot = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${id}`)

  if (res.ok) {
    const spotObj = await res.json()
    //console.log("get one fetch request", spotObj)
    dispatch(oneSpot(spotObj))
  }
};

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
};

export const getUserSpots = () => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/current`)

  if (res.ok) {
    const currUserSpots = await res.json()
    //console.log("fetch spots", currUserSpots)
    dispatch(userSpots(currUserSpots))
  }
};

export const updateSpot = (spotDetails, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spotDetails)
  })

  if (res.ok) {
    const updatedSpot = await res.json()
    dispatch(editSpot(updatedSpot))
  }
};

export const deleteSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })

  if (res.ok) {
    dispatch(removeSpot(spotId))
  }
};


let initialState = {
  allSpots: {},
  singleSpot: {},
  userSpots: {}
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
      const newState = { ...state }
      newState.singleSpot = action.payload
      return newState
    }
    case CREATE_SPOT: {
      const newState2 = { ...state, allSpots: { ...state.allSpots } }
      newState2.allSpots[action.newSpot.id] = action.payload.newSpot
      return newState2
    }
    case GET_USER_SPOTS: {
      const userSpots = { ...action.payload.spotsArray }
      return {
        ...state,
        userSpots
      }
    }
    case UPDATE_SPOT: {
      const newState4 = { ...state, userSpots: { ...action.payload.userSpots } }
      newState4.userSpots[action.payload.spotId] = { ...action.payload.spot }
      return newState4
    }
    case DELETE_SPOT: {
      const newState5 = { ...state, allSpots: { ...state.allSpots } }
      delete newState5.allSpots[action.payload.spotId]
      return newState5
    }
    default:
      return state
  }
};
