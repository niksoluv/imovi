const defaultState = {
  backgroundColor: 'bg-dark'
}

const COLOR = 'COLOR'

export const backgroundReducer = (state = defaultState, action) => {
  switch (action.type) {
    case COLOR:
      return { ...state, backgroundColor: action.payload.color }
    default:
      return state
  }
}

export const setColorAction = (payload) => ({ type: COLOR, payload })