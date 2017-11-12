
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import weather from './weather'

export default combineReducers({
  routing,
  weather
})
