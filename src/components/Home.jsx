import React from "react";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handlenew = () => {
    setMessage("New user..?? loggin or Signup to add Blogs !");
    setTimeout(() => {
      setMessage(null);
      navigate("/create-blog");
    }, 4000);
  };
  return (
    <div>
      <h1 style={{ fontWeight: "bold" }}>Welcome to Our Blog Platform!</h1>
      <p>
        Discover a world of captivating stories, insightful articles, and
        thought-provoking content curated just for you. Our blog community is a
        diverse space where writers from around the globe share their
        experiences, expertise, and passions.
      </p>
      <h2 style={{ fontWeight: "bold" }}>Explore Our Featured Blogs</h2>
      <p>
        Dive into a variety of topics that span from technology and science to
        lifestyle and travel. Our carefully curated selection of featured blogs
        ensures that you get a taste of the best content from our talented
        contributors.
      </p>
      <h2 style={{ fontWeight: "bold" }}>
        Connect with Like-minded Readers and Writers
      </h2>
      <p>
        Join our vibrant community of readers and writers. Engage in
        conversations, share your thoughts in the comments, and connect with
        fellow enthusiasts. Whether you're a seasoned writer or just love
        exploring new ideas, there's a place for you here.
      </p>
      <h2 style={{ fontWeight: "bold" }}>Create Your Own Blog</h2>
      <p>
        Ready to share your stories with the world? Start your own blog on our
        platform. It's easy to get started, and you'll have the opportunity to
        reach a global audience with your unique perspective. Let your voice be
        heard!
      </p>
      {message && <Alert variant="warning">{message}</Alert>}
      <button onClick={handlenew}>CreateBlog</button>
      <h2 style={{ fontWeight: "bold" }}>Stay Updated</h2>
      <p>
        Never miss out on the latest content. Subscribe to our newsletter and
        receive regular updates on new blog posts, community events, and
        exclusive offers. Stay connected and be a part of the blogging
        revolution!
      </p>
      <Link to="/subscribe">
        <button>Subscribe Now</button>
      </Link>
    </div>
  );
};

export default Home;
