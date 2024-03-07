import React, { useState } from "react";
import { Button, Alert, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Subscriber = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  const handleSubscribe = () => {
    setMessage("Thank You for Subscribing and Being a part of our community!");
    setTimeout(() => {
      setMessage(null);
      navigate("/");
    }, 3000);
  };

  const handleDonate = () => {
    navigate("/donation");
    setMessage("Thank You for Your Donation!");
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleSignUp = () => {
    navigate("/signupform");
  };

  return (
    <Container>
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
      <Row className="my-5">
        <Col className="bg-dark bg-opacity-60 text-light">
          <Button
            variant="primary"
            onClick={handleSubscribe}
            style={{ marginTop: "15px" }}
          >
            Subscribe
          </Button>
          <p>
            After Subscribing , You will get the latest update about the blog
            uploaded on this platform.
          </p>
        </Col>
      </Row>

      <Row className="my-5">
        <Col className="bg-dark bg-opacity-60 text-light">
          <Button
            variant="success"
            onClick={handleDonate}
            style={{ marginTop: "15px" }}
          >
            Donate
          </Button>
          <p>
            By donating to our blog app, you become an integral part of our
            thriving ecosystem, shaping the future of our platform and
            influencing the content we create.
          </p>
        </Col>
      </Row>
      <Row className="my-5">
        <Col className="bg-dark bg-opacity-60 text-light">
          <Button
            variant="info"
            onClick={handleSignUp}
            style={{ marginTop: "15px" }}
          >
            Sign Up
          </Button>
          <p>
            After signing up, you will be able to explore our app and visit
            created blogs for free, extracting numerous ideas.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Subscriber;
