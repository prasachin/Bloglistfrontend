import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Subscriber = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  const handleSubscribe = () => {
    setMessage("Thank You for Subscribing and Being a family of this App !");
    setTimeout(() => {
      setMessage(null);
      navigate("/");
    }, 3000);
  };

  const handleDonate = () => {
    navigate("/donation")
    setMessage("Thank You for Your Donation!");
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleSignUp = () => {
    navigate("/signupform");
  };

  return (
    <div>
      {message && <Alert variant="success">{message}</Alert>}
      <div>
        <Button variant="primary" onClick={handleSubscribe}>
          Subscribe
        </Button>
        <p>
          After Signing up you will be able to explore our App i.e You will be
          able to visit the created blogs on our App for Free And it will help
          you to extract numerous of ideas .
        </p>
      </div>
      <br />
      <div>
        <Button variant="success" onClick={handleDonate}>
          Donate
        </Button>
        <p>
          By donating to our blog app, you become an integral part of a thriving
          ecosystem, playing a vital role in shaping the future of our platform
          and influencing the content we create. Your support not only ensures
          the sustainability of our efforts but also actively contributes to the
          enrichment of the entire community experience. We are immensely
          grateful for each contribution, recognizing that it propels us forward
          in our mission to provide valuable and engaging content to our
          readers.
        </p>
      </div>
      <br />
      <div>
        <Button variant="info" onClick={handleSignUp}>
          Sign Up
        </Button>
      </div>
      <br />
    </div>
  );
};

export default Subscriber;
