import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavBar from './navBar/NavBar';
import Login from './components/login';
import Register from './components/register';
import Home from './components/Home';
import Apod from './components/Apod';
import Rover from './components/Rover';
import { auth } from './components/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const App = () => {
  const [user, loading, error] = useAuthState(auth);
  const [authenticated, setAuthenticated] = useState(false);

  //console.log(user)

  useEffect(() => {
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [user]);

  async function handleLogout() {
    try {
      await auth.signOut();
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Router>
      <div className="App">
        <NavBar handleLogout={handleLogout} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {authenticated ? (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/apod" element={<Apod />} />
              <Route path="/rover" element={<Rover />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
