import {
  REGISTER_SHOW,
  LIST_SHOW,
  UPDATE_SHOW,
  DELL_ITEM_SHOW,
  // LIST_CAC,
} from "../constants/actionTypes";

const initialState = {
  list: [],
};

function showReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LIST_SHOW: {
      return {
        ...state,
        list: payload,
      };
    }
    // case LIST_CAC: {
    //   return {
    //     ...state,
    //     list: payload,
    //   };
    // }
    case REGISTER_SHOW: {
      return {
        ...state,
        list: payload,
      };
    }
    case UPDATE_SHOW: {
      state = [
        state.map((element) =>
          element.items.filter((item) => item.id !== action.payload.id)
        ),
      ];
      return state;
    }
    case DELL_ITEM_SHOW:
      return {
        ...state,
        list: state.filter((el) => el.id !== action.payload),
      };
    default:
      return state;
  }
}
export default showReducer;
