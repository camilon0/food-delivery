import React from "react";
import { Image, OverlayTrigger, Tooltip } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import logo from "./assets/Hamburger.png";

import { actionLogoutAsync } from "../../redux/actions/userActions";

const imgStyles = {
  width: "30px",
  height: "auto",
};
const navLinkStyles = {
  textDecoration: "none",
  color: "black",
  margin: "auto 0",
};
const activeNavLinkStyles = {
  textDecoration: "none",
  color: "black",
  margin: "auto 0",
  fontWeight: "bolder",
};

const NavigationBar = ({ isAutentication }) => {
  const dispatch = useDispatch();
  const { photoURL } = useSelector((store) => store.user);
  const onCloseSession = () => {
    dispatch(actionLogoutAsync());
  };
  return (
    <div>
      <Navbar key={"md"} bg="light" expand={"md"} className="mb-3">
        <Container fluid>
          <Navbar.Brand>
            <img style={imgStyles} src={logo} alt="Restaurante" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"md"}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${"md"}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${"md"}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"md"}`}>
                Restaurantes
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {isAutentication ? (
                <>
                  <Nav className="justify-content-end flex-grow-1 pe-3 gap-3 m-3">
                    <NavLink
                      to="/home"
                      style={({ isActive }) =>
                        isActive ? activeNavLinkStyles : navLinkStyles
                      }
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to="/AddRestaurantes"
                      style={({ isActive }) =>
                        isActive ? activeNavLinkStyles : navLinkStyles
                      }
                    >
                      + Restaurantes
                    </NavLink>
                  </Nav>
                  <Form className="d-flex m-3">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                  </Form>
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="button-tooltip-2">Log out</Tooltip>}
                  >
                    {({ ref, ...triggerHandler }) => (
                      <Button
                        variant="light"
                        {...triggerHandler}
                        className="d-inline-flex align-items-center"
                        onClick={onCloseSession}
                      >
                        <Image
                          ref={ref}
                          roundedCircle
                          src={photoURL}
                          style={imgStyles}
                        />
                      </Button>
                    )}
                  </OverlayTrigger>
                </>
              ) : (
                <Nav className="justify-content-end flex-grow-1 pe-3 gap-3 m-3">
                  <NavLink
                    to="/"
                    style={({ isActive }) =>
                      isActive ? activeNavLinkStyles : navLinkStyles
                    }
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/Register"
                    style={({ isActive }) =>
                      isActive ? activeNavLinkStyles : navLinkStyles
                    }
                  >
                    Registrarse
                  </NavLink>
                </Nav>
              )}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
