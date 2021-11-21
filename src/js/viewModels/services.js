define([
  "require",
  "exports",
  "knockout",
  "ojs/ojarraydataprovider",
  "apisClient",
  "config",
  "ojs/ojbutton",
  "ojs/ojdialog",
  "ojs/ojtable",
  "ojs/ojmessages",
  "ojs/ojknockout",
  "ojs/ojinputtext",
  "ojs/ojformlayout"
], function (require, exports, ko, ArrayDataProvider, apisClient, config) {
      function ServicesViewModel() {
        var self = this;

        self.serviceObservableArray = ko.observableArray([]);
        self.messagesDataprovider = ko.observableArray([]);
        self.serviceName = ko.observable();
        self.serviceDescription = ko.observable();
        self.firstSelected = ko.observable();
        var selectedRowData;

        this.connected = () => {
          //accUtils.announce('services page loaded.', 'assertive');
          
          document.title = "services";
          
          self.selectedChangedListener = (event) => {
              const data = event.detail.value.data;
          };

          self.firstSelectedRowChangedListener = (event) => {
            const row = event.detail.value;
            if (row && row.data) {
                self.selectedRowData = row.data;
            }
          };

         apisClient
            .getServices("services")
            .then((response) => {
              self.serviceObservableArray(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
          };
        
          this.dataprovider = new ArrayDataProvider(self.serviceObservableArray, {
            keyAttributes: "serviceName",
            implicitSort: [{ attribute: "serviceName", direction: "ascending" }],
          });

          this.save = () => {
            let newService = {'serviceName' : self.serviceName(), 'serviceDescription' : self.serviceDescription() };
            apisClient.postService('services', newService)
              .then((response)=>{
                if(response.code = 201){
                  self.messagesDataprovider.push({
                        severity: "confirmation",
                        summary: response.message,
                        detail: response.message,
                        autoTimeout: config.errorMessageTimeout,
                  });    

                  apisClient.getServices("services")
                  .then((response) => {
                    self.serviceObservableArray(response.data);
                  })
                  .catch((error) => {
                    console.log(error);
                  })
                }
              });

              document.getElementById("md1").close();
          };

          this.update = () => {
            let service = {'serviceName' : self.serviceName(), 'serviceDescription' : self.serviceDescription() };
            apisClient.updateService('services/' + self.serviceName(), service)
              .then((response)=>{
                if(response.code = 200){
                  self.messagesDataprovider.push({
                        severity: "confirmation",
                        summary: response.message,
                        detail: response.message,
                        autoTimeout: config.errorMessageTimeout,
                  });    

                  apisClient.getServices("services")
                  .then((response) => {
                    self.serviceObservableArray(response.data);
                  })
                  .catch((error) => {
                    console.log(error);
                  })
                }
                else{
                  alert('error')
                }
              });

              document.getElementById("md2").close();
          };

          self.cancelNew = () => {
            self.resetDialog();
            document.getElementById("md1").close();
          };
          
          self.cancelUpdate = () => {
            self.resetDialog();
            document.getElementById("md2").close();
          };

          self.openNew = (event) => {
              self.resetDialog();
              document.getElementById("md1").open();
          };

          self.openUpdate = (event) => {
              self.resetDialog();
              document.getElementById("md2").open();
              self.serviceName(self.selectedRowData.serviceName);
              self.serviceDescription(self.selectedRowData.serviceDescription);  
          };
          
          self.resetDialog = ()=>{
            self.serviceName(null);
            self.serviceDescription(null);
          }        

          this.disconnected = () => {};
          this.transitionCompleted = () => {};
      }
      return ServicesViewModel;
});
