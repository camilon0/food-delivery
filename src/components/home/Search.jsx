import React, { useEffect } from "react";
import {
  Button,
  Card,
  Dropdown,
  Form,
  InputGroup,
  SplitButton,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actionFilterAsync } from "../../redux/actions/restaurantesActions";
import search from "./assets/Search.png";

const Search = () => {
  const navigate = useNavigate();

  const { food } = useSelector((store) => store.foodStore);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    dispatch(actionFilterAsync());
  }, [dispatch]);

  const onSearch = (data) => {
    const searchParam = data.search;
    console.log(searchParam);
    dispatch(actionFilterAsync(searchParam));
  };

  const renderFood = ({ target }) => {
    if (target.value.trim() === "") {
      dispatch(actionFilterAsync());
    }
  };
  return (
    <>
      <>
        <form
          className="m-3 "
          style={{ objectFit: "cover" }}
          onSubmit={handleSubmit(onSearch)}
        >
          <button
            className="m-3"
            type="submit"
            variant="outline-secondary"
            id="button-addon2"
            style={{ height: "30px", objectFit: "cover" }}
          >
            <img className="" src={search} alt="Search" />
          </button>
          <input
            type="text"
            placeholder="Search for a dish"
            {...register("search", { required: true })}
            onChange={renderFood}
          />
          <Card className="search__food">
            {food && food.length ? (
              food.map((food, index) => (
                <Card.Body
                  className="bodyCard"
                  key={index}
                  onClick={() => {
                    navigate(`/food/${food.name}`);
                  }}
                >
                  <Card.Img
                    src={food.image}
                    alt="food"
                    style={{
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                  <Card.Title>{food.name}</Card.Title>
                  <br></br>
                  <Card.Text>Precio: {food.price}$</Card.Text>
                </Card.Body>
              ))
            ) : (
              <></>
            )}
          </Card>
        </form>
      </>
    </>
  );
};

export default Search;
