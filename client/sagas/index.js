import { put, call, fork } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
import { ActionTypes, weather } from '../actions'
import { WeatherAPI } from '../apis'

function* doFetchWeather(action) {
  const { payload: cityName } = action
  const { response, error } = yield call(WeatherAPI.fetchWeather, cityName.cityName)
  if (!error) {
    yield put(weather.success(response, `success fetch weather of ${cityName}`))
  } else {
    yield put(weather.failure(error, error.text))
  }
}

function* watchFetchWeather() {
  yield takeLatest(ActionTypes.WEATHER.REQUEST, doFetchWeather)
}

export default function* root() {
  yield [
    fork(watchFetchWeather),
  ]
}
