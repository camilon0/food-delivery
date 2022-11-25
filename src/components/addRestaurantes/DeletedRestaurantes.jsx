import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  actionDeleteRestaurantAsync,
  actionGetRestaurantesAsync,
} from "../../redux/actions/restaurantesActions";
import "./style.scss";

const DeletedRestaurantes = () => {
  const navigate = useNavigate();
  const { restaurantes } = useSelector((store) => store.restaurantesStore);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionGetRestaurantesAsync());
  }, [dispatch]);

  return (
    <div className="cards d-flex flex-wrap justify-content-left gap-3">
      {restaurantes && restaurantes.length ? (
        restaurantes.map((restaurante, index) => (
          <Card
            border="white"
            className="cardBody"
            key={index}
            style={{ width: "20rem", height: "300px", objectFit: "cover" }}
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
                Work time:{<br></br>} {restaurante.time} {<br></br>} ⭐⭐⭐⭐⭐{" "}
                {<br></br>} Before you 4$
              </Card.Text>

              <Button
                size="sm"
                variant="danger"
                onClick={() => {
                  dispatch(actionDeleteRestaurantAsync(restaurante));
                  Swal.fire("Se ha eliminado con exito", "success");
                  navigate("/home");
                }}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <div>hola</div>
      )}
    </div>
  );
};

export default DeletedRestaurantes;
