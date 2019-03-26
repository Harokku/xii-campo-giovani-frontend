import React, {useState} from 'react'
import './Login.scss'
import logo from "../../base.png";
import {AuthConsumer} from "../../AuthContext";
import {Redirect} from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setError] = useState(false)

  const doLogin = async (e, login, user, password) => {
    e.preventDefault();
    const result = await login(user, password);
    if (result.success === true) {
      setError(false)
    } else {
      setError(true)
    }
  };

  return (
    <AuthConsumer>
      {({isAuth, login}) => (
        isAuth
          ? <Redirect to="/"/>
          : <section className="hero is-redcross is-fullheight">

            <div className="hero-head">
              {isError
                ? <div className="container">
                  <div className="notification is-danger has-text-centered">
                  <span className="icon">
                    <i className="fas fa-exclamation"/>
                  </span>
                    Login fallito, inserisci nuovamente i dati!
                  </div>
                </div>
                : <></>
              }
            </div>

            <div className="hero-body">
              <div className="container">
                <div className="columns is-centered">
                  <div className="column">
                    <form className="box">
                      <div className="field has-text-centered">
                        <img src={logo} width="150" alt="logo"/>
                      </div>
                      <div className="field">
                        <label className="label">Email</label>
                        <div className="control has-icons-left">
                          <input className="input"
                                 type="email"
                                 placeholder="Email di login"
                                 value={user}
                                 onChange={e => setUser(e.target.value)}
                                 required/>
                          <span className="icon is-left is-small">
                    <i className="fas fa-envelope"/>
                  </span>
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Password</label>
                        <div className="control has-icons-left">
                          <input className="input"
                                 type="password"
                                 placeholder="Password"
                                 value={password}
                                 onChange={e => setPassword(e.target.value)}
                                 required/>
                          <span className="icon is-left is-small">
                    <i className="fas fa-lock"/>
                  </span>
                        </div>
                      </div>
                      <div className="field">
                        <button className="button is-success" onClick={(e) => doLogin(e, login, user, password)}>Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

          </section>
      )}
    </AuthConsumer>
  )
}

export default Login