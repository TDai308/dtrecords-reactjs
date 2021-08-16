import React from 'react';
import './App.css';
import './grid.css'
import './static/icon/fontawesome/css/all.min.css'

import {BrowserRouter as Router} from "react-router-dom";
import Header from "./components/Header";
import ContentBody from "./components/ContentBody";

function App() {
  return (
      <Router>
          <div className="App">
              <Header/>
              <ContentBody/>
          </div>
      </Router>
  );
}

export default App;
