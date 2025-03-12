import { RUNLINE_LIST, REGISTER_RUNLINE } from "../constants/actionTypes";
import runlineService from "../services/runLine.service";

export const registerRunLine = (model) => async (dispatch) => {
  try {
    const result = await runlineService.registerRunLine(model);
    console.log("register reuslt", result);
    dispatch({ type: REGISTER_RUNLINE });
    return Promise.resolve(result);
  } catch (err) {
    const { data } = err.response;

    return Promise.reject(data);
  }
};

export const getRunLine = () => async (dispatch) => {
  try {
    const { data } = await runlineService.get_listRunLine();
    //console.log("prod", data);
    dispatch({
      type: RUNLINE_LIST,
      payload: data,
    });
    return Promise.resolve();
  } catch (err) {
    const { data } = err.response;
    return Promise.reject(data);
  }
};
