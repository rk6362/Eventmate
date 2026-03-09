import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppContext } from './context/AppContext';
import { AppProvider } from './context/AppProvider';

// Import Pages
import InterestSelection from './pages/InterestSelection';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import Search from './pages/Search';
import Saved from './pages/Saved';
import Profile from './pages/Profile';
import EventDetails from './pages/EventDetails';

// Simple Auth Guard Component
const PrivateRoute = ({ children }) => {
  const { user } = React.useContext(AppContext);
  return user.isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app-container">
          <Routes>
            {/* Public Onboarding Flow */}
            <Route path="/" element={<InterestSelection />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
            <Route path="/saved" element={<PrivateRoute><Saved /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/event/:id" element={<PrivateRoute><EventDetails /></PrivateRoute>} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
