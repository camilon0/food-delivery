import { addDoc, collection, getDocs } from "firebase/firestore";
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
