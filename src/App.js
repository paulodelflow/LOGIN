import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login'; // Asegúrate de que la ruta sea correcta
import Register from './components/register'; // Asegúrate de que la ruta sea correcta
import AuthComponent  from './components/auth'; // Asegúrate de que la ruta sea correcta


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthComponent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
