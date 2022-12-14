import React, { useEffect, useState } from "react";
import { Button, Image, Offcanvas } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actionLogoutAsync } from "../../redux/actions/userActions";
import Home from "./assets/Home.png";

import Reload from "./assets/Reload.png";
import Search from "./assets/Search.png";
import User from "./assets/User.png";
const imgStyles = {
  width: "50%",
  height: "auto",
};

const Navigation = ({ isAutentication }) => {
  const user = useSelector((store) => store.userStore);

  const dispatch = useDispatch();
  //const { register, handleSubmit } = useForm();
  //const { photoURL } = useSelector((store) => store.user);
  const onCloseSession = () => {
    dispatch(actionLogoutAsync());
    setShow(false);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  return (
    <>
      <footer>
        <Offcanvas.Body>
          {isAutentication ? (
            <Nav
              fill
              variant="tabs"
              defaultActiveKey="/home"
              className="navFooter gap-3 m-3"
            >
              <Nav.Item>
                <Nav.Link href="/home">
                  <img className="" src={Home} alt="Home" />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/orden">
                  <img className="" src={Reload} alt="Reload" />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/search">
                  <img className="" src={Search} alt="Search" />
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Button variant="light" onClick={handleShow}>
                  <img className="" src={User} alt="User" />
                </Button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>{user.name}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Image
                      roundedCircle
                      src={user.avatar}
                      alt="go"
                      style={imgStyles}
                    />
                    <Button
                      className="m-3"
                      variant="warning"
                      onClick={() => {
                        navigate(`/profile`);
                        setShow(false);
                      }}
                      style={{ height: "60px" }}
                    >
                      Perfil
                    </Button>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="warning" onClick={onCloseSession}>
                      Logout
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Nav.Item>
            </Nav>
          ) : (
            <p></p>
          )}
        </Offcanvas.Body>
      </footer>
    </>
  );
};

export default Navigation;
