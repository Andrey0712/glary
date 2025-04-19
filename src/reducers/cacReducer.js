import { LIST_CAC } from "../constants/actionTypes";

const initialState = {
  list: [],
};

function cacReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LIST_CAC: {
      return {
        ...state,
        list: payload,
      };
    }
    default:
      return state;
  }
}
export default cacReducer;
