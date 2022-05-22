import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { addComment, getComments, likeComment, unlikeComment } from "../../../storeAsyncActions/comments";
import styles from "./CommentsSection.module.css"
import { mapComments } from './../../../storeAsyncActions/comments';
import { useDispatch, useSelector } from "react-redux";
import { getCommentsAction } from "../../../store/commentsReducer";

const CommentsSection = (props) => {

  const [commentActive, setCommentActive] = useState(false)
  const [commentData, setCommentData] = useState("")
  const [comments, setComments] = useState([])

  const dispatch = useDispatch()
  const storedComments = useSelector((state) => {
    return state.comments.comments
  })

  const userInfo = useSelector((state) => {
    return state.userInfo.userData
  })

  useEffect(() => {
    getComments(props.state.id).then(res => {
      const payload = {
        comments: res.response
      }
      dispatch(getCommentsAction(payload))
    })
  }, [userInfo])

  useEffect(() => {
    setComments(mapComments(storedComments, userInfo.id, props.state.id))
  }, [storedComments])

  const handleInput = (e) => {
    setCommentData(e.target.value)
  }

  const warn = (message) => toast.warn(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const notify = (message) => toast.info(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const notify_warn = (message) => toast.warn(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const handleAddComment = () => {
    if (commentData === "" || commentData === undefined) {
      warn("Comment can't be empty")
      return
    }
    if (userInfo?.id === undefined) {
      notify_warn("You need to be logged in to leave comments")
      return
    }
    addComment(props.state.id, props.state.mediaType, commentData).then(res => {
      console.log(res.response)
      setCommentData("")
      notify("Your comment successfully added")
    })
      .then(res => {
        getComments(props.state.id).then(res => {
          const payload = {
            comments: res.response
          }
          dispatch(getCommentsAction(payload))
        })
      })

  }

  const mapComments = (comments, userId, movieId) => {
    const mappedComments = comments?.map(comment => {
      const usersLikes = comment.usersLikes
      const commentLiked = usersLikes.filter(ul => ul.userId === userId).length > 0 ? true : false

      // const badgeStyle=userLikes.
      const date = new Date(comment.date)
      return (
        <>
          <div className="d-flex flex-start ">
            <img className="rounded-circle shadow-1-strong me-3"
              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(23).webp" alt="avatar" width="60"
              height="60" />
            <div>
              <h6 className="fw-bold mb-1">{comment.user.username}</h6>
              <div className="d-flex align-items-center mb-3">
                <p className="mb-0 m-1">
                  {date.toDateString()}
                </p>
                {comment.user.id === userId ?
                  <div className={`btn-sm link-muted ${styles.button}`}><i className="fa fa-pencil-alt "></i></div>
                  :
                  <></>
                }
                <div className={`btn-sm link-muted ${styles.button}`}><i className="fas fa-redo-alt ms-2"></i></div>
                <div className={`btn-sm link-muted ${commentLiked ? styles.button_red : styles.button}`}>
                  <i className={`fas fa-heart ms-2`}
                    onClick={() => {
                      if (userInfo?.id === undefined) {
                        notify_warn("You need to be logged in to like or unlike comments")
                        return
                      }
                      commentLiked ? unlikeComment(comment.id, movieId)
                        .then(res => {
                          getComments(props.state.id).then(res => {
                            const payload = {
                              comments: res.response
                            }
                            dispatch(getCommentsAction(payload))
                          })
                        }) : likeComment(comment.id, movieId)
                          .then(res => {
                            getComments(props.state.id).then(res => {
                              const payload = {
                                comments: res.response
                              }
                              dispatch(getCommentsAction(payload))
                            })
                          })
                    }}>{` ${comment.usersLikes.length}`}</i>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-0 text-wrap">
            {comment.data}
          </div>

          <Row>
            <Col xs={1} xl={1} lg={1} md={1} sm={1}></Col>
            <Col xs={10} xl={10} lg={10} md={10} sm={10}>
            <div className="d-flex flex-start ">
            <img className="rounded-circle shadow-1-strong me-3"
              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(23).webp" alt="avatar" width="60"
              height="60" />
            <div>
              <h6 className="fw-bold mb-1">{comment.user.username}</h6>
              <div className="d-flex align-items-center mb-3">
                <p className="mb-0 m-1">
                  {date.toDateString()}
                </p>
                {comment.user.id === userId ?
                  <div className={`btn-sm link-muted ${styles.button}`}><i className="fa fa-pencil-alt "></i></div>
                  :
                  <></>
                }
                <div className={`btn-sm link-muted ${styles.button}`}><i className="fas fa-redo-alt ms-2"></i></div>
                <span>
                <div className={`btn-sm link-muted ${commentLiked ? styles.button_red : styles.button}`}>
                  <i className={`fas fa-heart ms-2 no-wrap`}
                    onClick={() => {
                      if (userInfo?.id === undefined) {
                        notify_warn("You need to be logged in to like or unlike comments")
                        return
                      }
                      commentLiked ? unlikeComment(comment.id, movieId)
                        .then(res => {
                          getComments(props.state.id).then(res => {
                            const payload = {
                              comments: res.response
                            }
                            dispatch(getCommentsAction(payload))
                          })
                        }) : likeComment(comment.id, movieId)
                          .then(res => {
                            getComments(props.state.id).then(res => {
                              const payload = {
                                comments: res.response
                              }
                              dispatch(getCommentsAction(payload))
                            })
                          })
                    }}>{` ${comment.usersLikes.length}`}</i>
                </div></span>
              </div>
            </div>
          </div>
          <div className="mb-0 text-wrap">
            {comment.data}
          </div>
            </Col>
          </Row>
          <Row>
            <Col xs={1} xl={1} lg={1} md={1} sm={1}></Col>
            <Col xs={10} xl={10} lg={10} md={10} sm={10}>
            <div className="d-flex flex-start ">
            <img className="rounded-circle shadow-1-strong me-3"
              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(23).webp" alt="avatar" width="60"
              height="60" />
            <div>
              <h6 className="fw-bold mb-1">{comment.user.username}</h6>
              <div className="d-flex align-items-center mb-3">
                <p className="mb-0 m-1">
                  {date.toDateString()}
                </p>
                {comment.user.id === userId ?
                  <div className={`btn-sm link-muted ${styles.button}`}><i className="fa fa-pencil-alt "></i></div>
                  :
                  <></>
                }
                <div className={`btn-sm link-muted ${styles.button}`}><i className="fas fa-redo-alt ms-2"></i></div>
                <span>
                <div className={`btn-sm link-muted ${commentLiked ? styles.button_red : styles.button}`}>
                  <i className={`fas fa-heart ms-2 no-wrap`}
                    onClick={() => {
                      if (userInfo?.id === undefined) {
                        notify_warn("You need to be logged in to like or unlike comments")
                        return
                      }
                      commentLiked ? unlikeComment(comment.id, movieId)
                        .then(res => {
                          getComments(props.state.id).then(res => {
                            const payload = {
                              comments: res.response
                            }
                            dispatch(getCommentsAction(payload))
                          })
                        }) : likeComment(comment.id, movieId)
                          .then(res => {
                            getComments(props.state.id).then(res => {
                              const payload = {
                                comments: res.response
                              }
                              dispatch(getCommentsAction(payload))
                            })
                          })
                    }}>{` ${comment.usersLikes.length}`}</i>
                </div></span>
              </div>
            </div>
          </div>
          <div className="mb-0 text-wrap">
            {comment.data}
          </div>
            </Col>
          </Row>
          <Row>
            <Col xs={1} xl={1} lg={1} md={1} sm={1}></Col>
            <Col xs={10} xl={10} lg={10} md={10} sm={10}>
            <div className="d-flex flex-start ">
            <img className="rounded-circle shadow-1-strong me-3"
              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(23).webp" alt="avatar" width="60"
              height="60" />
            <div>
              <h6 className="fw-bold mb-1">{comment.user.username}</h6>
              <div className="d-flex align-items-center mb-3">
                <p className="mb-0 m-1">
                  {date.toDateString()}
                </p>
                {comment.user.id === userId ?
                  <div className={`btn-sm link-muted ${styles.button}`}><i className="fa fa-pencil-alt "></i></div>
                  :
                  <></>
                }
                <div className={`btn-sm link-muted ${styles.button}`}><i className="fas fa-redo-alt ms-2"></i></div>
                <span>
                <div className={`btn-sm link-muted ${commentLiked ? styles.button_red : styles.button}`}>
                  <i className={`fas fa-heart ms-2 no-wrap`}
                    onClick={() => {
                      if (userInfo?.id === undefined) {
                        notify_warn("You need to be logged in to like or unlike comments")
                        return
                      }
                      commentLiked ? unlikeComment(comment.id, movieId)
                        .then(res => {
                          getComments(props.state.id).then(res => {
                            const payload = {
                              comments: res.response
                            }
                            dispatch(getCommentsAction(payload))
                          })
                        }) : likeComment(comment.id, movieId)
                          .then(res => {
                            getComments(props.state.id).then(res => {
                              const payload = {
                                comments: res.response
                              }
                              dispatch(getCommentsAction(payload))
                            })
                          })
                    }}>{` ${comment.usersLikes.length}`}</i>
                </div></span>
              </div>
            </div>
          </div>
          <div className="mb-0 text-wrap">
            {comment.data}
          </div>
            </Col>
          </Row>



          <hr className="mt-1" />
        </>
      )
    })

    return mappedComments
  }

  return (
    <div>
      <section>
        <Container className="container text-dark">
          <Row className="row d-flex justify-content-center">
            <Col className="md-12 col-lg-10">
              <Card className="card">
                <Card.Body className="card-body p-4">
                  <div className="d-flex flex-start w-100">
                    <img className="rounded-circle shadow-1-strong me-3"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp" alt="avatar" width="65"
                      height="65" />
                    <div className="w-100">
                      <h5>Add a comment</h5>
                      <div className="form-outline">
                        <textarea
                          onInput={(e) => handleInput(e)}
                          onClick={() => { setCommentActive(true) }}
                          className="form-control"
                          id="commentTextArea"
                          value={commentData}
                          placeholder="Add a comment..."
                          rows="2">
                        </textarea>
                      </div>
                      {commentActive ?
                        <div className="d-flex justify-content-end mt-3">
                          <button onClick={() => { setCommentActive(false) }} type="button" className="btn btn-secondary mr-1">Cancel</button>
                          <button onClick={handleAddComment} type="button" className="btn btn-danger" style={{ marginLeft: '10px' }}>
                            Comment <i className="fas fa-long-arrow-alt-right ms-1"></i>
                          </button>
                        </div>
                        :
                        <></>}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <Container>
          <Card className="text-dark">
            <Card.Body className="p-4">
              <h4 className="fw-light pb-2">Recent comments</h4>

              {comments}

            </Card.Body>
          </Card>

        </Container>
      </section>
    </div >
  )
}

export default CommentsSection