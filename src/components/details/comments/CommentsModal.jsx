import { useEffect, useState } from "react"
import { Button, Col, Container, Dropdown, Modal, Row, Table } from "react-bootstrap"
import { replyComment } from "../../../storeAsyncActions/comments"

const CommentsModal = (props) => {

  const [commentData, setCommentData] = useState("")

  const commentId = props.state.id

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h5>Reply to {props.state.user?.username}</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <textarea
          onInput={(e) => { setCommentData(e.target.value) }}
          className="form-control mt-1"
          id="commentReplyTextArea"
          value={commentData}
          placeholder="Type comment reply..."
          rows="1"></textarea>
        <div className="d-flex justify-content-end mt-3">
          <button onClick={() => {
            props.handleCommentReply(commentId, commentData)
            setCommentData("")
          }} type="button" className="btn btn-danger" style={{ marginLeft: '10px' }}>
            Reply <i className="fas fa-long-arrow-alt-right ms-1"></i>
          </button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => {
          props.onHide()
        }}>Close</Button>
      </Modal.Footer>
    </Modal >
  )
}

export default CommentsModal