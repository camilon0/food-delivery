import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  actionFilterRestaurantesAsync,
  actionGetRestaurantesAsync,
} from "../../redux/actions/restaurantesActions";
import { category } from "../../services/dataLogin";
import "./style.scss";
const FilterButtons = () => {
  const dispatch = useDispatch();
  const onFiltered = (searchValue) => {
    const searchParam = "category";
    dispatch(actionFilterRestaurantesAsync(searchParam, searchValue));
  };
  return (
    <div className="d-flex justify-content-evenly mb-3">
      <Button
        variant="warning"
        onClick={() => {
          dispatch(actionGetRestaurantesAsync());
        }}
      >
        Todas
      </Button>
      {category.map((item) => (
        <Button
          key={item.value}
          variant="warning"
          onClick={() => {
            onFiltered(item.label);
          }}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
};

export default FilterButtons;
