import { Card, Image } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom";

const MovieCard = (props) => {


  return (
    <Card className={'overflow-hidden bg-dark card border-secondary m-1 text-white'} style={{ width: '10rem' }}>
      <NavLink to={{
        pathname: '/details'
      }}
        state={{ movie: props.movie }}
        style={{ textDecoration: 'none', color: 'white' }}>
        <Card.Img src={`https://image.tmdb.org/t/p/original${props.movie.poster_path}`} />
        <Card.Text className="mt-0.5" >
          {props.movie.original_title ? props.movie.original_title : props.movie.original_name}
        </Card.Text>
      </NavLink>
    </Card >
  )
}

export default MovieCard