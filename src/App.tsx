import React from 'react';
import './App.css';
import './grid.css'
import './static/icon/fontawesome/css/all.min.css'

import {BrowserRouter as Router, Route} from "react-router-dom";
import homePage from "./components/homePage";
import LogIn from "./components/LogIn";

function App() {
  return (
      <Router>
          <div className="App">
              <Route path="/" exact component={homePage}/>
              <Route path="/login" exact component={LogIn}/>
          </div>
      </Router>
  );
}

export default App;
