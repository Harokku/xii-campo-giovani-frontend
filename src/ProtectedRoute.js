import React from 'react'
import {AuthConsumer} from "./AuthContext";
import {Route, Redirect} from "react-router-dom";

const ProtectedRoute = ({component: Component, ...rest}) => (
  <AuthConsumer>
    {({isAuth}) => (
      <Route
        render={props =>
          isAuth
            ? <Component {...props} />
            : <Redirect to="/login"/>
        }
        {...rest}
      />
    )}
  </AuthConsumer>
)

export default ProtectedRoute