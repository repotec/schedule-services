define(["require", "exports", "knockout", "ojs/ojbootstrap", "ojs/ojarraydataprovider",
"apisClient", "ojs/ojtable", "ojs/ojknockout"],

  function (require, exports, ko, ojbootstrap_1, ArrayDataProvider, apisClient) {
    function ServicesViewModel() {
      var self = this;
      self.serviceObservableArray = ko.observableArray([]);
  
      this.connected = () => {
        //accUtils.announce('services page loaded.', 'assertive');
        document.title = "services";
      };
  
      apisClient
        .getServices("services")
        .then((response) => {
          self.serviceObservableArray(response);
        })
        .catch((error) => {
          console.log(error);
        });
  
      this.dataprovider = new ArrayDataProvider(self.serviceObservableArray, {
        keyAttributes: "serviceName",
        implicitSort: [{ attribute: "serviceName", direction: "ascending" }],
      });
  
      this.disconnected = () => {};
      this.transitionCompleted = () => {};
    }
    return ServicesViewModel;
  });  