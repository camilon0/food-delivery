import { foodTypes, restaurantesTypes } from "../types/restaurantesTypes";

const restaurantesState = {
  restaurantes: [],
};

export const restaurantesReducer = (state = restaurantesState, action) => {
  switch (action.type) {
    case restaurantesTypes.RESTAURANTES_GET:
      return {
        ...state,
        restaurantes: action.payload.restaurantes,
      };
    case restaurantesTypes.RESTAURANT_SINGLE_GET:
      return {
        ...state,
        restaurant: action.payload.restaurant,
      };
    case restaurantesTypes.RESTAURANTES_FILTERED:
      return {
        ...state,
        restaurantes: action.payload.restaurantes,
      };
    case restaurantesTypes.RESTAURANTES_ADD:
      return {
        ...state,
        restaurantes: [...state.restaurantes, action.payload],
      };

    default:
      return state;
  }
};
const foodState = {
  food: [],
};

export const foodReducer = (state = foodState, action) => {
  switch (action.type) {
    case foodTypes.FOOD_GET:
      return {
        ...state,
        food: action.payload.food,
      };
    case foodTypes.FOOD_ADD:
      return {
        ...state,
        food: [...state.food, action.payload],
      };
    case foodTypes.FOOD_FILTERED:
      return {
        ...state,
        food: action.payload.food,
      };

    default:
      return state;
  }
};
