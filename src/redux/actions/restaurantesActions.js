import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { dataBase } from "../../Firebase/firebaseConfig";
import { foodTypes, restaurantesTypes } from "../types/restaurantesTypes";

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
