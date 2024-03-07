import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4" style={{ marginTop: "20px" }}>
      <Container>
        <Row>
          <Col className="text-center">
            <h5>Bloglist App</h5>
            <h1>Department of Mechanical Engineering, IIT Bhilai</h1>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()}  Blogging   All rights reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

const Layout = ({ children }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
};

export default Footer;
