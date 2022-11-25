import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { dataBase } from "../../Firebase/firebaseConfig";
import {
  foodTypes,
  ordenTypes,
  restaurantesTypes,
} from "../types/restaurantesTypes";

const collectionName = "restaurantes";
const collectionFood = "food";

export const actionGetRestaurantesAsync = () => {
  return async (dispatch) => {
    const restaurantesCollection = collection(dataBase, collectionName);
    const querySnapshot = await getDocs(restaurantesCollection);
    const restaurantes = [];
    try {
      querySnapshot.forEach((doc) => {
        restaurantes.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(actionGetRestaurantesSync(restaurantes));
    }
  };
};

const actionGetRestaurantesSync = (restaurantes) => {
  return {
    type: restaurantesTypes.RESTAURANTES_GET,
    payload: {
      restaurantes: restaurantes,
    },
  };
};

export const actionAddRestauranteAsync = (restaurante) => {
  return async (dispatch) => {
    try {
      const restaurantesCollection = collection(dataBase, collectionName);
      const docs = await addDoc(restaurantesCollection, restaurante);
      dispatch(actionAddRestauranteSync({ id: docs.id, ...restaurante }));
    } catch (error) {
      console.log(error);
      dispatch(actionAddRestauranteSync({}));
    }
  };
};

const actionAddRestauranteSync = (restaurante) => {
  return {
    type: restaurantesTypes.RESTAURANTES_ADD,
    payload: restaurante,
  };
};
export const actionFilterRestaurantesAsync = (searchParam, searchValue) => {
  return async (dispatch) => {
    const restaurantesCollection = collection(dataBase, collectionName);
    const q = query(
      restaurantesCollection,
      where(searchParam, "==", searchValue)
    );
    const restaurantes = [];
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        restaurantes.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(actionFilterRestaurantesSync(restaurantes));
    }
  };
};

const actionFilterRestaurantesSync = (restaurantes) => {
  return {
    type: restaurantesTypes.RESTAURANTES_FILTERED,
    payload: {
      restaurantes: restaurantes,
    },
  };
};
///////////////////////////////FOOD //////////////////////////
export const actionGetFoodAsync = () => {
  return async (dispatch) => {
    const foodCollection = collection(dataBase, collectionFood);
    const querySnapshot = await getDocs(foodCollection);
    const food = [];
    try {
      querySnapshot.forEach((doc) => {
        food.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(actionGetFoodSync(food));
    }
  };
};
const actionGetFoodSync = (food) => {
  return {
    type: foodTypes.FOOD_GET,
    payload: {
      food: food,
    },
  };
};

export const actionFilterAsync = (searchParam) => {
  return async (dispatch) => {
    const foodCollection = collection(dataBase, collectionFood);
    const querySnapshot = await getDocs(foodCollection);
    const food = [];
    try {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        food.push({
          id: doc.id,
          ...doc.data(),
        });
        //   console.log(doc.id, " => ", doc.data());
      });

      const filterdFood = food.filter((item) =>
        item.name.toLowerCase().includes(searchParam.toLowerCase())
      );
      dispatch(actionFilterFoodSync(filterdFood));
    } catch (error) {
      console.error(error);
      dispatch(actionFilterFoodSync([]));
    }
  };
};

const actionFilterFoodSync = (food) => {
  return {
    type: foodTypes.FOOD_FILTERED,
    payload: {
      food: food,
    },
  };
};
export const actionAddFoodAsync = (food) => {
  return async (dispatch) => {
    try {
      const foodsCollection = collection(dataBase, collectionFood);
      const docs = await addDoc(foodsCollection, food);
      dispatch(actionAddFoodSync({ id: docs.id, ...food }));
    } catch (error) {
      console.log(error);
      dispatch(actionAddFoodSync({}));
    }
  };
};

const actionAddFoodSync = (food) => {
  return {
    type: foodTypes.FOOD_ADD,
    payload: food,
  };
};
export const actionFilterFoodsAsync = (searchParam, searchValue) => {
  return async (dispatch) => {
    const foodsCollection = collection(dataBase, collectionFood);
    const q = query(foodsCollection, where(searchParam, "==", searchValue));
    const foods = [];
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        foods.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(actionFilterFoodSync(foods));
    }
  };
};
/////////////////////////////////////ORDEN////////////////////////
const collectionOrden = "orden";

export const actionGetOrdenAsync = () => {
  return async (dispatch) => {
    const ordenCollection = collection(dataBase, collectionOrden);
    const querySnapshot = await getDocs(ordenCollection);
    const orden = [];
    try {
      querySnapshot.forEach((doc) => {
        orden.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(actionGetOrdenSync(orden));
    }
  };
};

const actionGetOrdenSync = (orden) => {
  return {
    type: ordenTypes.ORDEN_GET,
    payload: {
      orden: orden,
    },
  };
};

export const actionAddOrdenAsync = (orden) => {
  return async (dispatch) => {
    try {
      const ordenCollection = collection(dataBase, collectionOrden);
      const docs = await addDoc(ordenCollection, orden);
      dispatch(actionAddOrdenSync({ id: docs.id, ...orden }));
    } catch (error) {
      console.log(error);
      dispatch(actionAddOrdenSync({}));
    }
  };
};

const actionAddOrdenSync = (orden) => {
  return {
    type: ordenTypes.ORDEN_ADD,
    payload: orden,
  };
};
//////////////////////////deleted restaurant///////////////
export const actionDeleteRestaurantAsync = (restaurante) => {
  return async (dispatch) => {
    const restauranteRef = doc(dataBase, collectionName, restaurante.id);
    try {
      await deleteDoc(restauranteRef);
      dispatch(actionDeleteRestauranteSync(restaurante));
    } catch (error) {
      console.log(error);
      dispatch(
        actionDeleteRestauranteSync({
          error: true,
          errorMessage: error.message,
        })
      );
    }
  };
};
const actionDeleteRestauranteSync = (restaurant) => {
  return {
    type: restaurantesTypes.RESTAURANTES_DELETE,
    payload: { id: restaurant.id },
  };
};

///////////////////////////deleted foods////////////////////
export const actionDeleteFoodAsync = (food) => {
  return async (dispatch) => {
    const foodRef = doc(dataBase, collectionName, food.id);
    try {
      await deleteDoc(foodRef);
      dispatch(actionDeleteFoodSync(food));
    } catch (error) {
      console.log(error);
      dispatch(
        actionDeleteFoodSync({
          error: true,
          errorMessage: error.message,
        })
      );
    }
  };
};
const actionDeleteFoodSync = (food) => {
  return {
    type: foodTypes.FOOD_DELETE,
    payload: { id: food.id },
  };
};
