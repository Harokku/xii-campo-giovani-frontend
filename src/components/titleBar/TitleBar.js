import React, {useState} from 'react'
import PropTypes from 'prop-types'
import './TitleBar.scss'
import logo from '../../base.png'
import {AuthConsumer} from '../../AuthContext'

const TitleBar = (props) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <AuthConsumer>
      {({isAuth, logout}) => (
        <nav className="navbar has-shadow is-redcross">
          <div className="navbar-brand">
            <a className="navbar-item" onClick={props.logoFunc}>
              <img src={logo} alt="Camp Logo"/>
            </a>
            <button className={`navbar-burger ${isMenuOpen ? 'is-active' : ''}`}
                    onClick={() => setMenuOpen(!isMenuOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          <div className={`navbar-menu ${isMenuOpen ? 'is-active' : ''}`}>
            <div className="navbar-start">
              <div className="navbar-item">
                CAMPia manager
              </div>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <button className="button is-info" onClick={() => logout()}>LogOut</button>
              </div>
            </div>
          </div>
        </nav>
      )}
    </AuthConsumer>
  )
}

TitleBar.propTypes = {
  logoFunc: PropTypes.func
}

export default TitleBar