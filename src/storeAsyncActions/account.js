import axios from "axios"
import { logoutAction, registerAction } from "../store/authReducer"
import { variables } from "../variables"

export const register = async (userData) => {
  userData.role = 'user'
  const response = await axios.post(`${variables.API_URL}create`,
    userData)
  console.log(response)
  const data = response.data

  return data
}

export const getUserData = async (token) => {
  const response = await axios.get(`${variables.API_URL}api/Account`,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  return response.data
}

export const getToken = async (userData) => {
  const res = await axios.post(`${variables.API_URL}token`, userData)
  localStorage.setItem('userToken', res.data.access_token)
  return res.data
}

export const logout = (dispatch) => {
  localStorage.removeItem('userToken')
  const payload = { userData: {} }
  dispatch(logoutAction(payload))
}