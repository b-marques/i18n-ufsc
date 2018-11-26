import * as actionType from "./ActionType";

export const changeIdiom = idiom => ({
  type: actionType.CHANGE_IDIOM,
  idiom: idiom
});

export const addStock = ticker => ({
  type: actionType.ADD_STOCK,
  ticker: ticker
});

export const removeStock = index => ({
  type: actionType.REMOVE_STOCK,
  index: index
});

export const updateStock = (id, value, quantity, name) => ({
  type: actionType.UPDATE_STOCK,
  id: id,
  value: value,
  quantity: quantity,
  name: name
});
