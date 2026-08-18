import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// Import all your page components
import Home from './pages/Home';
import Generator from './pages/Generator';
import Dashboard from './pages/Dashboard';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Team from './pages/Team';
import Analytics from './pages/Analytics';
import Shopify from './pages/Shopify';

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generator" element={
              isAuthenticated ? <Generator /> : <Navigate to="/login" />
            } />
            <Route path="/dashboard" element={
              isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
            } />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={
              !isAuthenticated ? <Login /> : <Navigate to="/dashboard" />
            } />
            <Route path="/register" element={
              !isAuthenticated ? <Register /> : <Navigate to="/dashboard" />
            } />
            <Route path="/profile" element={
              isAuthenticated ? <Profile /> : <Navigate to="/login" />
            } />
            <Route path="/team" element={
              isAuthenticated ? <Team /> : <Navigate to="/login" />
            } />
            <Route path="/analytics" element={
              isAuthenticated ? <Analytics /> : <Navigate to="/login" />
            } />
            <Route path="/shopify" element={
              isAuthenticated ? <Shopify /> : <Navigate to="/login" />
            } />
          </Routes>
        </main>
        <Footer />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;