import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    error: false,
  }

  Namelogin = event => {
    this.setState({username: event.target.value})
  }

  Passwordlogin = event => {
    this.setState({password: event.target.value})
  }

  onsubmitsucess = jwtToken => {
    const {history} = this.props
    history.replace('/')
    Cookies.set('jwt_token', jwtToken, {expires: 30})
  }

  submitFailure = errorMsg1 => {
    this.setState({
      error: true,
      errorMsg: errorMsg1,
    })
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onsubmitsucess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  firsty = () => {
    const {username, password, errorMsg} = this.state
    return (
      <div className="alignthem">
        <label className="color" htmlFor="USERNAME">
          USERNAME
        </label>

        <input
          onChange={this.Namelogin}
          className="username1"
          type="text"
          label="USERNAME"
          id="USERNAME"
          value={username}
          placeholder="Username"
        />
      </div>
    )
  }

  secondy = () => {
    const {username, password, error, errorMsg} = this.state
    return (
      <div className="alignthem">
        <label className="color" htmlFor="password">
          PASSWORD
        </label>

        <input
          onChange={this.Passwordlogin}
          className="password1"
          type="password"
          id="password"
          value={password}
          placeholder="Password"
        />

        <button type="submit" className="loginbutton">
          LOGIN
        </button>
        {error && <p className="error1">*{errorMsg}</p>}
      </div>
    )
  }

  render() {
    const {username, password, error, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-container">
        <div className="login-card">
          <div className="centerist">
            <div className="jobby-card">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                className="logo-photo"
              />
            </div>
            <div className="user-details-card">
              <form onSubmit={this.submitForm}>
                {this.firsty()}
                {this.secondy()}
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
