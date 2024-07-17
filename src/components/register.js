import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase'; // Make sure the paths are correct
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [rut, setRut] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      Swal.fire('Error', 'Passwords do not match', 'error');
      return;
    }
    if (age < 0 || age > 99) {
      setError('Invalid age');
      Swal.fire('Error', 'Invalid age', 'error');
      return;
    }
    const rutRegex = /^\d{7,8}-\d{1}$/;
    if (!rutRegex.test(rut)) {
      setError('Invalid RUT format');
      Swal.fire('Error', 'Invalid RUT format', 'error');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      await sendEmailVerification(userCredential.user);
      Swal.fire('Success', `Verification email sent to ${email}`, 'success');
      navigate('/verify-email', { state: { name } });
    } catch (error) {
      setError(error.message);
      Swal.fire('Error', error.message, 'error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white">Sign Up</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              className="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border rounded-md focus:ring-pink-500 focus:border-pink-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
          </div>
          <div className="relative">
            <input
              type="number"
              className="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border rounded-md focus:ring-pink-500 focus:border-pink-500"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
              required
            />
          </div>
          <div className="relative">
            <input
              type="text"
              className="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border rounded-md focus:ring-pink-500 focus:border-pink-500"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              placeholder="RUT (e.g., 12345678-9)"
              required
            />
          </div>
          <div className="relative">
            <select
              className="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border rounded-md focus:ring-pink-500 focus:border-pink-500"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="relative">
            <input
              type="text"
              className="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border rounded-md focus:ring-pink-500 focus:border-pink-500"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              required
            />
          </div>
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
          <div className="relative">
            <input
              type="password"
              className="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border rounded-md focus:ring-pink-500 focus:border-pink-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-pink-600 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            Crear cuenta
          </button>
        </form>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        <p className="text-center text-gray-400">
          Tienes cuenta? <Link to="/login" className="text-pink-500">Ingrese</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
