// import { useState } from "react";
// import blogService from "../services/blogs";
// import { Alert } from "react-bootstrap";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link,
//   useNavigate,
// } from "react-router-dom";
// import { Navigate } from "react-router-dom";

// const Blog = ({ blog, user }) => {
//   const [message, setMessage] = useState(null);
//   const [showDetails, setShowDetails] = useState(false);
//   console.log(user);
//   const navigate = useNavigate();



//   const toggledetails = () => {
//     setShowDetails(!showDetails);
//   };

//   return (
//     <div style={blogStyle}>
//       {message && <Alert varient="success">{message}</Alert>}
//       <Link to={`/Blogs/${blog.id}`}>
//         <h2>{blog.title}</h2>
//       </Link>
//     </div>
//   );
// };

// export default Blog;
