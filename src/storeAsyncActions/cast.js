import axios from "axios"
import { NavLink } from "react-router-dom"
import { variables } from "../variables"
import { defineMediatype } from "./account"

export const getActorData = async (actorId) => {
  let response = await axios.get(`${variables.DEFAULT_URL}person/${actorId}?api_key=${variables.API_KEY}`)
  return response.data
}

export const getCombinedCredits = async (actorId) => {
  const compare = (a, b) => {
    if (a.vote_average > b.vote_average && a.vote_average < 10)
      return -1
    if (a.vote_average < b.vote_average)
      return 1
    return 0
  }
  let response = await axios.get(`${variables.DEFAULT_URL}person/${actorId}/combined_credits?api_key=${variables.API_KEY}`)
  let credits = response.data.cast.filter(credit => credit.adult !== true)
  credits.sort(compare)
  return credits.slice(0, 10);
}

export const mapCreditsTable = async (actorId) => {
  const compare = (a, b) => {
    let firstReleaseDate = a.release_date ? a.release_date : a.first_air_date
    let secondReleaseDate = b.release_date ? b.release_date : b.first_air_date
    if (firstReleaseDate === undefined)
      return 1
    else if (secondReleaseDate === undefined)
      return -1
    firstReleaseDate = firstReleaseDate.replaceAll("'", "")
    secondReleaseDate = secondReleaseDate.replaceAll("'", "")
    if (firstReleaseDate > secondReleaseDate) {
      return -1
    }
    if (firstReleaseDate < secondReleaseDate) {
      return 1
    }
    return 0
  }

  let response = await axios.get(`${variables.DEFAULT_URL}person/${actorId}/combined_credits?api_key=${variables.API_KEY}`)

  let credits = response.data.cast.filter(credit => credit.adult !== true)
  credits.sort(compare)
  const table = credits.map(el => {
    let date = ""
    if (el.release_date !== "") {
      date = new Date(el.release_date ? el.release_date : el.first_air_date)
      date = date.getFullYear()
    }
    else
      date = "----"
    return (
      <tr key={el.id}>
        <td style={{ color: 'white' }}>{date}</td>
        <td style={{ color: 'white' }}><NavLink to={{
          pathname: `/details/${el.id}/${defineMediatype(el)}`
        }}
          state={{ movie: el }}
          style={{ textDecoration: 'none', color: 'lightgrey' }}>{el.media_type === 'movie' ? el.original_title : el.name}
        </NavLink> as {el.character}</td>
      </tr>)
  })
  return table
}