import { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { defineMediatype } from "../../storeAsyncActions/account"
import { smallImageStyle, notFoundUrl } from "../../variables"

const MovieCard = (props) => {

  const date = new Date(props.movie.release_date ? props.movie.release_date : props.movie.first_air_date)

  return (
    <Card key={props.movie.id}
      className={'overflow-hidden card border-secondary bg-dark mt-1 text-white'} style={{ width: '10rem', border: 'none' }}>
      <NavLink to={{
        pathname: `/details/${props.movie.id}/${defineMediatype(props.movie)}`
      }}
        state={{ movie: props.movie }}
        style={{ textDecoration: 'none', color: 'grey' }}>
        {props.movie.poster_path ?
          <Card.Img style={smallImageStyle} src={`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`} />
          :
          <Card.Img style={smallImageStyle} src={notFoundUrl.movieSmallPoster} />
        }
        <Card.Text className="mt-0.5 p-2 overflow-hidden" style={{ height: '60px' }} >
          {props.movie.original_title ? props.movie.original_title : props.movie.original_name} {`(${date.getFullYear()})`}
        </Card.Text>
      </NavLink>
    </Card >
  )
}

export default MovieCard