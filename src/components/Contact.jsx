import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

function Contact() {
  return (
    <Card className="m-3">
      <Card.Header>Reach out to us</Card.Header>
      <Card.Body>
        <Card.Text>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control type="email" id="email" />
          <Form.Label htmlFor="phoneNumber">Phone Number</Form.Label>
          <Form.Control type="phoneNumber" id="phoneNumber" />
          <Form.Label htmlFor="message">Message</Form.Label>
          <Form.Control type="message" id="message" />
        </Card.Text>
        <Button variant="primary">Contact</Button>
      </Card.Body>
    </Card>
  );
}

export default Contact;
