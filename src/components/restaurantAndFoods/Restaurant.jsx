import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import img from "./assets/Logo.png";
import "./style.scss";
const Restaurant = () => {
  //const navigate = useNavigate();
  const { name } = useParams();
  useEffect(() => {
    getRestauranteInfo();
  }, []);

  const [infoRestaurante, setInfoRestaurante] = useState();

  const restaurantes = useSelector((store) => store.restaurantesStore);

  const getRestauranteInfo = () => {
    const restauranteData = restaurantes.restaurantes.slice();
    const tempRestaurante = restauranteData.find(
      (restaurante) => restaurante.name === name
    );
    setInfoRestaurante(tempRestaurante);
  };

  return (
    <>
      {infoRestaurante ? (
        <>
          <img className="logo d-flex gap-3" src={img} alt="img" />
          <div>
            <Card
              border="light"
              className="d-flex justify-content-left gap-3 m-3"
              style={{ objectFit: "cover" }}
            >
              <Card.Img
                className="imgRest"
                src={infoRestaurante.image}
                style={{ height: "150px", objectFit: "cover" }}
              />
              <Card.Body className="cardBody">
                <Card.Title>{infoRestaurante.name}</Card.Title>
                <Card.Text>
                  {infoRestaurante.description}
                  <div>{infoRestaurante.time}</div>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </>
      ) : (
        <div>hola</div>
      )}
    </>
  );
};

export default Restaurant;
