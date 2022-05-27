import { useEffect, useState } from 'react'
import { Badge, Button, Col, Container, Image, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { addToFavourites, isMovieInFavourites, removeFromFavourites } from '../../../storeAsyncActions/account'
import CustomListsModal from './modal/CustomListsModal'

const captions = {
  add: 'Add to Your list',
}

const AddToCustomListButton = (props) => {

  const [modalShow, setModalShow] = useState(false)

  const clickHandler = () => {
    setModalShow(true)
  }

  return (
    <>
      <CustomListsModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        state={props.state}
      />
      <Button onClick={clickHandler}
        className='bg-warn mt-1' style={{ marginLeft: "2px" }} >
        {captions.add}
      </Button>
    </>
  )
}

export default AddToCustomListButton