import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import 'font-awesome/css/font-awesome.min.css';
import { notifySuccess } from '../notification/Notification';
import { useUser } from '../../context/authContaxt';
import axios from 'axios';

const LeftSidebarNavbar = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
  const [isLogin, setIsLogin] = useState(false);
  const { userId, loginStatus, updateUser, usertype, usertypeInstru, logout2 } = useUser();
  const navigate = useNavigate();

  // Sync `isLogin` state with `sessionStorage`
  useEffect(() => {
    const isUserLoggedIn = sessionStorage.getItem('LoginStatus') === 'true';
    console.log("statusinnav", isUserLoggedIn);
    setIsLogin(isUserLoggedIn);
  }, [loginStatus]);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/login');
  };

  const handleLogout = async () => {
    // Clear session storage and reset state
    const userid = localStorage.getItem('Userid');
    try {
      const logout = await axios.post(`${API_URL}/api/auth/logout/${userid}`);
      if (logout) {
        sessionStorage.removeItem('isLogin');
        sessionStorage.removeItem('userType');
        sessionStorage.removeItem('LoginStatus');
        sessionStorage.removeItem('UsertypeStudent');
        sessionStorage.removeItem('UsertypeInstru');
        localStorage.removeItem('Userid');

        logout2();
        
        notifySuccess("Logged out successfully!");
        updateUser(null, 'false');
        navigate("/");
      }
    } catch (error) {
      console.error("Logout Error:", error);
      // Still clear local storage and session even if API call fails
      sessionStorage.removeItem('isLogin');
      sessionStorage.removeItem('userType');
      sessionStorage.removeItem('LoginStatus');
      sessionStorage.removeItem('UsertypeStudent');
      sessionStorage.removeItem('UsertypeInstru');
      localStorage.removeItem('Userid');
      
      logout2();
      notifySuccess("Logged out successfully!");
      updateUser(null, 'false');
      navigate("/");
    }
  };
  
  return (
    <Navbar fixed="top" bg="dark" expand="lg" className="left-navbar">
      <Container fluid>
        {/* Logo */}
        <Navbar.Brand href="#" className="navbar-logo">
          <img src="/logo.jpg" alt="Course Selling" className="logo" />
        </Navbar.Brand>

        {/* Navbar links */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/" className="nav-link">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/courses" className="nav-link">
              Courses
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-link">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="nav-link">
              Contact
            </Nav.Link>
      
            {/* Conditional Rendering: Show LoginStatus or Auth Buttons */}
            {isLogin ? (
              <Button
                variant="primary"
                className="auth-btn d-flex align-items-center logout"
                onClick={handleLogout}
              >
                <i className="fas fa-user-circle" style={{ fontSize: '18px' }}></i>
                Logout
              </Button>
            ) : (
              <>
                <Button
                  variant="primary"
                  className="auth-btn"
                  onClick={handleLogin}
                >
                  Login
                </Button>
                <Button
                  variant="secondary"
                  className="auth-btn"
                  onClick={handleRegister}
                >
                  Register
                </Button>
              </>
            )}

            {/* Chatbot Icon for Help */}
            <Button variant="success" className="chatbot-btn">
              <i className="fas fa-comment-dots"></i> Help
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default LeftSidebarNavbar;
