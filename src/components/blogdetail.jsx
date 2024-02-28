import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import blogService from "../services/blogs";
import { Row, Col, Button, Alert } from "react-bootstrap";
const Blog = (props) => {
  const [blog, setBlog] = useState(null);
  const [message, setMessage] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [Cvisible, setCvisible] = useState(false);
  const [Cfvisible, setCfvisible] = useState(false);
  const [liked, setLiked] = useState(false);
  const location = useLocation();
  const user = location.state && location.state.user;
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const foundBlog = blogs.find((blog) => blog.id === id);
      setBlog(foundBlog);
    });
  }, [id]);

  if (blog === null) {
    return <div>Loading...</div>;
  }

  const handlelike = async () => {
    if (liked) {
      setMessage("You already liked?");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } else {
      try {
        await blogService.update(blog.id);
        blog.likes = blog.likes + 1;
        setLiked(true);
        setMessage(`You Liked The Blog ${blog.title}`);
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      } catch (error) {
        console.error("failed to like the blog ", error.message);
      }
    }
  };

  const handledelete = async () => {
    const confirm = window.confirm(`Are you sure to Delete ${blog.title}!!`);
    if (confirm) {
      if (user.username === blog.user.username) {
        try {
          await blogService.deletee(blog.id);
          setMessage(`${blog.title} Removed from your App`);
          setTimeout(() => {
            setMessage(null);
            navigate("/");
          }, 2000);
        } catch (error) {
          console.error("Cant delete this blog !", error.message);
        }
      } else {
        setMessage("You are Unauthorized to Delete.");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddComment = async () => {
    await blogService.addcomment(blog.id, comment);
    setComments([...comments, { text: comment, user: id }]);
    setComment("");
    setCfvisible(!Cfvisible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1.5,
    marginBottom: 8,
  };

  return (
    <div>
      <Row>
        <Col>{message && <Alert variant="success">{message}</Alert>}</Col>
      </Row>

      <Row>
        <Col>
          <h1 style={blogStyle}>TITLE: {blog.title}</h1>
          <h3 style={blogStyle}>AUTHOR: {blog.author}</h3>
          <h3>
            URL: <a href={blog.url}>{blog.url}</a>
          </h3>
          <h3 >
            LIKES: {blog.likes} <button onClick={handlelike}>Like</button>
          </h3>
        </Col>
      </Row>

      <Row style={blogStyle}>
        <Col>
          <div >
            Click Delete To Remove This Blog
            <button onClick={handledelete}>Delete</button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4
            style={{ cursor: "pointer" }}
            onClick={() => {
              setCvisible(!Cvisible);
            }}
          >
            click to view all comments:
          </h4>
          <ul>
            {Cvisible &&
              blog.comments.map((comment, index) => (
                <li key={index}>{comment.text}</li>
              ))}
          </ul>
        </Col>
      </Row>

      <Row style={blogStyle}>
        <Col>
          {!Cfvisible && (
            <div>
              <Button
                variant="outline-primary"
                onClick={() => {
                  setCfvisible(!Cfvisible);
                }}
              >
                Add Comment
              </Button>{" "}
            </div>
          )}
          {Cfvisible && (
            <div>
              <textarea
                rows="3"
                cols="50"
                placeholder="Type your comment..."
                value={comment}
                onChange={handleCommentChange}
              />
              <Button variant="outline-primary" onClick={handleAddComment}>
                Add
              </Button>{" "}
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Blog;
