import React from 'react'
import PropTypes from 'prop-types'
import {AuthConsumer} from "./AuthContext";
import {Route, Redirect} from "react-router-dom";

const ProtectedRoute = ({component: Component, ...rest}) => (
  <AuthConsumer>
    {({isAuth}) => (
      <Route
        render={props =>
          isAuth
            ? <Component {...props} />
            : <Redirect to="/"/>
        }
        {...rest}
      />
    )}
  </AuthConsumer>
)

ProtectedRoute.propTypes = {}

export default ProtectedRoute