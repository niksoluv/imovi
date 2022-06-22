import { Container, Row } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { defineMediatype, getFavourites } from "../../storeAsyncActions/account"
import MovieCard from "../movieCard/MovieCard"

const FavouritesPage = (props) => {

  const [movies, setMovies] = useState([])

  const userData = useSelector((state) => {
    return state.userInfo.userData
  })

  const favMovies = useSelector((state) => {
    return state.movies.favorites
  })

  useEffect(() => {
    getFavourites().then(res => {
      const arr = res.map((el) => {
        el.data.media_type = defineMediatype(el.data)
        return (
          <MovieCard movie={el.data} mode="fav" />
        )
      })
      setMovies(arr)
    })
  }, [userData, favMovies])

  return (
    <Container className='d-flex p-2' fluid={true} xl={10} lg={10} md={10} sm={10} xs={10} >
      <Row className='d-flex justify-content-center'>
        {movies}
      </Row>
    </Container>
  )
}

export default FavouritesPage