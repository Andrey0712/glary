import {
  RUNLINE_LIST,
  REGISTER_RUNLINE,
  UPDATE_RUNLINE,
} from "../constants/actionTypes";
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
// let run = {
//   id: "1",
//   description:
//     "Відкрита реєстрація на виставку * Відкрита реєстрація на виставку * Відкрита реєстрація на виставку *",
// };
export const getRunLine = () => async (dispatch) => {
  try {
    const { data } = await runlineService.get_listRunLine();

    console.log("prod", data);
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

export const editRunLine = (model) => async (dispatch) => {
  try {
    //console.log("result edit", model);
    const result = await runlineService.editRunLine(model);
    console.log("result edit", result);
    dispatch({ type: UPDATE_RUNLINE });
    return Promise.resolve(result);
  } catch (err) {
    console.log("ERROR------------");
    const { data } = err.response;

    return Promise.reject(data);
  }
};
