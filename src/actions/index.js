const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

const action = (type, payload = {}, meta = {}) => ({ type, payload, meta })

const createRequestTypes = base =>
  [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    const act = acc
    act[type] = `${base}_${type}`
    return act
  }, {})

export const ActionTypes = {
  WEATHER: createRequestTypes('WEATHER'),
}

export const weather = {
  request: cityName => action(ActionTypes.WEATHER.REQUEST, { cityName }),
  success: (response, message) => action(ActionTypes.WEATHER.SUCCESS, { response, message }),
  failure: (error, message) => action(ActionTypes.WEATHER.FAILURE, { error, message }),
}
