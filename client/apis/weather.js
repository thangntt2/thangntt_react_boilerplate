import request from 'superagent'

export const fetchWeather = (cityName, units = 'metric') =>
  request.get('https://api.openweathermap.org/data/2.5/weather')
    .query({ q: cityName })
    .query({ units })
    .query({ APPID: 'dbff45088e57605fcc04bd276c3dfed8' })
    .then(response => ({ response: response.body }))
    .catch(error => ({ error }))
