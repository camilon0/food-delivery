import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  actionDeleteFoodAsync,
  actionGetFoodAsync,
} from "../../redux/actions/restaurantesActions";

const DeletedFoods = () => {
  const navigate = useNavigate();
  const { food } = useSelector((store) => store.foodStore);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionGetFoodAsync());
  }, [dispatch]);
  return (
    <div className="cards d-flex flex-wrap justify-content-left gap-3">
      {food && food.length ? (
        food.map((food, index) => (
          <Card
            border="white"
            className="cardBody"
            key={index}
            style={{ width: "20rem", height: "300px", objectFit: "cover" }}
          >
            <Card.Img
              className="imgRestaurantes"
              variant="top"
              src={food.image}
              style={{ height: "150px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title>{food.name}</Card.Title>
              <Card.Text>
                Work time:{<br></br>} {food.time} {<br></br>} ⭐⭐⭐⭐⭐{" "}
                {<br></br>} Before you 4$
              </Card.Text>

              <Button
                size="sm"
                variant="danger"
                onClick={() => {
                  dispatch(actionDeleteFoodAsync(food));
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

export default DeletedFoods;
