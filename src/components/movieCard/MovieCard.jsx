import { useEffect, useState } from "react"
import { Card, Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import { getListMoviesAction } from "../../store/listsReducer"
import { getFavoritesAction } from "../../store/moviesReducer"
import { defineMediatype, getFavourites, removeFromFavourites } from "../../storeAsyncActions/account"
import { removeFromList } from "../../storeAsyncActions/customLists"
import { smallImageStyle, notFoundUrl } from "../../variables"

const MovieCard = (props) => {


  const dispatch = useDispatch()

  const date = new Date(props.movie.release_date ? props.movie.release_date : props.movie.first_air_date)

  const clickHandler = () => {
    if (props.mode === "fav") {
      removeFromFavourites(props.movie.id).then(res => {
        getFavourites().then(res => {
          const payload = { favorites: res }
          dispatch(getFavoritesAction(payload))
        })
      })
    }
    else {
      const listMovie = props.list.relatedMovies.filter(m => m.movie.movieId == props.movie.id)[0]
      removeFromList(listMovie).then((res) => {
        const payload={
          listMovies:res
        }
        dispatch(getListMoviesAction(payload))
      })
    }
  }

  return (
    <Card key={props.movie.id}
      className={'overflow-hidden card border-secondary bg-dark mt-1 text-white'} style={{ width: '10rem', border: 'none' }}>
      {props.mode === "fav" || props.mode === "custom" ?
        <Button className="btn-danger btn-sm" style={{ position: "absolute" }}
          onClick={clickHandler}>remove</Button>
        :
        <></>}
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
      </NavLink>
      <Card.Text className="mt-0.5 p-2 overflow-hidden" style={{ height: '60px' }} >
        {props.movie.original_title ? props.movie.original_title : props.movie.original_name} {`(${date.getFullYear()})`}
      </Card.Text>
    </Card >
  )
}

export default MovieCard