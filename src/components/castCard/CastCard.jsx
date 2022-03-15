import { Card, Image } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom";

const CastCard = (props) => {

  const actor = props.state
  return (
    <Card key={actor.id}
      className={'overflow-hidden card border-secondary m-1 text-white'} style={{ width: '7rem', border: 'none' }}>
      <NavLink to={{
        pathname: '/details'
      }}
        state={{ movie: props.movie }}
        style={{ textDecoration: 'none', color: 'grey' }}>
        <Card.Img src={`https://image.tmdb.org/t/p/original${actor.profile_path}`} />
        <Card.Text className="mt-0.5" >
          <h6>{actor.character}</h6>
        </Card.Text>
        <Card.Text className="mt-0.5" >
          <h6>{actor.name}</h6>
        </Card.Text>
      </NavLink>
    </Card >
  )
}

export default CastCard