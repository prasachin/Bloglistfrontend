import { Container, Row, Col } from "react-bootstrap";

const Donation = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="mt-5 mb-4">Scan The QR Code to Join This Family!</h1>
          <img
            src="assets\images\qr.jpg"
            alt="QR Code"
            className="img-fluid"
            style={{ paddingTop: "80px", paddingBottom: "0px" }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Donation;
