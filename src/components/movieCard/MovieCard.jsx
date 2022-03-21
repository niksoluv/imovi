import { Card } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { smallImageStyle, notFoundUrl } from "../../variables"

const MovieCard = (props) => {
  return (
    <Card key={props.movie.id}
      className={'overflow-hidden card border-secondary m-1 text-white'} style={{ width: '10rem', border: 'none' }}>
      <NavLink to={{
        pathname: '/details'
      }}
        state={{ movie: props.movie }}
        style={{ textDecoration: 'none', color: 'grey' }}>
        {props.movie.poster_path ?
          <Card.Img style={smallImageStyle} fluid src={`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`} />
          :
          <Card.Img style={smallImageStyle} fluid src={notFoundUrl.movieSmallPoster} />
        }
        <Card.Text className="mt-0.5 p-2" >
          {props.movie.original_title ? props.movie.original_title : props.movie.original_name}
        </Card.Text>
      </NavLink>
    </Card >
  )
}

export default MovieCard