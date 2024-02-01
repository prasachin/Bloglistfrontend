import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import blogService from "../services/blogs";
import { Row, Col, Button, Alert } from "react-bootstrap";
const Blog = () => {
  const [blog, setBlog] = useState(null);
  const [message, setMessage] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [Cvisible, setCvisible] = useState(false);
  const [Cfvisible, setCfvisible] = useState(false);

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
    try {
      await blogService.update(blog.id);
      blog.likes = blog.likes + 1;
      setMessage(`You Liked The Blog ${blog.title}`);
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    } catch (error) {
      console.error("failed to like the blog ", error.message);
    }
  };

  const handledelete = async () => {
    const confirm = window.confirm(`Are you sure to Delete ${blog.title}!!`);
    if (confirm) {
      try {
        await blogService.deletee(blog.id);
        setMessage(`${blog.title} Removed from your App`);
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      } catch (error) {
        console.error("Cant delete this blog !", error.message);
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

  return (
    <div>
      <Row>
        <Col>{message && <Alert variant="success">{message}</Alert>}</Col>
      </Row>

      <Row>
        <Col>
          <h1>Title: {blog.title}</h1>
          <h3>Author: {blog.author}</h3>
          <h3>
            Url: <a href={blog.url}>{blog.url}</a>
          </h3>
          <h3>
            Likes: {blog.likes} <button onClick={handlelike}>Like</button>
          </h3>
        </Col>
      </Row>

      <Row>
        <Col>
          <div>
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

      <Row>
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
