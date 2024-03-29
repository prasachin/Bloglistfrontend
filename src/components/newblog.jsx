import {
  Alert,
  Form,
  Button,
  InputGroup,
  Dropdown,
  Spinner,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import blogService from "../services/blogs";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { BsSearch, BsUpload } from "react-icons/bs";
import { useUser } from "./UserContext";
import { FaPowerOff } from "react-icons/fa";

const Blogform = (props) => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState("");
  const [message, setMessage] = useState(null);
  const [formVisible, setformVisible] = useState(false);
  const [blogVisible, setblogVisible] = useState(false);
  const [filter, setFilter] = useState("");
  const [video, setVideo] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [vidvisible, setvidvisible] = useState(null);
  const [allvisible, setallvisible] = useState(null);
  const navigate = useNavigate();
  const { setuser } = useUser();
  const location = useLocation();
  const user = location.state && location.state.user;

  const toggleformVisibility = () => {
    setformVisible(!formVisible);
  };

  const togglevidvisibility = () => {
    setvidvisible(!vidvisible);
  };

  const toggleblogVisibility = () => {
    setblogVisible(!blogVisible);
  };

  const toggleallvisibility = () => {
    setallvisible(!allvisible);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1.5,
    marginBottom: 8,
    cursor: "pointer",
    color: "blue",
  };

  const handlelogout = () => {
    const confirm = window.confirm(`Are you sure to logout ${user.name}!!`);
    if (confirm) {
      window.localStorage.clear();
      setMessage(`'${user.name}' Logged Out  Succesfully !`);
      setTimeout(() => {
        setMessage(null);
        setuser(null);
        navigate("/loginform");
      }, 3000);
    }
  };

  const handleblog = (blog) => {
    navigate(`/Blogs/${blog.id}`, { state: { user } });
  };

  const addNew = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title ? title : "No Title provided");
      formData.append("author", author ? author : "No AuthorName provided");
      formData.append("url", url ? url : "No URL provided");
      formData.append(
        "likes",
        isNaN(parseInt(likes, 10)) ? 0 : parseInt(likes, 10)
      );

      if (video) {
        setUploading(true);
        formData.append("video", video);
      }

      const blogtitle = formData.get("title");
      const createdblog = await blogService.create(formData);

      setBlogs([...blogs, createdblog]);

      setTitle("");
      setAuthor("");
      setUrl("");
      setLikes("");
      setVideo(null);
      setUploading(false);
      setMessage(`New Blog "${blogtitle}" Added!`);
      setTimeout(() => {
        setMessage(null);
        if (!allvisible) {
          setformVisible(!formVisible);
          setvidvisible(!vidvisible);
        } else {
          setallvisible(!allvisible);
        }
      }, 3000);
    } catch (error) {
      console.error("Error in creating the Blog:", error.message);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  blogs.sort((a, b) => a.likes - b.likes);

  return (
    <form onSubmit={addNew}>
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
      <h1>
        {user.name} Logged in !{" "}
        <FaPowerOff
          onClick={handlelogout}
          style={{ color: "red", cursor: "pointer", marginLeft: "38px" }}
        />
      </h1>
      <div style={{ display: formVisible ? "" : "none" }}>
        <Button variant="primary" onClick={toggleformVisibility}>
          Cancel
        </Button>
      </div>
      <div style={{ display: vidvisible ? "" : "none" }}>
        <Button variant="primary" onClick={togglevidvisibility}>
          Cancel
        </Button>
      </div>
      <div style={{ display: allvisible ? "" : "none" }}>
        <Button variant="primary" onClick={toggleallvisibility}>
          Cancel
        </Button>
      </div>
      <br />
      <div
        style={{
          display: formVisible || vidvisible || allvisible ? "none" : "",
        }}
      >
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Add New Blog
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setformVisible(true)}>
              Add Blog Details
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setvidvisible(true)}>
              Upload Videos
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setallvisible(true)}>
              Both
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {formVisible && (
        <div>
          <h2>Fill Your Blog Details !</h2>
          <Form.Group>
            <Form.Label>TITLE:</Form.Label>
            <Form.Control
              type="text"
              value={title}
              name="title"
              placeholder="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>AUTHOR:</Form.Label>
            <Form.Control
              type="text"
              value={author}
              name="author"
              placeholder="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>URL:</Form.Label>
            <Form.Control
              type="text"
              value={url}
              name="url"
              placeholder="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>LIKES:</Form.Label>
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
      {vidvisible && (
        <div>
          <Form.Group controlId="video">
            <Form.Label>Upload Your Videos upto 100Mb !</Form.Label>
            <br />
            <Form.Control
              type="file"
              onChange={(e) => setVideo(e.target.files[0])}
              accept=".mp4 , .mkv"
              style={{
                backgroundColor: "black",
                color: "white",
                border: "0px solid #ced4da",
              }}
            />
          </Form.Group>
          <br />
          {uploading ? (
            <Spinner animation="border" role="status">
              <span className="sr-only"></span>
            </Spinner>
          ) : (
            <Button variant="primary" type="submit">
              <BsUpload />
            </Button>
          )}
        </div>
      )}
      {allvisible && (
        <div>
          <h2>Fill Your Blog Details !</h2>
          <Form.Group>
            <Form.Label>TITLE:</Form.Label>
            <Form.Control
              type="text"
              value={title}
              name="title"
              placeholder="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>AUTHOR:</Form.Label>
            <Form.Control
              type="text"
              value={author}
              name="author"
              placeholder="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>URL:</Form.Label>
            <Form.Control
              type="text"
              value={url}
              name="url"
              placeholder="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>LIKES:</Form.Label>
            <Form.Control
              type="text"
              value={likes}
              name="likes"
              placeholder="Likes"
              onChange={({ target }) => setLikes(target.value)}
            />
          </Form.Group>
          <Form.Group controlId="video">
            <Form.Label>Upload Your Videos upto 100Mb !</Form.Label>
            <br />
            <Form.Control
              type="file"
              onChange={(e) => setVideo(e.target.files[0])}
              accept=".mp4 , .mkv"
              style={{
                backgroundColor: "black",
                color: "white",
                border: "0px solid #ced4da",
              }}
            />
          </Form.Group>
          <br />
          {uploading ? (
            <Spinner animation="border" role="status">
              <span className="sr-only"></span>
            </Spinner>
          ) : (
            <Button variant="primary" type="submit">
              <BsUpload />
            </Button>
          )}
        </div>
      )}
      <br />
      <div style={{ display: blogVisible ? "" : "none" }}>
        <Button variant="primary" onClick={toggleblogVisibility}>
          Hide All
        </Button>
      </div>
      <br />
      <div style={{ display: blogVisible ? "none" : "" }}>
        <Button variant="primary" onClick={toggleblogVisibility}>
          Existing Blogs
        </Button>
      </div>
      {blogVisible && (
        <div>
          <h2>Existing Blogs</h2>
          <Form.Group style={{ marginBottom: "20px" }}>
            <Form.Label>Search Yours</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <BsSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                value={filter}
                onChange={handleFilterChange}
                placeholder="Search By Title"
              />
            </InputGroup>
          </Form.Group>
          {blogs
            .filter((blog) =>
              blog.title.toLowerCase().includes(filter.toLowerCase())
            )
            .map((blog) => (
              <div
                key={blog.id}
                style={blogStyle}
                onClick={() => handleblog(blog)}
              >
                <h2 key={blog.id}>{blog.title}</h2>
              </div>
            ))}
        </div>
      )}
    </form>
  );
};

export default Blogform;
