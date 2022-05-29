import { useEffect, useState } from 'react'
import { Badge, Button, Col, Container, Image, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { addToFavourites, isMovieInFavourites, removeFromFavourites } from '../../../storeAsyncActions/account'
import CustomListsModal from './modal/CustomListsModal'

const captions = {
  add: 'Add to Your list',
}

const AddToCustomListButton = (props) => {

  const userData = useSelector((state) => {
    return state.userInfo.userData
  })

  const [modalShow, setModalShow] = useState(false)

  const clickHandler = () => {
    setModalShow(true)
  }

  if (userData.id === undefined) {
    return (
      <>

      </>
    )
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