import React, {useState} from 'react'
import './Dashboard.scss'
import TitleBar from "../titleBar/TitleBar";
import ParticipantsStatusList from "./ParticipantsStatusList";
import {NavLink, Route, Switch} from "react-router-dom";
import ParticipantsList from "../participants/ParticipantsList";
import ParticipantDetail from "../participants/ParticipantDetail";
import VehiclesList from "../vehicles/VehiclesList";

const Dashboard = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);


  return (
    <>
      <TitleBar logoFunc={() => setMenuVisible(!isMenuVisible)}/>
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
                      <i className="fas fa-tachometer-alt"/>
                    </span>
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/participants" activeClassName="is-active">
                    <span className="icon">
                      <i className="fas fa-users"/>
                    </span>
                      Partecipanti
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/vehicles" activeClassName="is-active">
                    <span className="icon">
                      <i className="fas fa-tractor"/>
                    </span>
                      Mezzi
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/shifts" activeClassName="is-active">
                    <span className="icon">
                      <i className="fas fa-tachometer"/>
                    </span>
                      Turni
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
            : null
          }

          <div className="column">
            <Switch>
              <Route path="/participantsStatus" component={ParticipantsStatusList}/>
              <Route exact path="/participants/:participantId" component={ParticipantDetail}/>
              <Route path="/participants" component={ParticipantsList}/>
              {/*<Route exact path="/vehicles/:vechicleID" component={VehicleDetail}/>*/}
              <Route path="/vehicles" component={VehiclesList}/>
            </Switch>
          </div>

        </div>
      </section>
    </>
  )
};

export default Dashboard