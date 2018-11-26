import * as actionType from "../actions/ActionType";

const marketReducer = (state = 0, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case actionType.CHANGE_IDIOM:
      newState.idiom = action.idiom;
      return newState;

    case actionType.ADD_STOCK:
      newState.data.add_stock(action.ticker);
      return newState;

    case actionType.UPDATE_STOCK:
      newState.data.update_stock(
        action.id,
        action.value,
        action.quantity,
        action.name
      );
      return newState;

    case actionType.REMOVE_STOCK:
      newState.data.remove_stock(action.index);
      return newState;

    default:
      return newState;
  }
};

export default marketReducer;
