import { Button, Card, Container, Col, Row, ButtonGroup, ButtonToolbar, ToggleButton } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { getUserData, logout } from "../../storeAsyncActions/account"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { getDataAction } from './../../store/authReducer'
import { getMovies, getTrending } from "../../storeAsyncActions/movies"
import MovieCard from "../movieCard/MovieCard"
import { ScrollMenu } from "react-horizontal-scrolling-menu"


const SearchPage = (props) => {

  const dispatch = useDispatch()

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