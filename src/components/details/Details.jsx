import { useEffect, useState } from 'react'
import { Badge, Button, Col, Container, Image, Row } from 'react-bootstrap'
import { ScrollMenu } from 'react-horizontal-scrolling-menu'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import { getMovieCast, getMovieDetails } from '../../storeAsyncActions/movies'
import { largeImageStyle, notFoundUrl } from '../../variables'
import CastCard from './castCard/CastCard'
import FavButton from './favButton/FavButton'
import VideoModal from './modal/VideoModal'

const Details = (props) => {

  const params = useParams();
  const movieId = params.id
  const mediaType = params.type

  const [movieData, setMovieData] = useState({})
  const [cast, setCast] = useState([])
  const location = useLocation()
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    getMovieDetails(movieId, mediaType).then(res => {
      console.log(res)
      setMovieData(res)
    })
  }, [props])

  useEffect(() => {
    getMovieCast(movieId, mediaType).then(res => {
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
      <VideoModal
        state={movieData}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Row>
        <Col lg={6} xs={'auto'} width={50}>
          {movieData.backdrop_path === undefined || movieData.backdrop_path === null ?
            <Image style={largeImageStyle} fluid={true} src={notFoundUrl.movieLargePoster} rounded />
            :
            <Image fluid={true} src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`} rounded />
          }
        </Col>
        <Col>
          <Row height={50}>
            <h1>
              {movieData.title ? movieData.title : movieData.original_name} {`(${date.getFullYear()})`}
            </h1>
            <p className="font-italic">{movieData.tagline}</p>
          </Row>
          <Row xs="auto">
            <Col><Badge bg="dark">{genres}</Badge></Col>
            <Col><Badge bg="dark">{movieData?.runtime ?
              movieData?.runtime
              :
              movieData?.episode_run_time ? movieData?.episode_run_time[0] : ''}m</Badge></Col>
          </Row>
          {movieData.overview}
          <Row xs="auto">
            <Button variant="danger" onClick={() => setModalShow(true)}>
              Watch trailer
            </Button>
          </Row>
          <Row xs="auto">
            <FavButton state={movieData} />
          </Row>
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