import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const About = () => {
  return (
    <Container>
      <h1>About Blog List App</h1>
      <p>
        Welcome to the Blog List App! This app allows users to create and manage
        their blogs. Share your thoughts, experiences, and stories with the
        world.
      </p>

      <h2>Famous Tour</h2>
      <p>
        Explore some of the famous tours featured in our blog community. Here
        are a few highlights:
      </p>

      <Row>
        <Col md={4}>
          <img
            src="assets\images\tour1.jpeg"
            alt="Tour 1"
            className="img-fluid"
          />
          <p>Tour 1: Discover the Beauty</p>
        </Col>
        <Col md={4}>
          <img
            src="assets\images\tour2.jpeg"
            alt="Tour 2"
            className="img-fluid"
          />
          <p>Tour 2: Adventure Awaits</p>
        </Col>
        <Col md={4}>
          <img
            src="assets\images\tour3.jpeg"
            alt="Tour 3"
            className="img-fluid"
          />
          <p>Tour 3: Cultural Delights</p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
