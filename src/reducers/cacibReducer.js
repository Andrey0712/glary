import { LIST_CACIB } from "../constants/actionTypes";

const initialState = {
  list: [],
};

function cacibReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LIST_CACIB: {
      return {
        ...state,
        list: payload,
      };
    }
    default:
      return state;
  }
}
export default cacibReducer;
