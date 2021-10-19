import React from 'react';
import './style/font.css';
import './style/reset.css';
import './App.css';
import './style/grid.css';
import './static/icon/fontawesome/css/all.min.css';

import {BrowserRouter as Router} from "react-router-dom";
import UserProvider from "./components/context/UserProvider";
import CartProvider from "./components/context/CartProvider";
import DTrecords from "./components/DTrecords";

function App() {

  return (
      <Router>
          <div className="App">
              <UserProvider>
                  <CartProvider>
                      <DTrecords/>
                  </CartProvider>
              </UserProvider>
          </div>
      </Router>
  );
}

export default App;
