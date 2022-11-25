import {
  foodTypes,
  ordenTypes,
  restaurantesTypes,
} from "../types/restaurantesTypes";
////////////////////////restaurantes//////////////////
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
    case restaurantesTypes.RESTAURANTES_DELETE:
      return {
        ...state,
        restaurante: state.restaurante.filter(
          (restaurante) => restaurante.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};
//////////////////////////////////food///////////////////
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
    case foodTypes.FOOD_DELETE:
      return {
        ...state,
        food: state.food.filter((food) => food.id !== action.payload.id),
      };
    default:
      return state;
  }
};
//////////////////ordenes/////////////////////
const ordenState = {
  orden: [],
};

export const ordenReducer = (state = ordenState, action) => {
  switch (action.type) {
    case ordenTypes.ORDEN_GET:
      return {
        ...state,
        orden: action.payload.orden,
      };
    default:
      return state;

    case ordenTypes.ORDEN_ADD:
      return {
        ...state,
        orden: [...state.orden, action.payload],
      };
  }
};
