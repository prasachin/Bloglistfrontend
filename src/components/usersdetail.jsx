import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import blogService from "../services/blogs";

const Users = () => {
  const defaulticon =
    "https://res.cloudinary.com/dbduadsbd/image/upload/v1709375511/ohionixpgqmfzsxnpftt.png";
  const [users, setUsers] = useState([]);

  useEffect(() => {
    blogService.getallusers().then((users) => setUsers(users));
  }, []);

  if (users.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h1 className="mt-5 mb-4">Users of this App</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {users.map((user) => (
          <Col key={user.id}>
            <Card className="bg-dark bg-opacity-80 text-light">
              <Card.Body>
                <div className="profile-icon">
                  <img
                    src={user.profileicon || defaulticon}
                    alt="Profile Icon"
                    width={50}
                    height={50}
                    className="rounded-circle"
                  />
                </div>
                <Card.Title>{user.name}</Card.Title>
                <Card.Text>
                  {user.blogs.length}{" "}
                  {user.blogs.length === 1 ? "blog" : "blogs"} created
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Users;
