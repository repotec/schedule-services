define([], function () {
  const statics = {
    server_url: "http://127.0.0.1:8088/schedules/apis/v1/",
    headers: { "Content-Type": "application/json" }
  };

  var apisClientModule = {
    getServices: async function (serviceName) {
      console.log('getServices');

      const response = await fetch(statics.server_url + serviceName, {
        method: "GET",
        headers: statics.headers,
        mode: "cors",
      });

      console.log(response);

      return await response.json();
    },
    postService: async function (serviceName, data) {
      const response = await fetch(statics.server_url + serviceName, {
        method: "POST",
        headers: statics.headers,
        body: JSON.stringify(data),
        mode: "cors",
      });

      return await response.json();
    },
    updateService: async function (serviceName, data) {
      const response = await fetch(statics.server_url + serviceName, {
        method: "PUT",
        headers: statics.headers, 
        body: JSON.stringify(data),
        mode: "cors",
      });

      return await response.json();
    },
  };

  return apisClientModule;
});
