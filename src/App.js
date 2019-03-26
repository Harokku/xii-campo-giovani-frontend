import React, {useState} from 'react';
import './App.scss';
import Login from "./components/login/Login";
import {AuthProvider} from "./AuthContext";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./components/dashboard/Dashboard";

// Mock fetched data
let mockCardContent =
  {
    cardName: "Anagrafica",
    cardFields: [
      {icon: "fas fa-user", fieldName: "Cognome", fieldData: "Vernandelli"},
      {icon: "far fa-user", fieldName: "Nome", fieldData: "Giacalustra"},
    ]
  }

const App = () => {
  // Initial app state, as mock data waiting for backend
  const [cardContent, setCardContent] = useState(mockCardContent)

  const handleCardChange = (name, data) => {
    const newCard = {
      cardName: cardContent.cardName,
      cardFields: cardContent.cardFields.map(field => (
        field.fieldName === name
          ? {...field, fieldData: name}
          : field
      ))
    }
    setCardContent({
      cardName: cardContent.cardName,
      cardFields: cardContent.cardFields.map(field => (
        field.fieldName === name
          ? {...field, fieldData: data}
          : field
      ))
    })
  }

  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/login" component={Login}/>
            <ProtectedRoute path="/" component={Dashboard}/>
          </Switch>
          {/*<Guest
        cardName={cardContent.cardName}
        cardFields={cardContent.cardFields}
        onDataChange={handleCardChange}
      />*/}
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
