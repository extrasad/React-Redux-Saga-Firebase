import { put } from "redux-saga/effects";

import axios from '../../axios-orders';
import * as actions from '../actions';
import createIndexedDB from "../../shared/createIndexedDB";

export function* initIngredientsSaga(action) {
  try {
    const response = yield axios.get(
      'https://react-my-burger-46141.firebaseio.com/ingredients.json'
    )
    yield put(actions.setIngredients(response.data));
    const dbPromise = yield createIndexedDB();
    const tx = yield dbPromise.transaction('ingredients', 'readwrite');
    const store = yield tx.objectStore('ingredients');
    yield store.put({
      id: 1,
      ingredients: response.data
    });
  }
  catch(e) {
    try {
      const dbPromise = yield createIndexedDB();
      const tx = yield dbPromise.transaction('ingredients', 'readwrite'); // TODO: Change to only write
      const store = yield tx.objectStore('ingredients');
      const localIngredients = yield store.get(1);
      yield put(actions.setIngredients(localIngredients.ingredients));
    }
    catch(e) {
      yield put(actions.fetchIngredientsFailed());
    }
  }
}
