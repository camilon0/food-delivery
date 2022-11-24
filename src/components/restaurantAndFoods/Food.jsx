import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Food = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  useEffect(() => {
    getFoodInfo();
  }, []);

  const [infoFood, setInfoFood] = useState();
  const user = useSelector((store) => store.userStore);

  const specific = useSelector((store) => store.foodStore);

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
    const newOrden = {
      user: user.email,
      name: infoFood.name,
      id: infoFood.id,
      image: infoFood.image,
      quantity: cantidadFood,
      price: cantidadFood * infoFood.price,
    };
    //dispatch(actionAddOrderAsync(newOrden));
    console.log(newOrden);
  };
  return (
    <>
      {infoFood ? (
        <>
          <div>
            <Card className="cardFoodDetails d-flex flex-wrap gap-3 m-3">
              <Card.Img
                className="imgFoodOrden"
                src={infoFood.image}
                alt="food"
                style={{ height: "150px", objectFit: "cover" }}
              />
              <Card.Body
                className=""
                style={{ height: "290px", objectFit: "cover" }}
              >
                <Card.Title>{infoFood.name}</Card.Title>

                <Card.Text>
                  Additional Ingredients
                  <aside className="details__ingredientes">
                    <div className="details__buttons">
                      <button></button>
                      <div>Tomatoes</div>
                    </div>
                    <div className="details__buttons">
                      <button></button>
                      <div>Grain</div>
                    </div>
                    <div className="details__buttons">
                      <button></button>
                      <div>Lettuce leaf</div>
                    </div>
                  </aside>
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
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="">
                      <span>Note</span>
                      <input></input>
                    </div>
                    <nav
                      className="price"
                      onClick={() => {
                        navigate(`/orden/${infoFood.name}`);
                      }}
                    >
                      <div>add</div>
                      <span>{cantidadFood * infoFood.price}</span>
                    </nav>
                    <button type="submit">Orden</button>
                  </form>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </>
      ) : (
        <div>No hay nada seleccioonado</div>
      )}
    </>
  );
};

export default Food;
