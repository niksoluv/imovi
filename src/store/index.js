
import { applyMiddleware, combineReducers, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import { authReducer } from "./authReducer"
import { backgroundReducer } from "./background"
import { moviesReducer } from "./moviesReducer"
import { commentsReducer } from "./commentsReducer"
import { listsReducer } from "./listsReducer"

const rootReducer = combineReducers({
	userInfo: authReducer,
	movies: moviesReducer,
	background: backgroundReducer,
	comments: commentsReducer,
	lists: listsReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))