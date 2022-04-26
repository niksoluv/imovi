import axios from "axios"
import { logoutAction, registerAction } from "../store/authReducer"
import { variables } from "../variables"

export const register = async (userData) => {
  userData.role = 'user'
  let response = {}
  try {
    response = await axios.post(`${variables.API_URL}create`,
      userData)
    return response.data
  }
  catch (e) {
    debugger
    return response.data
  }
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

export const getHistory = async () => {
  let res = await axios.get(`${variables.API_URL}api/UserHistory`,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    })
  const reqArr = res.data.map(el => {
    return axios.get(`${variables.DEFAULT_URL}${el.movie.mediaType}/${el.movie.movieId}?api_key=${variables.API_KEY}&language=en-US`)
  })

  const result = await axios.all(reqArr)

  return result
}

export const addToHistory = async (movie) => {
  const res = await axios.post(`${variables.API_URL}api/UserHistory/add`,
    {
      movieId: `${movie.id}`,
      mediaType: defineMediatype(movie)
    },
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    })
  return res.data
}

export const defineMediatype = (media) => {
  if (media.number_of_seasons !== undefined || media.first_air_date !== undefined)
    return 'tv'
  else
    return 'movie'
}