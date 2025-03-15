import http from "../http_common";

class RunLineService {
  get_listRunLine() {
    return http.get("RunLineForecast/listRunlines");
  }

  registerRunLine(data) {
    // console.log("serviceReg", data.runLine.id);
    return http.post("RunLineForecast/addRunlines", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  del_RunLine(data) {
    console.log("service", data.runLine.id);
    return http.post("RunLineForecast/deleteRunlines", data.runLine.id);
  }

  editRunLine(data) {
    return http.post("RunLineForecast/editRunline", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export default new RunLineService();
