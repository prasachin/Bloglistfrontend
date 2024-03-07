import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Alert, Navbar, Nav, Button, Image, Dropdown } from "react-bootstrap";
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
import Edit from "./editprofile";

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
        {message && (
          <>
            <Alert variant="success">{message}</Alert>
            <script>
              {window.scrollTo({
                top: 0,
                behavior: "smooth",
              })}
            </script>
          </>
        )}
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 999 }}
        >
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
                <Nav.Item style={{ paddingRight: "15px" }}>
                  {user.user ? (
                    <Link
                      to={{ pathname: "/profile", state: { user: user.user } }}
                    >
                      <Image
                        src={user.user.profileicon}
                        alt="Profile"
                        roundedCircle
                        style={{ width: "50px", height: "50px" }}
                      />
                    </Link>
                  ) : (
                    <Dropdown style={{ paddingRight: "25px" }}>
                      <Dropdown.Toggle
                        variant="light"
                        id="dropdown-basic"
                        style={{
                          borderRadius: "50%",
                          padding: 0,
                          border: "none",
                          width: "50px",
                          height: "50px",
                        }}
                      >
                        <Image
                          src="https://res.cloudinary.com/dbduadsbd/image/upload/v1709375511/ohionixpgqmfzsxnpftt.png"
                          alt="Profile"
                          roundedCircle
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="/loginform">Login</Dropdown.Item>
                        <Dropdown.Item href="/signupform">
                          Sign Up
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
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
          <Route path="/editprofile" element={<Edit />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default Menubar;
