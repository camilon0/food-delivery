import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { dataBase } from "../../Firebase/firebaseConfig";
import { restaurantesTypes } from "../types/userTypes";

const collectionName = "restaurantes";

export const actionGetRestaurantesAsync = () => {
  return async (dispatch) => {
    const restaurantesCollection = collection(dataBase, collectionName);
    const querySnapshot = await getDocs(restaurantesCollection);
    const restaurantes = [];
    try {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        restaurantes.push({
          id: doc.id,
          ...doc.data(),
        });
        //   console.log(doc.id, " => ", doc.data());
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
      dispatch(actionFilterRestaurantesAsync(restaurantes));
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
export const actionFilterAsync = (searchParam) => {
  return async (dispatch) => {
    const restaurantesCollection = collection(dataBase, collectionName);
    const querySnapshot = await getDocs(restaurantesCollection);
    const restaurantes = [];
    try {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        restaurantes.push({
          id: doc.id,
          ...doc.data(),
        });
        //   console.log(doc.id, " => ", doc.data());
      });

      const filterdRestaurantes = restaurantes.filter((item) =>
        item.name.toLowerCase().includes(searchParam.toLowerCase())
      );
      dispatch(actionFilterRestaurantesSync(filterdRestaurantes));
    } catch (error) {
      console.error(error);
      dispatch(actionFilterRestaurantesSync([]));
    }
  };
};
