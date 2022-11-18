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
    case restaurantesTypes.RESTAURANTES_FILTERED:
      return {
        ...state,
        restaurantes: action.payload.restaurantes,
      };
    default:
      return state;
  }
};
