const defaultState = {
	movies: []
}

const GET_MOVIES = 'GET_MOVIES'

export const moviesReducer = (state = defaultState, action) => {
	switch (action.type) {
		case GET_MOVIES:
			return { ...state, movies: action.payload.movies }
		default:
			return state
	}
}

export const getMoviesAction = (payload) => ({ type: GET_MOVIES, payload })