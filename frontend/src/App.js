import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/user/LoginPage';
import SignipPage from './pages/user/SignipPage';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage/>} />
        <Route path='/signup' element={<SignipPage/>} />
      </Routes>
    </Router>
  );
}

export default App;

