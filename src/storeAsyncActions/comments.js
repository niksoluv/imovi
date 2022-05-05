import axios from "axios"
import { variables } from "../variables"
import styles from "../components/details/comments/CommentsSection.module.css"

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

export const mapComments = (comments) => {
  const mappedComments = comments.map(comment => {
    const date = new Date(comment.date)
    return (
      <>
        <div className="d-flex flex-start">
          <img className="rounded-circle shadow-1-strong me-3"
            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(23).webp" alt="avatar" width="60"
            height="60" />
          <div>
            <h6 className="fw-bold mb-1">{comment.user.username}</h6>
            <div className="d-flex align-items-center mb-3">
              <p className="mb-0 m-1">
                {date.toDateString()}
              </p>
              <div className={`btn-sm link-muted ${styles.button}`}><i className="fa fa-pencil-alt "></i></div>
              <div className={`btn-sm link-muted ${styles.button}`}><i className="fas fa-redo-alt ms-2"></i></div>
              <div className={`btn-sm link-muted ${styles.button}`}><i className="fas fa-heart ms-2"></i></div>
            </div>
            <p className="mb-0">
              {comment.data}
            </p>
          </div>
        </div>

        <hr className="mt-1" />
      </>
    )
  })

  return mappedComments
}