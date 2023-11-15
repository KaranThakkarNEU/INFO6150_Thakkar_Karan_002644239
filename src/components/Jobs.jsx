import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { jobsData } from "../data/jobs";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Jobs() {
  return (
    <Row xs={1} md={2} className="g-4">
      {" "}
      {jobsData.map((job) => {
        return (
          <Col key={job.id}>
            <Card className="m-3">
              <Card.Header>{job.company}</Card.Header>
              <Card.Body>
                <Card.Title>{job.jobName}</Card.Title>
                <Card.Text>{job.description}</Card.Text>
                <Card.Text>Location:{job.location}</Card.Text>
                <Card.Text>{job.payScale}</Card.Text>
                <Button variant="primary">Apply</Button>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

export default Jobs;
