const defaultState = {
	lists: [],
	listMovies: []
}

const GET_LISTS = 'GET_LISTS'
const GET_LISTMOVIES = 'GET_LISTMOVIES'

export const listsReducer = (state = defaultState, action) => {
	switch (action.type) {
		case GET_LISTS:
			return { ...state, lists: action.payload.lists }
		case GET_LISTMOVIES:
			return { ...state, listMovies: action.payload.listMovies }
		default:
			return state
	}
}

export const getListsAction = (payload) => ({ type: GET_LISTS, payload })
export const getListMoviesAction = (payload) => ({ type: GET_LISTMOVIES, payload })