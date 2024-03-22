import React from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "./UserContext";

const About = () => {
  const { user } = useUser();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const handleimg1 = () => {
    if (!user) {
      setMessage("New to the App? Signup to view!");
      setTimeout(() => {
        setMessage(null);
        navigate("/signupform");
      }, 3000);
    } else {
      navigate("/Blogs/65a105c3e4147f5484b38460");
    }
  };

  const handleimg2 = () => {
    if (!user) {
      setMessage("New to the App? Signup to view!");
      setTimeout(() => {
        setMessage(null);
        navigate("/signupform");
      }, 3000);
    } else {
      navigate("/Blogs/658fac92b1e1dd92836ebce3");
    }
  };

  const handleimg3 = () => {
    if (!user) {
      setMessage("New to the App? Signup to view!");
      setTimeout(() => {
        setMessage(null);
        navigate("/signupform");
      }, 3000);
    } else {
      navigate("/Blogs/659d2cc082f1b4433c92bd23");
    }
  };

  return (
    <Container>
      {message && (
        <>
          <Alert variant="warning">{message}</Alert>
          <script>
            {window.scrollTo({
              top: 0,
              behavior: "smooth",
            })}
          </script>
        </>
      )}
      <Row className="my-5">
        <Col className="bg-dark bg-opacity-60 text-light">
          <h1 className="fw-bold">About Blog List App</h1>
          <p>
            Welcome to the Blog List App! This app allows users to create and
            manage their blogs. Share your thoughts, experiences, and stories
            with the world.
          </p>
        </Col>
      </Row>
      <Row className="my-5">
        <Col className="bg-dark bg-opacity-60 text-light">
          <h1 className="fw-bold">Famous Blogs</h1>
          <p>
            Explore some of the famous Blogs featured in our blog community.
            Here are a few highlights:
          </p>
          <h5>Click below to View!</h5>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <img
            src="assets\images\tour1.jpeg"
            alt="Tour 1"
            className="img-fluid"
            onClick={handleimg1}
            style={{ cursor: "pointer" }}
          />
          <p>Tour 1:A Day With sammy</p>
        </Col>
        <Col md={4}>
          <img
            src="assets\images\tour2.webp"
            alt="Tour 2"
            className="img-fluid"
            onClick={handleimg2}
            style={{ cursor: "pointer" }}
          />
          <p>Tour 2: Bihar's Politics</p>
        </Col>
        <Col md={4}>
          <img
            src="assets\images\tour3.png"
            alt="Tour 3"
            className="img-fluid"
            onClick={handleimg3}
            style={{ cursor: "pointer" }}
          />
          <p>Tour 3:Campus tour IIT BH</p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
