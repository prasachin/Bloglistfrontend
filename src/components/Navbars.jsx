import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Alert, Navbar, Nav, Button, Image } from "react-bootstrap";
import Loginform from "./loginform";
import Signup from "./signup";
import About from "./About";
import Users from "./usersdetail";
import Home from "./Home";
import Blogform from "./newblog";
import Blog from "./blogdetail";
import Subscriber from "./subscribers";
import Donation from "./Donation";
import { UserProvider, UserContext } from "./UserContext";
import EditButton from "./profile";

const Menubar = (props) => {
  const [message, setMessage] = useState(null);
  const elementstyle = {
    textDecoration: "none",
    margin: "50px",
    padding: "1px",
  };

  return (
    <UserProvider>
      <Router>
        {message && <Alert variant="success">{message}</Alert>}
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
          <UserContext.Consumer>
            {(user) => {
              return (
                <Nav.Item>
                  {user.user ? (
                    <Link
                      to={{ pathname: "/profile", state: { user: user.user } }}
                    >
                      <Image
                        src={user.user.profileicon}
                        alt="Profile"
                        roundedCircle
                        style={{ width: "60px", height: "60px" }}
                      />
                    </Link>
                  ) : (
                    <Link to="/loginform">
                      <Button variant="outline-light">Login</Button>
                    </Link>
                  )}
                </Nav.Item>
              );
            }}
          </UserContext.Consumer>
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
          <Route path="/donation" element={<Donation />} />
          <Route path="/subscribe" element={<Subscriber />} />
          <Route path="/profile" element={<EditButton />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default Menubar;
