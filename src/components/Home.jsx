import React from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Jobs from "./Jobs";
import Contact from "./Contact";
import About from "./About";

function Home() {
  const scrollToSelector = (selector) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="home">
            Assignment 9
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => scrollToSelector("#home")}>
                Home
              </Nav.Link>
              <Nav.Link onClick={() => scrollToSelector("#jobs")}>
                Jobs
              </Nav.Link>
              <Nav.Link onClick={() => scrollToSelector("#contact")}>
                Contact
              </Nav.Link>
              <Nav.Link onClick={() => scrollToSelector("#about")}>
                About
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <hr />
      <div id="jobs">
        <h2 className="m-3">Jobs</h2>
        <Jobs />
      </div>
      <hr />
      <div id="about">
        <h2 className="m-3">About</h2>
        <About />
      </div>
      <hr />
      <div id="contact">
        <h2 className="m-3">Contact</h2>
        <Contact />
      </div>
    </>
  );
}

export default Home;
