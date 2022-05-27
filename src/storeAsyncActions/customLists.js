import axios from "axios"
import { Col, Container, Row } from "react-bootstrap"
import { variables } from "../variables"
import { defineMediatype } from './account';

export const getLists = async () => {
  let response = await axios.get(`${variables.API_URL}api/CustomLists/lists`,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    })
  return response.data
}

export const createList = async (listname) => {
  let response = await axios.post(`${variables.API_URL}api/CustomLists/create`,
    { listName: listname },
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    })
  return response.data
}

export const addToList = async (movie, listId) => {
  const data = {
    movie: {
      movieId: `${movie.id}`,
      mediaType: defineMediatype(movie),
    },
    customListId: `${listId}`
  }

  let response = await axios.post(`${variables.API_URL}api/CustomLists/add`,
    data,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    })
  return response.data
}

export const removeFromList = async (movie) => {
  let response = await axios.post(`${variables.API_URL}api/CustomLists/remove`,
    movie,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    })
  return response.data
}

export const deleteList = async (list) => {
  let response = await axios.delete(`${variables.API_URL}api/CustomLists/delete`,
    {
      data:{...list},
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    })
  return response.data
}