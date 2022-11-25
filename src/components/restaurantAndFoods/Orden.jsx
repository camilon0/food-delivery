import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionGetOrdenAsync } from "../../redux/actions/restaurantesActions";

const Orden = () => {
  const dispatch = useDispatch();

  const { orden } = useSelector((store) => store.ordenStore);
  //const user = useSelector((store) => store.userStore);

  useEffect(() => {
    dispatch(actionGetOrdenAsync());
  }, [dispatch]);

  console.log(orden);
  return (
    <div className="">
      <span className="d-flex justify-content-center gap-3 m-3">
        All orders
      </span>
      <Card
        border="light"
        className="cardOrden d-flex gap-3 m-3"
        style={{ objectFit: "cover" }}
      >
        {orden && orden.length ? (
          orden.map((orden, index) => (
            <Card.Body key={index}>
              <div>
                <nav>
                  <Card.Title>{orden.name}</Card.Title>
                  <Card.Text>{orden.price} $</Card.Text>
                </nav>
              </div>
              <span style={{ color: "orange" }}>Delivered</span>
            </Card.Body>
          ))
        ) : (
          <div>no hay ordenes</div>
        )}
      </Card>
    </div>
  );
};

export default Orden;
