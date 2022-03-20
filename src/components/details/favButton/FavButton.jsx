import { useEffect, useState } from 'react'
import { Badge, Button, Col, Container, Image, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { addToFavourites, isMovieInFavourites, removeFromFavourites } from '../../../storeAsyncActions/account'

const captions = {
  add: 'Add to favourites',
  remove: 'Remove from favourites',
  login: 'Log in to add',
  loading: 'Loading...',
}

const FavButton = (props) => {

  const [caption, setCaption] = useState(captions.loading)

  const userData = useSelector((state) => {
    return state.userInfo.userData
  })

  useEffect(() => {
    if (Object.keys(userData).length !== 0) {
      isMovieInFavourites(props?.state?.id).then(res => {
        if (userData === undefined) {
          setCaption(captions.login)
        }
        else {
          setCaption(res === true ? captions.remove : captions.add)
        }
      })
    }
    else {
      setCaption(captions.login)
    }
  }, [props, userData])

  const clickHandler = () => {
    switch (caption) {
      case captions.add: {
        addToFavourites(props.state).then(res => {
          if (res !== null)
            setCaption(captions.remove)
        })
        break
      }
      case captions.remove: {
        removeFromFavourites(props.state.id).then(res => {
          if (res !== null)
            setCaption(captions.add)
        })
        break
      }
      default: {
        setCaption(captions.add)
      }
    }
  }

  return (
    <Button onClick={clickHandler}
      className={userData.id !== undefined ? 'bg-info mt-1' : 'bg-secondary mt-1'}
      variant={userData.id !== undefined ? '' : 'disabled'} >
      {caption}
    </Button>
  )
}

export default FavButton