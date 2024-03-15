import { Container, Row, Col, Accordion } from "react-bootstrap";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaBell,
  FaEnvelope,
  FaTelegram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4" style={{ marginTop: "20px" }}>
      <Container>
        <Row>
          <Col xs={12} md={6} lg={3} className="text-center">
            <h2>About Us</h2>
            <a href="/Subscribe">
              <FaBell />
            </a>
            <Accordion style={{ marginTop: "30px" }}>
              <Accordion.Item eventKey="0">
                <Accordion.Header>About</Accordion.Header>
                <Accordion.Body>
                  <p>
                    Bloglist App is a platform for sharing insightful articles
                    and stories related to mechanical engineering and academia.
                    Join our community to stay updated!
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col xs={12} md={6} lg={3} className="text-center">
            <h2>Contact</h2>
            <p>
              <FaEnvelope />: prakashsachin431@gmail.com
            </p>
            <p>
              <FaTelegram />:
              <a
                href="https://t.me/Psachin4955"
                style={{ marginLeft: "20px", textDecoration: "none" }}
              >
                Telegram
              </a>
            </p>
          </Col>
          <Col xs={12} md={6} lg={3} className="text-center">
            <h2>Connect Us</h2>
            <div>
              <a
                href="https://www.facebook.com"
                style={{ marginRight: "50px" }}
              >
                <FaFacebook />
              </a>
              <a
                href="https://x.com/SACHINP05372841"
                style={{ marginRight: "50px" }}
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/p.sachin_4955"
                style={{ marginRight: "50px" }}
              >
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/in/sachin-prakash-24076b289">
                <FaLinkedin />
              </a>
            </div>
          </Col>
          <Col xs={12} md={6} lg={3} className="text-center">
            <h2>Explore</h2>
            <ul className="list-unstyled">
              <li style={{ marginBottom: "10px", textDecoration: "none" }}>
                <a href="/" style={{ textDecoration: "none" }}>
                  Home
                </a>
              </li>
              <li style={{ marginBottom: "10px", textDecoration: "none" }}>
                <a href="/About" style={{ textDecoration: "none" }}>
                  About
                </a>
              </li>
              <li>
                <a href="/Users" style={{ textDecoration: "none" }}>
                  Users
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p>
              &copy; {new Date().getFullYear()} Bloglist App. All rights
              reserved.
            </p>
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
