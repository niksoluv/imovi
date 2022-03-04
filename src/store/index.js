
import { applyMiddleware, combineReducers, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import { authReducer } from "./authReducer"
import { moviesReducer } from "./moviesReducer"

const rootReducer = combineReducers({
	userInfo: authReducer,
	movies: moviesReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))