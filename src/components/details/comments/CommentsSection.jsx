import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { addComment, getComments } from "../../../storeAsyncActions/comments";
import styles from "./CommentsSection.module.css"
import { mapComments } from './../../../storeAsyncActions/comments';
import { useSelector } from "react-redux";

const CommentsSection = (props) => {

  const [commentActive, setCommentActive] = useState(false)
  const [commentData, setCommentData] = useState("")
  const [comments, setComments] = useState([])

	const userInfo = useSelector((state) => {
		return state.userInfo.userData
	})

  useEffect(() => {
    getComments(props.state.id).then(res => {
      setComments(mapComments(res.response, userInfo.id))
    })
  }, [userInfo])

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

  const handleAddComment = () => {
    if (commentData === "" || commentData === undefined) {
      warn("Comment can't be empty")
      return
    }
    addComment(props.state.id, props.state.mediaType, commentData).then(res => {
      console.log(res.response)
      setCommentData("")
      notify("Your comment successfully added")
    })
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
                          <button onClick={handleAddComment} type="button" className="btn btn-danger" style={{marginLeft:'10px'}}>
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
        <Container className="p-s">
          <Row className="d-flex justify-content-center">
            <Col className="md-12 col-lg-10">
              <Card className="text-dark">
                <Card.Body className="p-4">
                  <h4 className="fw-light pb-2">Recent comments</h4>

                  {comments}

                </Card.Body>
              </Card>
            </Col>
          </Row>

        </Container>
      </section>
    </div >
  )
}

export default CommentsSection