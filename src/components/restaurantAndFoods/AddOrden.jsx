import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { actionAddOrdenAsync } from "../../redux/actions/restaurantesActions";

const AddOrden = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    getFoodInfo();
  }, []);

  const [infoFood, setInfoFood] = useState();

  const specific = useSelector((store) => store.foodStore);

  const user = useSelector((store) => store.userStore);

  const getFoodInfo = () => {
    const foodData = specific.food.slice();
    const tempFood = foodData.find((food) => food.name === name);
    setInfoFood(tempFood);
  };

  const [cantidadFood, setCantidadFood] = useState(1);

  const handleClick = (operation) => {
    if (operation === "plus") {
      const incremento = cantidadFood + 1;

      setCantidadFood(incremento);
    } else {
      const decremento = cantidadFood - 1;
      setCantidadFood(decremento);
    }
  };

  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    const addOrder = {
      user: user.email,
      name: infoFood.name,
      id: infoFood.id,
      image: infoFood.image,
      quantity: cantidadFood,
      price: cantidadFood * infoFood.price,
    };
    console.log(addOrder);
    dispatch(actionAddOrdenAsync(addOrder));
    Swal.fire("Se ha realizado la compra", "success");
    navigate("/orden");
  };
  return (
    <>
      {infoFood ? (
        <Card className="new d-flex display-wrap gap-3 m-3">
          <Card.Title className="new__title">New order</Card.Title>
          <Card.Text className="new__ubication">
            <aside className="deliver">DELIVER TO</aside>
            <div>
              <aside>882 Well St, New-York</aside>
            </div>
          </Card.Text>
          <section className="new__payment">
            <span>Payment</span>
            <aside>
              <Button variant="warning" value="Cash" style={{ height: "50px" }}>
                Cash
              </Button>
              <Button
                variant="warning"
                value="MarterCard"
                style={{ height: "50px" }}
              >
                MarterCard
              </Button>
              <Button
                variant="warning"
                value="PayPal"
                style={{ height: "50px" }}
              >
                PayPal
              </Button>
            </aside>
          </section>

          <article className="new__buy">
            <aside className="new__order">
              <Card.Img src={infoFood.image} alt="food" />
              <nav className="counter">
                <button
                  disabled={cantidadFood <= 1}
                  onClick={() => {
                    handleClick("minus");
                  }}
                >
                  -
                </button>
                <span>{cantidadFood}</span>
                <button
                  onClick={() => {
                    handleClick("plus");
                  }}
                >
                  +
                </button>
              </nav>
              <Card.Title>{infoFood.name}</Card.Title>
              <Card.Text>{cantidadFood * infoFood.price}$</Card.Text>
            </aside>
          </article>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Label>Note </Form.Label>
            <input type="text" placeholder="Write something" />

            <aside className="new__quantity">
              <nav>
                <span>Products</span>
                <div>{cantidadFood * infoFood.price}</div>
              </nav>
              <nav>
                <span>Delivery</span>
                <div>0$</div>
              </nav>
              <hr />
              <nav>
                <span>Total</span>
                <div>{cantidadFood * infoFood.price}$</div>
              </nav>
              <Button variant="warning" type="submit">
                Order
              </Button>
            </aside>
          </Form>
        </Card>
      ) : (
        <div>no hay plato seleccionado</div>
      )}
    </>
  );
};

export default AddOrden;
