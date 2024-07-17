import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase'; // Make sure the import path is correct
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        navigate('/login'); // Redirect to login if no user is authenticated
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log('User signed out');
      navigate('/login'); // Redirect to login after sign out
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex">
      <aside className="w-64 bg-gray-900 p-4">
        <div className="text-center text-white mb-6">
          <img
            className="w-24 h-24 rounded-full mx-auto"
            src={`https://ui-avatars.com/api/?name=${user?.displayName || user?.email}`}
            alt="User Avatar"
          />
          <h2 className="text-xl mt-4">{user?.displayName || 'Usuario'}</h2>
          <p>{user?.email}</p>
          <span className="inline-block px-2 py-1 mt-2 text-sm bg-green-500 rounded">EN LÍNEA</span>
        </div>
        <nav className="mt-8">
          <ul>
            <li>
              <a href="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">Escritorio</a>
            </li>
            <li>
              <a href="/profile" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">Perfil</a>
            </li>
            <li>
              <a href="/settings" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">Configuraciones</a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-800 p-6 text-white">
        {user ? (
          <div>
            <h1 className="text-2xl mb-4">Perfil del Usuario</h1>
            <div className="bg-gray-900 p-4 rounded-lg shadow-md">
              <p className="mb-4"><strong>Nombre:</strong> {user.displayName || 'No disponible'}</p>
              <p className="mb-4"><strong>Email:</strong> {user.email}</p>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-pink-600 rounded-md hover:bg-pink-700 transition duration-200"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        ) : (
          <p>No hay usuario autenticado</p>
        )}
      </main>
    </div>
  );
};

export default UserProfile;
