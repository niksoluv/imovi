import { Card, Image } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { notFoundUrl, smallImageStyle } from "../../../../variables";

const CastCard = (props) => {

  const actor = props.state
  return (
    <Card key={actor.id}
      className={'overflow-hidden card border-secondary text-white'} style={{ width: '10rem', border: 'none' }}>
      <NavLink to={{
        pathname: '/castDetail'
      }}
        state={{ actor: actor }}
        style={{ textDecoration: 'none', color: 'grey' }}>
        {actor.profile_path === undefined || actor.profile_path === null ?
          <Card.Img style={smallImageStyle} src={notFoundUrl.actor} />
          :
          <Card.Img style={smallImageStyle} src={`https://image.tmdb.org/t/p/original${actor.profile_path}`} />
        }
        <h6 className="mt-0.5">{actor.character}</h6>
        <Card.Text className="mt-0.5" >
        </Card.Text>
        <h6 className="mt-0.5">{actor.name}</h6>
        <Card.Text className="mt-0.5" >
        </Card.Text>
      </NavLink>
    </Card >
  )
}

export default CastCard