import { restaurantesTypes } from "../types/userTypes";

const initialState = {
  restaurantes: [],
};

export const restaurantesReducer = (state = initialState, action) => {
  switch (action.type) {
    case restaurantesTypes.RESTAURANTES_GET:
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
