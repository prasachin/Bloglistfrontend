import { useState, useEffect } from "react";
import Footer from "./components/footer";
import blogService from "./services/blogs";
import Menubar from "./components/Navbars";
import { Alert } from "react-bootstrap";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
    setMessage("Welcome To Your Blog App");
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  return (
    <div>
      <h2 style={{ fontWeight: "bold", marginTop: "75px" }}>Welcome Back </h2>
      {message && <Alert varient="success">{message}</Alert>}
      <Menubar />
      <Footer />
    </div>
  );
};

export default App;
