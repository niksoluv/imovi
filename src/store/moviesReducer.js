const defaultState = {
	movies: [],
	favorites: []
}

const GET_MOVIES = 'GET_MOVIES'
const GET_FAVORITES = 'GET_FAVORITES'

export const moviesReducer = (state = defaultState, action) => {
	switch (action.type) {
		case GET_MOVIES:
			return { ...state, movies: action.payload.movies }
		case GET_FAVORITES:
			return { ...state, favorites: action.payload.favorites }
		default:
			return state
	}
}

export const getMoviesAction = (payload) => ({ type: GET_MOVIES, payload })
export const getFavoritesAction = (payload) => ({ type: GET_FAVORITES, payload })