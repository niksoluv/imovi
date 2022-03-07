import { useEffect, useState } from 'react'
import { Badge, Col, Container, Image, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { getMovieDetails } from '../../storeAsyncActions/movies'

const Details = (props) => {

  const [movieData, setMovieData] = useState({})

  const location = useLocation()

  const movie = location.state.movie

  useEffect(() => {
    getMovieDetails(movie.id).then(res => {
      console.log(res)
      setMovieData(res)
    })
  }, [props])

  return (
    <Container className=' p-2' fluid={true} xl={10} lg={10} md={10} sm={10} xs={10} >
      <Row>
        <Col >
          <Image fluid={true} src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`} rounded />
        </Col>
      </Row>
      <Row>
        <Col>
          <Row>
            <h1>
              {movieData.title}
            </h1>
          </Row>
          {movieData.overview}
        </Col>
      </Row>
      <Row>

      </Row>
    </Container>
  )
}

export default Details