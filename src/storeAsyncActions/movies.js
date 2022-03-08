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

export const getMovieDetails = async (movie) => {
    let res = {}
    switch (movie.media_type) {
        case 'movie':
            res = await axios.get(`${variables.DEFAULT_URL}movie/${movie.id}?api_key=${variables.API_KEY}&language=en-US`)
            break
        case 'tv':
            res = await axios.get(`${variables.DEFAULT_URL}tv/${movie.id}?api_key=${variables.API_KEY}&language=en-US`)
            break
    }
    return res.data
}

export const getMovieCast = async (movie) => {
    let res = {}
    switch (movie.media_type) {
        case 'movie':
            res = await axios.get(`${variables.DEFAULT_URL}movie/${movie.id}/credits?api_key=${variables.API_KEY}&language=en-US`)
            break
        case 'tv':
            res = await axios.get(`${variables.DEFAULT_URL}tv/${movie.id}/credits?api_key=${variables.API_KEY}&language=en-US`)
            break
    }
    return res.data.cast ? res.data.cast : res.data.crew
}