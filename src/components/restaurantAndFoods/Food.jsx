import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Food = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  useEffect(() => {
    getFoodInfo();
  }, []);

  const [infoFood, setInfoFood] = useState();

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

  return (
    <>
      {infoFood ? (
        <>
          <div>
            <Card
              className="d-flex flex-wrap gap-3 m-3"
              style={{ height: "100%", objectFit: "cover" }}
            >
              <Card.Img src={infoFood.image} alt="food" />
              <Card.Body>
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
                  <nav
                    className="price"
                    onClick={() => {
                      navigate(`/orden/${infoFood.name}`);
                    }}
                  >
                    <div>add</div>
                    <span>{cantidadFood * infoFood.price}</span>
                  </nav>
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
