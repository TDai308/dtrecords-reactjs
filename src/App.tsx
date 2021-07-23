import React from 'react';
import './App.css';
import './grid.css'
import './static/icon/fontawesome/css/all.min.css'

import {BrowserRouter as Router} from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
      <Router>
          <div className="App">
              <Header/>
          </div>
      </Router>
  );
}

export default App;
