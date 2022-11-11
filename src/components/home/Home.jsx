import React, { useEffect } from "react";
import { Badge, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { actionGetRestaurantesAsync } from "../../redux/actions/restaurantesActions";
//import stars from "../home/assets/Stars.png";
const Home = () => {
  const dispatch = useDispatch();
  const { restaurantes } = useSelector((store) => store.restaurantesStore);

  useEffect(() => {
    dispatch(actionGetRestaurantesAsync());
  }, [dispatch]);

  return (
    <>
      <div>
        <h2>DELIVER TO</h2>
        <h2>882 Well St, New-York </h2>
        <span>Restaurants and cafes</span>
      </div>
      <div className="d-flex flex-wrap justify-content-evenly gap-3">
        {restaurantes && restaurantes.length ? (
          restaurantes.map((restaurante, index) => (
            <Card key={index} style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={restaurante.image}
                style={{ height: "150px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{restaurante.name}</Card.Title>
                {/* <Badge bg="warning" text="dark">
                  {`$ ${new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "COP",
                    minimumSignificantDigits: 1,
                  }).format(restaurante.price)}`}
                </Badge> */}
                <Card.Text>
                  Work time:{restaurante.time} {<br></br>} ⭐⭐⭐⭐⭐{" "}
                  {<br></br>} Before you 4$
                </Card.Text>
              </Card.Body>
            </Card>
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Home;
