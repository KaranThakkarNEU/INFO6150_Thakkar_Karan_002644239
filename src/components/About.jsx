import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function About() {
  return (
    <Card className="m-3">
      <Card.Header>Assignment 9</Card.Header>
      <Card.Body>
        <Card.Text>
          Create 4 pages using react components and react-router (Home,
          About-us, Jobs, Contact) as shown in the lab. Make sure to follow
          separate folder structure for every component. 3. Add a card component
          on each page giving detail about each page. (Similar to
          the"complex_component_single.htm" example shown in the class and in
          folder react scripts uploaded in files). Use react map() to create
          dynamic component at least on one of the page. 4. Feel free to use CSS
          and some additional text to make pages pretty. 5. Upload the
          assignment on git. Add Readme and gitignore(add node modules in
          gitignore) and explain the assignment in readme properly. If readme
          and gitignore is missing points will be deducted.
        </Card.Text>
        <Button variant="primary">Learn more</Button>
      </Card.Body>
    </Card>
  );
}

export default About;
