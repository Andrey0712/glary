import http from "../http_common";

class ShowService {
  get_list_Show() {
    return http.get("ShowForecast/listShow");
  }
  // get_rahunok() {
  //   return http.get("api/product/getfile");
  // }
  registerShow(data) {
    return http.post("ShowForecast/addShow", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  editShow(data) {
    return http.post("ShowForecast/editShow", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  get_list_Show_search(data) {
    //console.log("hello", data);
    return http.get("Show/listBySearch?name=" + data.product);
  }
  // get_list_prod_category(data) {
  //     console.log("hello", data);
  //     return http.post("api/product/listByCatecory", data, {
  //         headers: {
  //             'Content-Type': 'multipart/form-data'
  //         }
  //     });
  // }
  //   get_list_prod_category(data) {
  //     //console.log("category", data.product);
  //     return http.get("api/product/listByCatecory?name=" + data.product);
  //   }

  del_Show(data) {
    //console.log("service", data.product.id);
    return http.post("ShowForecast/deleteShowItem", data.product.id);
  }
}

export default new ShowService();
