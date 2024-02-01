import { Alert, Form, Button } from "react-bootstrap";
import authService from "../services/login";
import { useState, useEffect } from "react";
import blogService from "../services/blogs";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Blog from "./Blog";

const Blogform = (props) => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState("");
  const [message, setMessage] = useState(null);
  const [formVisible, setformVisible] = useState(false);
  const [blogVisible, setblogVisible] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state && location.state.user;

  const toggleformVisibility = () => {
    setformVisible(!formVisible);
  };

  const toggleblogVisibility = () => {
    setblogVisible(!blogVisible);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handlelogout = () => {
    const confirm = window.confirm(`Are you sure to logout ${user.name}!!`);
    if (confirm) {
      window.localStorage.clear();
      setMessage(`'${user.name}' Logged Out  Succesfully !`);
      setTimeout(() => {
        setMessage(null);
        navigate("/loginform");
      }, 3000);
    }
  };
  const addNew = async (event) => {
    event.preventDefault();
    try {
      const newObject = {
        title,
        author,
        url,
        likes: parseInt(likes, 10),
      };

      const createdblog = await blogService.create(newObject);

      setBlogs([...blogs, createdblog]);

      setTitle(" ");
      setAuthor(" ");
      setUrl(" ");
      setLikes(" ");
      setMessage(`New Blog ${newObject.title} Added!`);
      setTimeout(() => {
        setMessage(null);
        setformVisible(!formVisible);
      }, 3000);
    } catch (error) {
      console.error("Error in creating the Blog :", error.message);
    }
  };
  blogs.sort((a, b) => a.likes - b.likes);

  return (
    <form onSubmit={addNew}>
      {message && <Alert varient="success">{message}</Alert>}
      <h1>
        {user.name} Logged in !{" "}
        <Button variant="primary" onClick={handlelogout}>
          Logout
        </Button>
      </h1>
      {formVisible && (
        <div>
          <h2>Fill Following Details to add New Blog!!</h2>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              value={title}
              name="title"
              placeholder="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Author:</Form.Label>
            <Form.Control
              type="text"
              value={author}
              name="author"
              placeholder="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Url:</Form.Label>
            <Form.Control
              type="text"
              value={url}
              name="url"
              placeholder="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Likes:</Form.Label>
            <Form.Control
              type="text"
              value={likes}
              name="likes"
              placeholder="Likes"
              onChange={({ target }) => setLikes(target.value)}
            />
          </Form.Group>
          <br />
          <Button variant="primary" type="submit">
            Add
          </Button>
        </div>
      )}
      {blogVisible && (
        <div>
          <h2>Existing blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
      <div style={{ display: blogVisible ? "" : "none" }}>
        <Button variant="primary" onClick={toggleblogVisibility}>
          HideAll
        </Button>
      </div>
      <br />
      <div style={{ display: blogVisible ? "none" : "" }}>
        <Button variant="primary" onClick={toggleblogVisibility}>
          Existing Blogs
        </Button>
      </div>
      <br />
      <div style={{ display: formVisible ? "" : "none" }}>
        <Button variant="primary" onClick={toggleformVisibility}>
          Cancel
        </Button>
      </div>
      <br />
      <div style={{ display: formVisible ? "none" : "" }}>
        <Button variant="primary" onClick={toggleformVisibility}>
          Add Newblog
        </Button>
      </div>
    </form>
  );
};

export default Blogform;