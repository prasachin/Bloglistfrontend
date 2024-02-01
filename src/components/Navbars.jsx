import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Alert, Navbar, Nav } from "react-bootstrap";
import Loginform from "./loginform";
import Signup from "./signup";
import About from "./About";
import Users from "./usersdetail";
import Home from "./Home";
import Blogform from "./newblog";
import Blog from "./user";
import Subscriber from "./subscribers";

const Menubar = (props) => {
  const [message, setMessage] = useState(null);
  const elementstyle = {
    textDecoration: "none",
    margin: "50px",
    padding: "1px",
  };

  return (
    <Router>
      {message && <Alert varient="success">{message}</Alert>}
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link style={elementstyle} to="/">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={elementstyle} to="/About">
                About
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={elementstyle} to="/loginform">
                Login
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={elementstyle} to="/Signupform">
                SignUp
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={elementstyle} to="/Users">
                Users
              </Link>
            </Nav.Link>
          </Nav>
          <Nav.Link href="#" as="span">
            <Link style={elementstyle} to="/subscribe">
              SUBSCRIBE
            </Link>
          </Nav.Link>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route path="/loginform" element={<Loginform />} />
        <Route path="/Signupform" element={<Signup />} />
        <Route path="/About" element={<About />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/" element={<Home />} />
        <Route path="/blogform" element={<Blogform />} />
        <Route path="/Blogs/:id" element={<Blog />} />
        <Route path="/create-blog" element={<Loginform />} />
        <Route path="/subscribe" element={<Subscriber />} />
      </Routes>
    </Router>
  );
};

export default Menubar;