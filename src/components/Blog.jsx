import { useState } from "react";
import blogService from "../services/blogs";
import { Alert } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const [message, setMessage] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1.5,
    marginBottom: 8,
  };

  const toggledetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div style={blogStyle}>
      {message && <Alert varient="success">{message}</Alert>}
      <Link to={`/Blogs/${blog.id}`}>
        <h2>{blog.title}</h2>
      </Link>
    </div>
  );
};

export default Blog;
