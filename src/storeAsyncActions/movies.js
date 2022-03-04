import axios from "axios"
import { variables } from "../variables"

export const getTrending = async () => {
    let response = await axios.get(`${variables.DEFAULT_URL}trending/all/day?api_key=${variables.API_KEY}`)
    return response.data
}

export const search = async (keyword) => {
    const res = await axios.get(`${variables.DEFAULT_URL}search/multi?api_key=${variables.API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`)
    return res.data
}