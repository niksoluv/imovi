import axios from "axios"
import { variables } from "../variables"
import styles from "../components/details/comments/CommentsSection.module.css"
import { useDispatch } from "react-redux"
import { getCommentsAction } from "../store/commentsReducer"

export const addComment = async (movieId, mediaType, commentData) => {
  let res
  const comment = {
    data: commentData,
    movie: {
      movieId: movieId,
      mediaType: mediaType,
    }
  }
  try {
    res = await axios.post(`${variables.API_URL}api/comments/add`,
      comment,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
      })
    return res.data
  }
  catch (err) {
    console.log(err)
    return err
  }
}

export const getComments = async (movieId) => {
  try {
    const res = await axios.get(`${variables.API_URL}api/comments/${movieId}`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
      })
    return res.data
  }
  catch (err) {
    console.log(err)
    return err
  }
}

export const likeComment = async (commentId, movieId) => {
  const res = await axios.post(`${variables.API_URL}api/comments/like`,
    { commentId: commentId },
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    })
  return res.data
}

export const unlikeComment = async (commentId, movieId) => {
  const res = await axios.post(`${variables.API_URL}api/comments/unlike`,
    { commentId: commentId },
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    })
  return res.data
}

export const replyComment = async (commentId, commentData) => {
  let res
  const commentReply = {
    data: commentData,
    commentId: commentId
  }
  try {
    res = await axios.post(`${variables.API_URL}api/comments/reply`,
      commentReply,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
      })
    return res.data
  }
  catch (err) {
    console.log(err)
    return err
  }
}

export const editComment = async (comment, commentData) => {
  let res
  comment.data = commentData
  try {
    res = await axios.post(`${variables.API_URL}api/comments/edit`,
      comment,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
      })
    return res.data
  }
  catch (err) {
    console.log(err)
    return err
  }
}