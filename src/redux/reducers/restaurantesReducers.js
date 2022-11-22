import { restaurantesTypes } from "../types/restaurantesTypes";

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
