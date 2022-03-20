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
  const payload = { userData: undefined }
  dispatch(logoutAction(payload))
}

export const isMovieInFavourites = async (movieId) => {
  if (movieId !== undefined) {
    let res = await axios.get(`${variables.API_URL}api/Movies/${movieId}`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
      })
    return res.data
  }
}

export const addToFavourites = async (movie) => {
  const res = await axios.post(`${variables.API_URL}api/Movies/addToFavourites`,
    {
      movieId: `${movie.id}`,
      mediaType: movie.number_of_seasons !== undefined ? 'tv' : 'movie'
    },
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    })
  return res.data
}

export const removeFromFavourites = async (movieId) => {
  const res = await axios.delete(`${variables.API_URL}api/Movies/removeFromFavourites`, {
    data: { movieId: `${movieId}` },
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    }
  })
  return res.data
}

export const getFavourites = async () => {
  let res = await axios.get(`${variables.API_URL}api/Movies`,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    })
  const reqArr = res.data.map(el => {
    switch (el.mediaType) {
      case 'movie':
        return axios.get(`${variables.DEFAULT_URL}movie/${el.movieId}?api_key=${variables.API_KEY}&language=en-US`)
      case 'tv':
        return axios.get(`${variables.DEFAULT_URL}tv/${el.movieId}?api_key=${variables.API_KEY}&language=en-US`)
      default:
        return axios.get(`${variables.DEFAULT_URL}movie/${el.movieId}?api_key=${variables.API_KEY}&language=en-US`)
    }
  })

  const result = await axios.all(reqArr)

  return result
}