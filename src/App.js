import React from 'react';
import './App.scss';
import Login from "./components/login/Login";
import {AuthProvider} from "./AuthContext";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./components/dashboard/Dashboard";

const App = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/login" component={Login}/>
            <ProtectedRoute path="/" component={Dashboard}/>
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
