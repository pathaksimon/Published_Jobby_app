import './index.css'
import {BiHomeAlt, BiLogIn} from 'react-icons/bi'
import {BsBag} from 'react-icons/bs'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="top">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="top-logo-pic"
          alt="website logo"
        />
      </Link>

      <ul className="t-second">
        <Link to="/">
          {' '}
          <p className="icon-design">Home</p>
        </Link>
        <Link to="/jobs">
          <p className="icon-design">Jobs</p>
        </Link>
      </ul>
      <div className="t-third">
        <button className="header-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
      <ul className="t-fourth">
        <Link to="/">
          <li className="hommi">
            <BiHomeAlt fontSize={35} />
          </li>
        </Link>
        <Link to="/jobs">
          <li className="hommi">
            <BsBag fontSize={35} />
          </li>
        </Link>
        <li className="hommi">
          <BiLogIn fontSize={35} onClick={onClickLogout} />
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Header)
