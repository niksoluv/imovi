import { Card } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom";

const MovieCard = (props) => {

  return (
    <Card className={'overflow-hidden bg-dark card border-secondary mb-1 text-white'} style={{ width: '15rem', height: '18rem' }}>
      <NavLink to={{
        pathname: '/details'
      }}
        state={{ movie: props.movie }}
        style={{ textDecoration: 'none', color: 'white' }}>
        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original${props.movie.backdrop_path}`} />
        <Card.Body >
          <Card.Title>{props.movie.original_title}</Card.Title>
          <Card.Text >
            <div >
              {props.movie.overview}
            </div>
          </Card.Text>
        </Card.Body>
      </NavLink>
    </Card >
  )
}

export default MovieCard