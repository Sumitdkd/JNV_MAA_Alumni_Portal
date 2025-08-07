
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AlumniDirectory from './pages/AlumniDirectory';
import Profile from './pages/Profile';
import Groups from './pages/Groups';
import GroupChat from './pages/GroupChat';
import AdminDashboard from './pages/AdminDashboard';
import Feedback from './pages/Feedback';
import AboutDeveloper from './pages/AboutDeveloper';
import Preloader from './components/layout/Preloader';
import { NotificationProvider } from './context/NotificationContext';
import NotificationsPage from './pages/NotificationsPage';
import PostPage from './pages/PostPage';
import ResetPassword from './pages/ResetPassword';
import { Analytics } from "@vercel/analytics/react"
function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    // This logic ensures the preloader is only shown once per session
    const hasLoaded = sessionStorage.getItem('hasLoaded');
    if (hasLoaded) {
      setShowPreloader(false);
    } else {
      const timer = setTimeout(() => {
        setShowPreloader(false);
        sessionStorage.setItem('hasLoaded', 'true');
      }, 3500); // Preloader will show for 3.5 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  // Conditionally render the preloader
  if (showPreloader) {
    return <Preloader />;
  }

  return (
    <AuthProvider>
      <SocketProvider>
        <NotificationProvider>
          <Router>
            <div className="flex flex-col min-h-screen bg-background">
              <Navbar />
              <MainContent />
              <Footer />
            </div>
          </Router>
        </NotificationProvider>
      </SocketProvider>
      <Toaster position="bottom-right" toastOptions={{
        className: 'bg-on-surface text-white rounded-lg shadow-lg',
        duration: 4000,
      }} />
      <Analytics />
    </AuthProvider>
  );
}

// This component remains unchanged
const MainContent = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <main className={`flex-grow ${isLandingPage ? '' : 'container mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8'}`}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/about" element={<AboutDeveloper />} />
        <Route path="/directory" element={<PrivateRoute><AlumniDirectory /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/feedback" element={<PrivateRoute><Feedback /></PrivateRoute>} />
        <Route path="/groups" element={<PrivateRoute><Groups /></PrivateRoute>} />
        <Route path="/groups/:id" element={<PrivateRoute><GroupChat /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute adminOnly={true}><AdminDashboard /></PrivateRoute>} />
        <Route path="/notifications" element={<PrivateRoute><NotificationsPage /></PrivateRoute>} />
        <Route path="/posts/:id" element={<PrivateRoute><PostPage /></PrivateRoute>} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </main>
  )
}

export default App;

