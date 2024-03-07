import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import blogService from "../services/blogs";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state && location.state.user;
  const [message, setMessage] = useState(null);
  const [editedUser, setEditedUser] = useState({
    name: user.name,
    username: user.username,
    profileIcon: user.profileIcon,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedUser({ ...editedUser, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await blogService.updateuser(
        user.id,
        editedUser.name,
        editedUser.username,
        editedUser.profileIcon
      );
      console.log("User updated successfully");
    } catch (error) {
      console.error("Failed to update user:", error);
      setMessage("Cant update the users right now try Later !");
      setTimeout(() => {
        setMessage(null);
        navigate("/profile");
      }, 3000);
    }
  };

  return (
    <Container>
      {message && (
        <>
          <Alert variant="danger">{message}</Alert>
          <script>
            {window.scrollTo({
              top: 0,
              behavior: "smooth",
            })}
          </script>
        </>
      )}
      <h1>Edit Profile</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={editedUser.username}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="profileicon">
          <Form.Label>Profile Photo:</Form.Label>
          <Form.Control
            type="file"
            onChange={handleChange}
            accept="image/*"
            required
            style={{
              backgroundColor: "black",
              color: "white",
              border: "0px solid #ced4da",
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default Edit;
