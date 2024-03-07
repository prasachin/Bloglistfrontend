import React from "react";
import { Alert, Row, Col, Form, InputGroup } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import blogService from "../services/blogs";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";

export default function EditButton() {
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const [show, setshow] = useState(false);
  const [allblogs, setallBlogs] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`Latitude: ${latitude}, Longitude: ${longitude}`);
      },
      (error) => {
        console.error("Error getting location:", error.message);
      }
    );
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setallBlogs(blogs));
  }, []);

  const handleshow = () => {
    setshow(true);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <UserContext.Consumer>
      {(user) =>
        user.user ? (
          <div className="gradient-custom-2">
            <MDBContainer className="py-5 ">
              <MDBRow className="justify-content-center ">
                <MDBCol lg="8" xl="7">
                  <MDBCard>
                    <div
                      className="rounded-top text-white d-flex align-items-center justify-content-between"
                      style={{
                        "--bs-bg-opacity": "1",
                        backgroundColor:
                          "rgba(33, 37, 41, var(--bs-bg-opacity))",
                        minHeight: "200px",
                        padding: "20px",
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <Row>
                          <Col>
                            <MDBCardImage
                              src={user.user.profileicon}
                              alt="Profile"
                              className="img-thumbnail me-4"
                              style={{ width: "150px" }}
                              fluid
                            />
                            <MDBBtn
                              outline
                              color="light"
                              style={{
                                height: "36px",
                                overflow: "visible",
                                marginRight: "35px",
                                marginTop: "10px",
                              }}
                              onClick={() => {
                                const userdata = {
                                  id: user.user.id,
                                  name: user.user.name,
                                  username: user.user.username,
                                  profileicon: user.user.profileicon,
                                };
                                navigate("/editprofile", {
                                  state: { user: userdata },
                                });
                              }}
                            >
                              Edit
                            </MDBBtn>
                          </Col>
                        </Row>
                        <div>
                          <MDBTypography tag="h5" className="mb-0">
                            <h1>{user.user.name}</h1>
                          </MDBTypography>
                          <MDBCardText className="mb-0">{location}</MDBCardText>
                        </div>
                      </div>
                    </div>
                    <div
                      className="p-4 text-black"
                      style={{ backgroundColor: "darkgray" }}
                    >
                      <div className="d-flex justify-content-end text-center py-1">
                        <div>
                          <MDBCardText className="mb-1 h5">0</MDBCardText>
                          <MDBCardText
                            className="small text-muted mb-0"
                            style={{ color: "white" }}
                          >
                            Photos
                          </MDBCardText>
                        </div>
                        <div className="px-3">
                          <MDBCardText className="mb-1 h5">0</MDBCardText>
                          <MDBCardText
                            className="small text-muted mb-0"
                            style={{ color: "white" }}
                          >
                            Followers
                          </MDBCardText>
                        </div>
                        <div>
                          <MDBCardText className="mb-1 h5">0</MDBCardText>
                          <MDBCardText
                            className="small text-muted mb-0"
                            style={{ color: "black" }}
                          >
                            Following
                          </MDBCardText>
                        </div>
                      </div>
                    </div>
                    <MDBCardBody
                      className="text-black p-4"
                      style={{ backgroundColor: "grey" }}
                    >
                      <div className="mb-5">
                        <p className="lead fw-normal mb-1">About</p>
                        <div
                          className="p-4"
                          style={{
                            "--bs-bg-opacity": "1",
                            backgroundColor:
                              "rgba(33, 37, 41, var(--bs-bg-opacity))",
                            color: "lightgrey",
                          }}
                        >
                          <MDBCardText className="font-italic mb-1">
                            <h1>Personal</h1> Nothing to show.
                          </MDBCardText>
                          <MDBCardText className="font-italic mb-1">
                            <h1>Lives At</h1> {location}
                          </MDBCardText>
                          <MDBCardText className="font-italic mb-0">
                            <h1>Blogger</h1>
                          </MDBCardText>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <MDBCardText className="lead fw-normal mb-0">
                          Recently Uploaded Blogs
                        </MDBCardText>
                        <MDBCardText className="mb-0">
                          <button onClick={handleshow}>show all</button>
                        </MDBCardText>
                      </div>
                      {show && (
                        <div>
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
                          {user.user.blogs
                            .map((id) =>
                              allblogs.find((blog) => blog.id === id)
                            )
                            .filter(
                              (blog) =>
                                blog &&
                                blog.title
                                  .toLowerCase()
                                  .includes(filter.toLowerCase())
                            )
                            .map((blog) => {
                              if (blog) {
                                return (
                                  <div key={blog.id}>
                                    <h2>{blog.title}</h2>
                                    <p>{blog.url}</p>
                                    <p>Likes: {blog.likes}</p>
                                  </div>
                                );
                              } else {
                                return (
                                  <div key={id}>
                                    <p>
                                      No information available for blog with ID:{" "}
                                      {id}
                                    </p>
                                  </div>
                                );
                              }
                            })}
                        </div>
                      )}

                      <MDBRow>
                        <MDBCol className="mb-1">
                          <h2>{user.user.blogs[0]}</h2>
                        </MDBCol>
                        <MDBCol className="mb-1">
                          <MDBCardImage
                            src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                            alt="image 1"
                            className="w-100 rounded-3"
                          />
                        </MDBCol>
                      </MDBRow>
                      <MDBRow className="g-2">
                        <MDBCol className="mb-2">
                          <MDBCardImage
                            src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                            alt="image 1"
                            className="w-100 rounded-3"
                          />
                        </MDBCol>
                        <MDBCol className="mb-2">
                          <MDBCardImage
                            src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                            alt="image 1"
                            className="w-100 rounded-3"
                          />
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </div>
        ) : (
          <div>
            <p>
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
            </p>
            {setMessage("It Seem You are not loggedIn or SignUped , HurryUp!")}
            {setTimeout(() => {
              setMessage(null);
              navigate("/loginform");
            }, 5000)}
          </div>
        )
      }
    </UserContext.Consumer>
  );
}
