import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Make sure the path is correct
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire('Success', 'You are now logged in!', 'success');
    } catch (error) {
      setError(error.message);
      Swal.fire('Error', error.message, 'error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white">Sign In</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              className="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border rounded-md focus:ring-pink-500 focus:border-pink-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="relative">
            <input
              type="password"
              className="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border rounded-md focus:ring-pink-500 focus:border-pink-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-pink-600 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            Sign In
          </button>
        </form>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        <p className="text-center text-gray-400">
          No tienes cuenta? <Link to="/register" className="text-pink-500">Sign up now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
