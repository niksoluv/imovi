import axios from "axios"
import { NavLink } from "react-router-dom"
import { variables } from "../variables"

export const getActorData = async (actor) => {
  let response = await axios.get(`${variables.DEFAULT_URL}person/${actor.id}?api_key=${variables.API_KEY}`)
  return response.data
}

export const getCombinedCredits = async (actor) => {
  const compare = (a, b) => {
    if (a.vote_average > b.vote_average && a.vote_average < 10)
      return -1
    if (a.vote_average < b.vote_average)
      return 1
    return 0
  }
  let response = await axios.get(`${variables.DEFAULT_URL}person/${actor.id}/combined_credits?api_key=${variables.API_KEY}`)
  response.data.cast.sort(compare)
  debugger
  return response.data.cast.slice(0, 10);
}

export const mapCreditsTable = async (actor) => {
  const compare = (a, b) => {
    if (a.release_date ? a.release_date : a.first_air_date > b.release_date ? b.release_date : b.first_air_date)
      return -1
    if (a.release_date ? a.release_date : a.first_air_date < b.release_date ? b.release_date : b.first_air_date)
      return 1
    return 0
  }

  let response = await axios.get(`${variables.DEFAULT_URL}person/${actor.id}/combined_credits?api_key=${variables.API_KEY}`)
  response.data.cast.sort(compare)
  const table = response.data.cast.map(el => {
    let date = ""
    if (el.release_date !== "") {
      date = new Date(el.release_date ? el.release_date : el.first_air_date)
      date = date.getFullYear()
    }
    else
      date = "----"
    return (
      <tr>
        <td>{date}</td>
        <td><NavLink to={{
          pathname: '/details'
        }}
          state={{ movie: el }}
          style={{ textDecoration: 'none', color: 'grey' }}>{el.media_type === 'movie' ? el.original_title : el.name}
        </NavLink> as {el.character}</td>
      </tr>)
  })
  return table
}