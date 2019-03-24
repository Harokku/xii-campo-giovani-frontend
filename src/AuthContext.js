import React, {useState} from 'react'
import axios from 'axios'

const AuthContext = React.createContext(false);

const AuthProvider = (props) => {
  const remoteURL = process.env.REACT_APP_REMOTE_URI;
  const localStorageName = "Campia_JWT";

  const [isAuth, setIsAuth] = useState(localStorage[localStorageName] ? true : false);

  /**
   * Login a user with supplied parameter.
   *
   * @param {string} user - Username
   * @param {string} password - User's password
   * @returns {Promise<*>} Object with login status
   */
  const login = async (user, password) => {
    try {
      const response = await axios.post(`${remoteURL}/authentication`, {
        strategy: "local",
        email: user,
        password: password
      });
      localStorage.setItem(localStorageName, JSON.stringify(response.data.accessToken))
      console.log(response);
      setIsAuth(true)
      return {
        success: true,
        status: 'LoggedIn',
      }
    } catch (e) {
      return {
        success: false,
        status: 'Not LoggedIn'
      }
    }
  };

  /**
   * Logout current logged user
   * @returns {{success: boolean, status: string}}
   */
  const logout = () => {
    localStorage.removeItem(localStorageName);
    setIsAuth(false);
    console.warn("Logged out")
    return {
      success: true,
      status: 'LoggedOut'
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuth,
        login: login,
        logout: logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

const AuthConsumer = AuthContext.Consumer;

export {AuthProvider, AuthConsumer}