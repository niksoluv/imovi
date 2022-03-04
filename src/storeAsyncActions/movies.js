import axios from "axios"
import { variables } from "../variables"

export const getTrending = async () => {
    let response = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${variables.API_KEY}`)
    return response.data
}