import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  actionFilterRestaurantesAsync,
  actionGetRestaurantesAsync,
} from "../../redux/actions/restaurantesActions";
import { category } from "../../services/dataLogin";

import deliveryAdress from "./assets/DeliveryAdress.png";

import "./style.scss";
//import stars from "../home/assets/Stars.png";
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { restaurantes } = useSelector((store) => store.restaurantesStore);

  useEffect(() => {
    dispatch(actionGetRestaurantesAsync());
  }, [dispatch]);

  const onFiltered = (searchValue) => {
    const searchParam = "category";
    dispatch(actionFilterRestaurantesAsync(searchParam, searchValue));
  };

  return (
    <>
      <div className="d-flex flex-wrap gap-3 m-3">
        <span>
          <img className="imgDelivery" src={deliveryAdress} alt="deliver" />
        </span>
        <Carousel className="Carousel">
          <Carousel.Item>
            <img
              className="imgCarrusel d-block w-100"
              src="https://www.easypromosapp.com/blog/wp-content/uploads/header_ideas_de_promociones_para_restaurantes.jpg"
              alt="promo"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="imgCarrusel d-block w-100"
              src="https://www.easypromosapp.com/blog/wp-content/uploads/header_ideas_promociones_mes_patrio.jpg"
              alt="promo"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="imgCarrusel d-block w-100"
              src="https://blog.corporacionbi.com/hs-fs/hubfs/Fotos%20Art%C3%ADculos%20-%20Redes/Header-MC%20(2).jpg?width=1364&name=Header-MC%20(2).jpg"
              alt="promo"
            />
          </Carousel.Item>
        </Carousel>

        <div>
          {" "}
          <h3>Restaurants and Caffe</h3>{" "}
        </div>
        <div className="containerButtonCategory">
          <button
            onClick={() => {
              dispatch(actionGetRestaurantesAsync());
            }}
          >
            All
          </button>
          {category.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                onFiltered(item.label);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="cards d-flex flex-wrap justify-content-left gap-3">
          {restaurantes && restaurantes.length ? (
            restaurantes.map((restaurante, index) => (
              <Card
                border="white"
                className="cardBody"
                key={index}
                onClick={() => {
                  navigate(`/restaurante/${restaurante.name}`);
                }}
                style={{ width: "20rem", objectFit: "cover" }}
              >
                <Card.Img
                  className="imgRestaurantes"
                  variant="top"
                  src={restaurante.image}
                  style={{ height: "150px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{restaurante.name}</Card.Title>
                  <Card.Text>
                    Work time:{<br></br>} {restaurante.time} {<br></br>}{" "}
                    ⭐⭐⭐⭐⭐ {<br></br>} Before you 4$
                  </Card.Text>
                </Card.Body>
              </Card>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
