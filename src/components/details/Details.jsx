import { useEffect, useState } from 'react'
import { Animated } from 'react-animated-css'
import { Badge, Col, Container, Image, Row } from 'react-bootstrap'
import { ScrollMenu } from 'react-horizontal-scrolling-menu'
import { NavLink, useLocation } from 'react-router-dom'
import { getMovieCast, getMovieDetails } from '../../storeAsyncActions/movies'
import CastCard from '../castCard/CastCard'

const Details = (props) => {

  const [movieData, setMovieData] = useState({})
  const [cast, setCast] = useState([])
  const location = useLocation()

  const movie = location.state.movie

  useEffect(() => {
    getMovieDetails(movie).then(res => {
      console.log(res)
      setMovieData(res)
    })
  }, [props])

  useEffect(() => {
    getMovieCast(movie).then(res => {
      console.log(res)
      setCast(res)
    })
  }, [props])

  console.log(movieData)

  const date = new Date(movieData.release_date ? movieData.release_date : movieData.first_air_date)
  const genres = movieData.genres?.map((el, index) => {
    return <NavLink
      style={{ color: 'white !important' }}
      to={{ pathname: el.name }}>{el.name}{index === movieData.genres.length - 1 ? '' : ', '}</NavLink>
  })

  return (
    <Container className=' p-2' fluid={true} xl={10} lg={10} md={10} sm={10} xs={10} >
      <Row>
        <Col lg={6} xs={'auto'} width={50}>
          <Image fluid={true} src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`} rounded />
        </Col>
        <Col>
          <Row height={50}>
            <h1>
              {movieData.title ? movieData.title : movieData.original_name} {`(${date.getFullYear()})`}
            </h1>
            <p className="font-italic">sdf</p>
          </Row>
          <Row xs="auto">
            <Col><Badge bg="dark">{genres}</Badge></Col>
            <Col><Badge bg="dark">{movieData?.runtime ?
              movieData?.runtime
              :
              movieData?.episode_run_time ? movieData?.episode_run_time[0] : ''}m</Badge></Col>
          </Row>
          {movieData.overview}
        </Col>
      </Row>
      Cast
      <Row >
        <ScrollMenu>
          {cast.map(el => {
            return <CastCard state={el} />
          })}
        </ScrollMenu>
      </Row>
    </Container >
  )
}

export default Details