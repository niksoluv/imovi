const defaultState = {
	lists: []
}

const GET_LISTS = 'GET_LISTS'

export const listsReducer = (state = defaultState, action) => {
	switch (action.type) {
		case GET_LISTS:
			return { ...state, lists: action.payload.lists }
		default:
			return state
	}
}

export const getListsAction = (payload) => ({ type: GET_LISTS, payload })