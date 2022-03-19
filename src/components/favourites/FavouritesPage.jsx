import { Container, Row } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { getFavourites } from "../../storeAsyncActions/account"
import MovieCard from "../movieCard/MovieCard"


const FavouritesPage = (props) => {

  const dispatch = useDispatch()

  const [movies, setMovies] = useState([])

  const userData = useSelector((state) => {
    return state.userInfo.userData
  })

  useEffect(() => {
    getFavourites().then(res => {
      const arr = res.map((el) => {
        return (
          <MovieCard movie={el.data} />
        )
      })
      setMovies(arr)
    })
  }, [userData])

  return (
    <Container className='d-flex p-2' fluid={true} xl={10} lg={10} md={10} sm={10} xs={10} >
      <Row className='d-flex justify-content-center'>
        {movies}
      </Row>
    </Container>
  )
}

export default FavouritesPage