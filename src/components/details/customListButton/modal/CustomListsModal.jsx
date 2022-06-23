import { useEffect, useState } from "react"
import { Button, Col, Container, Dropdown, Modal, Row, Table } from "react-bootstrap"
import { addToList, createList, deleteList, getLists, mapLists, removeFromList } from "../../../../storeAsyncActions/customLists"
import { useDispatch, useSelector } from 'react-redux';
import { getListsAction } from "../../../../store/listsReducer";
import { defineMediatype } from "../../../../storeAsyncActions/account";

const CustomListsModal = (props) => {

  const [showInput, setShowInput] = useState(false)
  const [listName, setListName] = useState("")
  const [mappedLists, setMappedLists] = useState([])

  const dispatch = useDispatch()
  const comments = useSelector((state) => {
    return state.lists.lists
  })

  useEffect(() => {
    getLists().then(res => {
      const payload = {
        lists: res
      }
      dispatch(getListsAction(payload))
    })
  }, [props])

  useEffect(() => {
    setMappedLists(mapLists(comments, props.state))
  }, [comments])

  const handleCreateList = () => {
    createList(listName).then(() => {
      getLists().then(res => {
        const payload = {
          lists: res
        }
        dispatch(getListsAction(payload))
        setShowInput(false)
        setListName("")
      })
    })
  }

  const mapLists = (lists, movie) => {
    const res = lists.map(list => {
      const mediaType = defineMediatype(movie)

      const movies = list.relatedMovies
        .filter(m => m.movie.movieId === `${movie.id}` && m.movie.mediaType === mediaType)

      const isMovieInList = movies.length > 0
      return (
        <div class="alert alert-primary m-1 p-1">
          <Container fluid>
            <Row>
              <Col className="my-auto">
                {list.listName}
              </Col>
              <Col xl={2} lg={2} md={2} sm={2} xs={2} className="d-flex justify-content-end">
                {isMovieInList ?
                  <button className="btn btn-danger"
                    onClick={() => {
                      removeFromList(movies[0]).then(res => {
                        getLists().then(res => {
                          const payload = {
                            lists: res
                          }
                          dispatch(getListsAction(payload))
                        })
                      })
                    }}><i class="fa-solid fa-ban"></i></button>
                  :
                  <button className="btn btn-success"
                    onClick={() => {
                      addToList(props.state, list.id).then(res => {
                        getLists().then(res => {
                          const payload = {
                            lists: res
                          }
                          dispatch(getListsAction(payload))
                        })
                      })
                    }}><i class="fa-solid fa-plus"></i></button>
                }

                <button className="btn btn-danger"
                  onClick={() => {
                    deleteList(list).then(res => {
                      getLists().then(res => {
                        const payload = {
                          lists: res
                        }
                        dispatch(getListsAction(payload))
                      })
                    })
                  }}><i class="fa-solid fa-trash-can"></i></button>
              </Col>
            </Row>
          </Container>
        </div>
      )
    })
    return res
  }

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h5>Your lists</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
        {mappedLists}
        <Button onClick={() => { setShowInput(true) }} className="mt-2">Create new list</Button>
        {
          showInput ?
            <>
              <textarea
                onInput={(e) => { setListName(e.target.value) }}
                onClick={() => { }}
                className="form-control mt-1"
                id="commentTextArea"
                value={listName}
                placeholder="Type list name..."
                rows="1"></textarea>
              <div className="d-flex justify-content-end mt-3">
                <button onClick={() => { setShowInput(false) }} type="button" className="btn btn-secondary mr-1">Cancel</button>
                <button onClick={handleCreateList} type="button" className="btn btn-danger" style={{ marginLeft: '10px' }}>
                  Create <i className="fas fa-long-arrow-alt-right ms-1"></i>
                </button>
              </div>
            </>
            :
            <></>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal >
  )
}

export default CustomListsModal