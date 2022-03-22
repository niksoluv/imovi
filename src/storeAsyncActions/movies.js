import axios from "axios"
import { variables } from "../variables"

export const getTrending = async (period, type) => {
	let response = await axios.get(`${variables.DEFAULT_URL}trending/${type}/${period}?api_key=${variables.API_KEY}`)
	return response.data
}

export const getMovies = async (type) => {
	let response = await axios.get(`${variables.DEFAULT_URL}movie/${type}?api_key=${variables.API_KEY}&language=en-US`)
	return response.data
}

export const getPopular = async (type) => {
	let response = await axios.get(`${variables.DEFAULT_URL}${type}/popular?api_key=${variables.API_KEY}&language=en-US`)
	return response.data
}

export const search = async (keyword) => {
	const res = await axios.get(`${variables.DEFAULT_URL}search/multi?api_key=${variables.API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`)
	return res.data
}

export const getMovieDetails = async (movieId, mediaType) => {
	let res = {}
	switch (mediaType) {
		case 'movie':
			res = await axios.get(`${variables.DEFAULT_URL}movie/${movieId}?api_key=${variables.API_KEY}&language=en-US`)
			break
		case 'tv':
			res = await axios.get(`${variables.DEFAULT_URL}tv/${movieId}?api_key=${variables.API_KEY}&language=en-US`)
			break
		default:
			res = await axios.get(`${variables.DEFAULT_URL}movie/${movieId}?api_key=${variables.API_KEY}&language=en-US`)
			break
	}
	return res.data
}

export const getMovieCast = async (movieId, mediaType) => {
	let res = {}
	switch (mediaType) {
		case 'movie':
			res = await axios.get(`${variables.DEFAULT_URL}movie/${movieId}/credits?api_key=${variables.API_KEY}&language=en-US`)
			break
		case 'tv':
			res = await axios.get(`${variables.DEFAULT_URL}tv/${movieId}/credits?api_key=${variables.API_KEY}&language=en-US`)
			break
		default:
			res = await axios.get(`${variables.DEFAULT_URL}movie/${movieId}/credits?api_key=${variables.API_KEY}&language=en-US`)
			break
	}
	return res.data.cast.length > 0 ? res.data.cast : res.data.crew
}

export const getVideos = async (movieId, mediaType) => {
	let res = {}
	switch (mediaType) {
		case 'movie':
			res = await axios.get(`${variables.DEFAULT_URL}movie/${movieId}/videos?api_key=${variables.API_KEY}&language=en-US`)
			break
		case 'tv':
			res = await axios.get(`${variables.DEFAULT_URL}tv/${movieId}/videos?api_key=${variables.API_KEY}&language=en-US`)
			break
		default:
			res = await axios.get(`${variables.DEFAULT_URL}movie/${movieId}/videos?api_key=${variables.API_KEY}&language=en-US`)
			break
	}
	return res.data
}