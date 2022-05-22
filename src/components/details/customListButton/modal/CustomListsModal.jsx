import { useEffect, useState } from "react"
import { Button, Dropdown, Modal, Table } from "react-bootstrap"
import { mapLists } from "../../../../storeAsyncActions/customLists"

const CustomListsModal = (props) => {

  const lists = [
    "list1",
    "list2",
    "list3",
    "list4",
    "list5",
    "list6",
  ]

  useEffect(() => {
    setMappedLists(mapLists(lists))
  }, [props])

  const [showInput, setShowInput] = useState(false)
  const [listName, setListName] = useState("")
  const [mappedLists, setMappedLists] = useState([])

  const handleCreateList = () => {

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