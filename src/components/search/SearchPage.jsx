import { Container, Row } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import MovieCard from "../movieCard/MovieCard"


const SearchPage = (props) => {

  const [movies, setMovies] = useState([])

  const moviesData = useSelector((state) => {
    return state.movies.movies
  })

  useEffect(() => {
    const arr = moviesData?.results?.map((el) => {
      return (
        <MovieCard movie={el} />
      )
    })
    setMovies(arr)
  }, [moviesData?.results])

  return (
    <Container className='d-flex p-2' fluid={true} xl={10} lg={10} md={10} sm={10} xs={10} >
      <Row className='d-flex justify-content-center'>
        {movies}
      </Row>
    </Container>
  )
}

export default SearchPage