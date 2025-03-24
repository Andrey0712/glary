import {
  REGISTER_SHOW,
  LIST_SHOW,
  UPDATE_SHOW,
  DELL_ITEM_SHOW,
} from "../constants/actionTypes";
import showService from "../services/show.service";

export const getShowList = () => async (dispatch) => {
  try {
    const { data } = await showService.get_list_Show();
    //console.log("prod", data);
    dispatch({
      type: LIST_SHOW,
      payload: data,
    });
    return Promise.resolve();
  } catch (err) {
    const { data } = err.response;
    return Promise.reject(data);
  }
};
export const getShowSearch = (model) => async (dispatch) => {
  try {
    console.log("model", model);
    const { data } = await showService.get_list_Show_search(model);
    dispatch({
      type: LIST_SHOW,
      payload: data,
    });
    return Promise.resolve();
  } catch (err) {
    const { data } = err.response;
    return Promise.reject(data);
  }
};

// export const getProductByCategory= (model) => async (dispatch) => {
//     try {
//         console.log("model", model);
//         const {data} = await productService.get_list_prod_category(model);
//         dispatch({
//             type: PRODUCT_LIST,
//             payload: data
//         });
//         return Promise.resolve();
//     } catch(err) {
//         const {data} = err.response;
//         return Promise.reject(data);
//     }
// }
export const RegisterShow = (model) => async (dispatch) => {
  try {
    const result = await showService.registerShow(model);
    console.log("register reuslt", result);
    dispatch({ type: REGISTER_SHOW });
    return Promise.resolve(result);
  } catch (err) {
    const { data } = err.response;

    return Promise.reject(data);
  }
};

export const EditProd = (model) => async (dispatch) => {
  try {
    const result = await showService.editShow(model);
    console.log("result edit", result);
    //dispatch({type: UPDATE_SHOW});
    return Promise.resolve();
  } catch (err) {
    console.log("ERROR------------");
    const { data } = err.response;

    return Promise.reject(data);
  }
};
