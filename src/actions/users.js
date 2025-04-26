import { USERS } from "../constants/actionTypes";
import usersService from "../services/user.service";

export const getUsers = () => async (dispatch) => {
  try {
    const res = await usersService.get_list();
    dispatch({
      type: USERS,
      data: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const EditProfile = (model) => async (dispatch) => {
  try {
    console.log("result edit", model);
    const result = await usersService.edit(model);
    console.log("result edit1", result);
    //dispatch({type: UPDATE_SHOW});
    return Promise.resolve();
  } catch (err) {
    console.log("ERROR------------");
    const { data } = err.response;

    return Promise.reject(data);
  }
};
