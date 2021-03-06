
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TextField } from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { weather as weatherAction } from '../../actions'
import styles from './style'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
    }
  }

  handleChangeText = (e, v) => {
    this.setState({
      value: v,
    })
  }

  handleKeypress = (e) => {
    if (e.key === 'Enter') {
      console.log(`Searching for weather in ${this.state.value}`)
      this.props.fetchWeather(this.state.value)
    }
  }

  render() {
    const { weather } = this.props
    return (
      <MuiThemeProvider>
        <div style={styles.container}>
          <text>React js boilerplate, demo with Open weather API</text><br />
          <TextField
            floatingLabelText="Enter your city name"
            hintText="Hanoi"
            value={this.state.value}
            onChange={this.handleChangeText}
            onKeyPress={this.handleKeypress}
          />
          { weather && weather.data &&
            <text>Current temp = {weather.data.main.temp} C</text>
          }
        </div>
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state) {
  const { weather } = state
  return {
    weather,
  }
}

export default connect(mapStateToProps, {
  fetchWeather: weatherAction.request,
})(App)
