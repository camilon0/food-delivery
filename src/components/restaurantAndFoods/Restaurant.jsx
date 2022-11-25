import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { actionGetFoodAsync } from "../../redux/actions/restaurantesActions";
import img from "./assets/Logo.png";
import "./style.scss";
const Restaurant = () => {
  const navigate = useNavigate();

  const { name } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    getRestauranteInfo();
  }, []);

  useEffect(() => {
    dispatch(actionGetFoodAsync());
  }, [dispatch]);

  const [infoRestaurante, setInfoRestaurante] = useState();

  const restaurantes = useSelector((store) => store.restaurantesStore);

  const { food } = useSelector((store) => store.foodStore);
  console.log(food);

  const getRestauranteInfo = () => {
    const restauranteData = restaurantes.restaurantes.slice();
    const tempRestaurante = restauranteData.find(
      (restaurante) => restaurante.name === name
    );
    setInfoRestaurante(tempRestaurante);
  };

  const foodFiltered = food.filter((item) => item.id === name);
  return (
    <>
      {infoRestaurante ? (
        <>
          <img className="logo d-flex gap-3" src={img} alt="img" />
          <div>
            <Card
              border="light"
              className="d-flex gap-3 m-3"
              style={{ objectFit: "cover" }}
            >
              <Card.Img
                className="imgRest"
                src={infoRestaurante.image}
                style={{ height: "150px", objectFit: "cover" }}
              />
              <Card.Body className="cardBody gap-1 m-1">
                <Card.Title>{infoRestaurante.name}</Card.Title>
                <Card.Text>
                  {infoRestaurante.description}
                  <div>⭐⭐⭐⭐⭐</div>
                </Card.Text>
              </Card.Body>
            </Card>
            <Card
              border=""
              className="cardFood  d-flex gap-3 m-3"
              style={{ objectFit: "cover" }}
            >
              {foodFiltered.map((plato, index) => (
                <div
                  key={index}
                  className="restaurant__food"
                  onClick={() => {
                    navigate(`/food/${plato.name}`);
                  }}
                >
                  <Card.Img
                    className="imgFood"
                    style={{ height: "150px", objectFit: "cover" }}
                    src={plato.image}
                    alt="food"
                  />
                  <Card.Body className="cardBody">
                    <Card.Title>{plato.name}</Card.Title>
                    <Card.Text>{plato.price} $</Card.Text>
                  </Card.Body>
                </div>
              ))}
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
