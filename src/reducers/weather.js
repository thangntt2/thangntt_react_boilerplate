import { ActionTypes } from '../actions'

export default (state = {}, action) => {
  if (action.type === ActionTypes.WEATHER.SUCCESS) {
    const { payload: { response } } = action
    return {
      ...state,
      data: response
    }
  }
  return state
}
