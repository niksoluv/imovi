import { Badge, Col, Container, Image, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

const Details = (props) => {

  const location = useLocation()
  const movie = location.state.movie
  console.log(movie)
  return (
    <Container className='d-flex p-2' fluid={true} xl={10} lg={10} md={10} sm={10} xs={10} >
      <Row>
        <Col xs={6}>
          <Image fluid={true} src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} rounded />
        </Col>
        <Col xs={6}>
          <Row>
            <h1>
              {movie.title}
            </h1>
          </Row>
          {movie.overview}
        </Col>
      </Row>
      <Row>

      </Row>
    </Container>
  )
}

export default Details