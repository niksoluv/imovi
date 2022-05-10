const defaultState = {
	comments: []
}

const GET_COMMENTS = 'GET_COMMENTS'

export const commentsReducer = (state = defaultState, action) => {
	switch (action.type) {
		case GET_COMMENTS:
			return { ...state, comments: action.payload.comments }
		default:
			return state
	}
}

export const getCommentsAction = (payload) => ({ type: GET_COMMENTS, payload })