const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

function action(type, payload = {}, meta = {}) {
  return { type, payload, meta }
}

function createRequestTypes(base) {
  return [
    REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
      const act = acc
      act[type] = `${base}_${type}`
      return act
    }, {})
}

export const ActionTypes = {
  WEATHER: createRequestTypes('WEATHER'),
}

export const weather = {
  request: cityName => action(ActionTypes.WEATHER.REQUEST, { cityName }),
  success: (response, message) => action(ActionTypes.WEATHER.SUCCESS, { response, message }),
  failure: (error, message) => action(ActionTypes.WEATHER.FAILURE, { error, message }),
}
