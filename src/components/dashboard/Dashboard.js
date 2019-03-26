import React, {useState} from 'react'
import './Dashboard.scss'
import PropTypes from 'prop-types'
import TitleBar from "../titleBar/TitleBar";
import ParticipantsStatusList from "./ParticipantsStatusList";
import Login from "../login/Login";
import ProtectedRoute from "../../App";
import {BrowserRouter as Router, NavLink, Route, Switch} from "react-router-dom";
import ParticipantsList from "../participants/ParticipantsList";

const Dashboard = (props) => {
  const [isMenuVisible, setMenuVisible] = useState(false);


  const toggleMenuVisibility = () => {
    setMenuVisible(!isMenuVisible)
  }

  return (
    <>
      <TitleBar logoFunc={toggleMenuVisibility}/>
      <section>
        <div className="columns">
          {isMenuVisible
            ? <div className="column “is-4-tablet is-3-desktop is-2-widescreen”">
              <nav className="menu">
                <p className="menu-label">
                  Menu
                </p>
                <ul className="menu-list">
                  <li>
                    <NavLink to="/participantsStatus" activeClassName="is-active">
                    <span className="icon">
                      <i className="fas fa-tachometer"/>
                    </span>
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/participants" activeClassName="is-active">
                    <span className="icon">
                      <i className="fas fa-tachometer"/>
                    </span>
                      Partecipanti
                    </NavLink>
                  </li>
                  <li>
                    <a>
                    <span className="icon">
                      <i className="fas fa-tachometer"/>
                    </span>
                      Viaggi
                    </a>
                  </li>
                  <li>
                    <a>
                    <span className="icon">
                      <i className="fas fa-tachometer"/>
                    </span>
                      Turni
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            : null
          }

          <div className="column">
              <Switch>
                <Route path="/participantsStatus" component={ParticipantsStatusList}/>
                <Route path="/participants" component={ParticipantsList}/>

              </Switch>
          </div>

        </div>
      </section>
    </>
  )
}

Dashboard.propTypes = {}

export default Dashboard