import React from 'react';
import './App.css';
import './grid.css'
import './static/icon/fontawesome/css/all.min.css'

import {BrowserRouter as Router} from "react-router-dom";
import UserProvider from "./components/context/UserProvider";
import DTrecords from "./components/DTrecords";

function App() {

  return (
      <Router>
          <div className="App">
              <UserProvider>
                  <DTrecords/>
              </UserProvider>
          </div>
      </Router>
  );
}

export default App;
