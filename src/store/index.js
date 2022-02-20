
import { applyMiddleware, combineReducers, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import { authReducer } from "./authReducer"

const rootReducer = combineReducers({
	userInfo: authReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))