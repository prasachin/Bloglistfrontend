import { Alert, Form, Button } from "react-bootstrap";
import authService from "../services/login";
import { useState } from "react";
import blogService from "../services/blogs";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

const signstyle = {
  fontSize: "16px",
  color: "lightgrey",
  textAlign: "center",
  marginTop: "10px",
};

const Loginform = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);

  const { setuser } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await authService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setMessage(`Welcome ${user.name} , Create your Blogs!!`);
      setTimeout(() => {
        setMessage(null);
        setuser(user);
        navigate("/blogform", { state: { user } });
      }, 3000);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setUsername("");
      setPassword("");
      setMessage("Wrong credentials");
      setTimeout(() => {
        setMessage(null);
      }, 4000);
      console.error("Login failed", error.message);
    }
    console.log("logging in with", username, password);
  };

  return (
    <form onSubmit={handleLogin}>
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
          name="username"
          onChange={({ target }) => setUsername(target.value)}
          placeholder="Username"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          value={password}
          name="password"
          placeholder="Password"
          type="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group>
      <div style={signstyle}>
        Don't have an account?{" "}
        <h4
          onClick={() => {
            navigate("/signupform");
          }}
          style={{ cursor: "pointer", color: "blue" }}
        >
          SignUp For Free
        </h4>
      </div>
      <br />
      <Button variant="primary" type="submit">
        Login
      </Button>
    </form>
  );
};
export default Loginform;
