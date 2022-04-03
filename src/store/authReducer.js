const defaultState = {
  userData: {}
}

const LOGIN = 'LOGIN'
const REGISTER = 'REGISTER'
const LOGOUT = 'LOGOUT'
const GET_DATA = 'GET_DATA'

export const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, userData: action.payload.userData }
    case REGISTER:
      return { ...state, userData: action.payload.userData }
    case LOGOUT:
      
      return { ...state, userData: {} }
    case GET_DATA:
      return { ...state, userData: action.payload.userData }
    default:
      return state
  }
}

export const loginAction = (payload) => ({ type: LOGIN, payload })
export const registerAction = (payload) => ({ type: REGISTER, payload })
export const logoutAction = (payload) => ({ type: LOGOUT, payload })
export const getDataAction = (payload) => ({ type: GET_DATA, payload })