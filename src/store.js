import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import LayoutReducer from './layout/reducer/reducer'
import LayoutInitialState from './layout/reducer/initialState'

// Collapse all logs and ignore system-level logs (show only app-specific)
const loggerMiddleware = createLogger({
  collapsed: true,
  predicate: (getState, action) => action.type && !action.type.match(/^@@/),
})

const middlewares = [thunkMiddleware]
if (process.env.NODE_ENV === 'development') {
  middlewares.push(loggerMiddleware)
}

const reducers = combineReducers({
  layout: LayoutReducer,
})

const initialState = {
  layout: LayoutInitialState,
}

export default createStore(reducers, initialState, compose(applyMiddleware(...middlewares)))
