import {
  RUNLINE_LIST,
  REGISTER_RUNLINE,
  DELL_RUNLINE,
} from "../constants/actionTypes";

const initialState = {
  list: [],
};

function runlineReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case RUNLINE_LIST: {
      return {
        ...state,
        list: payload,
      };
    }
    case REGISTER_RUNLINE: {
      return {
        ...state,
        list: payload,
      };
    }

    case DELL_RUNLINE:
      return {
        ...state,
        list: state.filter((el) => el.id !== action.payload),
      };
    default:
      return state;
  }
}
export default runlineReducer;
