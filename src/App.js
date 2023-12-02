// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes , Link } from 'react-router-dom';
import Home from './components/Home'
import Transaction from './components/Transaction';
import Data from './components/Data';
import './App.css'

function App() {
  return (
    <Router>
      <nav className="navbar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/transaction">Transaction</Link></li>
            <li><Link to="/data">Data</Link></li>
          </ul>
        </nav>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/transaction" element={<Transaction/>} />
        <Route path="/data" element={<Data/>} />
      </Routes>
    </Router>
  );
}

export default App;
