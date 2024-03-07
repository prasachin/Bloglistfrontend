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
  const [profileicon, setprofileicon] = useState(null);

  const navigate = useNavigate();

  const handlefilechange = (event) => {
    const file = event.target.files[0];
    setprofileicon(file);
  };

  const handlesignup = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("name", name);
    formData.append("password", password);
    formData.append("profileicon", profileicon);
    try {
      const newuser = await blogService.signup(formData);
      setMessage(`${name} signed up , Login And Create your blogs!`);
      setTimeout(() => {
        setMessage(null);
        navigate("/loginform");
      }, 4000);
      setName("");
      setUsername("");
      setPassword("");
      setprofileicon(null);
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
      setprofileicon(null);
      console.error("Cant signup ", error.message);
    }
  };

  return (
    <form onSubmit={handlesignup}>
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
      <Form.Group controlId="profileicon">
        <Form.Label>Profile Photo:</Form.Label>
        <Form.Control
          type="file"
          onChange={handlefilechange}
          accept="image/*"
          required
          style={{
            backgroundColor: "black",
            color: "white",
            border: "0px solid #ced4da",
          }}
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
