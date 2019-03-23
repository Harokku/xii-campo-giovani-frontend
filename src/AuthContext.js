import React, {useState} from 'react'
import axios from 'axios'

const AuthContext = React.createContext(false);

const AuthProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false)

  const login = async (user, password) => {
    try {
      const response = await axios.post('https://capia-backend.herokuapp.com/authentication', {
        strategy: "local",
        email: user,
        password: password
      });
      localStorage.setItem("Campia_JWT", JSON.stringify(response.data.accessToken))
      console.log(response)
      return "LoggedIn"
    } catch (e) {
      console.error(e)
      return "Error"
    }
  };

  const logout = () => {
    setIsAuth(false);
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