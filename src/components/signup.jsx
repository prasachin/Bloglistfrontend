import { Alert, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useState } from "react";
import blogService from "../services/blogs";

const Signup = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const handlesignup = async (event) => {
    event.preventDefault();
    try {
      const newuser = await blogService.signup(username, name, password);
      setMessage(`${name} signed up , Login And Create your blogs!`);
      setTimeout(() => {
        setMessage(null);
        navigate("/loginform");
      }, 4000);
      setName("");
      setUsername("");
      setPassword("");
    } catch (error) {
      if (!username || !password) {
        setMessage(`Username and Password Required `);
        setTimeout(() => {
          setMessage(null);
        }, 4000);
      }
      setName("");
      setUsername("");
      setPassword("");
      console.error("Cant signup ", error.message);
    }
  };

  return (
    <form onSubmit={handlesignup}>
      {message && <Alert varient="success">{message}</Alert>}
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          placeholder="Username"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Name:</Form.Label>
        <Form.Control
          value={name}
          onChange={({ target }) => setName(target.value)}
          placeholder="Name"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          placeholder="Password"
        />
      </Form.Group>
      <br />
      <Button variant="primary" type="submit">
        SignUp
      </Button>
    </form>
  );
};

export default Signup;
