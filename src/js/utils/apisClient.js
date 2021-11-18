define([], function () {
  const statics = {
    server_url: "http://127.0.0.1:8088/schedules/apis/v1/",
  };

  var apisClientModule = {
    getServices: async function (serviceName) {
      var headers = {};
      headers["Content-Type"] = "application/json";

      const response = await fetch(statics.server_url + serviceName, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
      });

      return await response.json();
    },
  };

  return apisClientModule;
});
