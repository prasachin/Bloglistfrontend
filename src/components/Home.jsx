import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Alert,
  Container,
  Row,
  Col,
  Card,
  Button,
  Accordion,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handlenew = () => {
    setMessage("New user..?? loggin or Signup to add Blogs !");
    setTimeout(() => {
      setMessage(null);
      navigate("/create-blog");
    }, 4000);
  };

  const tempstyle = {
    "--bs-bg-opacity": "1",
    backgroundColor: "rgba(33, 37, 41, var(--bs-bg-opacity))",
    color: "white",
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
          <h1 className="fw-bold">Welcome to Our Blog Platform!</h1>
          <p>
            Discover a world of captivating stories, insightful articles, and
            thought-provoking content curated just for you. Our blog community
            is a diverse space where writers from around the globe share their
            experiences, expertise, and passions.
          </p>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col xs={12} md={6} lg={4}>
          <Card
            className="bg-dark bg-opacity-80 text-light"
            style={{ marginTop: "15px" }}
          >
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Explore Our Featured Blogs</Accordion.Header>
                <Accordion.Body style={tempstyle}>
                  <p>
                    Dive into a variety of topics that span from technology and
                    science to lifestyle and travel. Our carefully curated
                    selection of featured blogs ensures that you get a taste of
                    the best content from our talented contributors.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Card
            className="bg-dark bg-opacity-80 text-light"
            style={{ marginTop: "15px" }}
          >
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Connect with Like-minded</Accordion.Header>
                <Accordion.Body style={tempstyle}>
                  <p>
                    Join our vibrant community of readers and writers. Engage in
                    conversations, share your thoughts in the comments, and
                    connect with fellow enthusiasts. Whether you're a seasoned
                    writer or just love exploring new ideas, there's a place for
                    you here.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Card
            className="bg-dark bg-opacity-80 text-light"
            style={{ marginTop: "15px" }}
          >
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Create Your Own Blog</Accordion.Header>
                <Accordion.Body style={tempstyle}>
                  <p>
                    Ready to share your stories with the world? Start your own
                    blog on our platform. It's easy to get started, and you'll
                    have the opportunity to reach a global audience with your
                    unique perspective. Let your voice be heard!
                  </p>
                  <Button onClick={handlenew} variant="primary">
                    Create Blog
                  </Button>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Card
            className="bg-dark bg-opacity-80 text-light"
            style={{ marginTop: "15px" }}
          >
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Stay Updated</Accordion.Header>
                <Accordion.Body style={tempstyle}>
                  <p>
                    Never miss out on the latest content. Subscribe to our
                    newsletter and receive regular updates on new blog posts,
                    community events, and exclusive offers. Stay connected and
                    be a part of the blogging revolution!
                  </p>
                  <Link to="/subscribe">
                    <Button variant="secondary">Subscribe Now</Button>
                  </Link>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
