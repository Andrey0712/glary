import http from "../http_common";

class UsersService {
  get_list() {
    return http.get("api/account/users");
  }
  del_user(data) {
    console.log("service", data.user.id);
    return http.post("api/account/delete", data.user.id);
  }
  edit(data) {
    console.log("service", data);
    return http.post("api/account/editProfile", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export default new UsersService();
