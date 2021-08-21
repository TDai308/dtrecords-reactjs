import React from 'react';
import './App.css';
import './grid.css'
import './static/icon/fontawesome/css/all.min.css'

import {BrowserRouter as Router, Route} from "react-router-dom";
import homePage from "./components/homePage";
import LogIn from "./components/LogIn";
import UserProvider from "./components/UserProvider";

function App() {
  return (
      <Router>
          <div className="App">
              <UserProvider>
                  <Route path="/" exact component={homePage}/>
                  <Route path="/login" exact component={LogIn}/>
              </UserProvider>
          </div>
      </Router>
  );
}

export default App;
