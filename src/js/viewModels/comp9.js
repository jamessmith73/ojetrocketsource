define(['accUtils', 'knockout',
   'jquery',
   'ojs/ojarraydataprovider',
   'ojs/ojlabel',
   'ojs/ojchart',
   'ojs/ojlistview',
   'ojs/ojavatar' ],
 function(accUtils, ko, $, ArrayDataProvider) {

    function Comp9ViewModel() {
      var self = this; 

      // ======= Start Copy 
       
      self.activityDataProvider = ko.observable();   //gets data for Activities list
      self.itemsDataProvider = ko.observable();      //gets data for Items list 
      self.itemData = ko.observable('');             //holds data for the Item details 
      self.pieSeriesValue = ko.observableArray([]);  //holds data for pie chart 
      // Activity selection observables
      self.activitySelected = ko.observable(false);
      self.selectedActivity = ko.observable();
      self.firstSelectedActivity = ko.observable();
      
      // Item selection observables
      self.itemSelected = ko.observable(false);
      self.selectedItem = ko.observable();
      self.firstSelectedItem = ko.observable();
 
      var url = "js/jsons/store_data.json"; 
      $.getJSON(url).then(function (data) { 
          var activitiesArray = data;
          self.activityDataProvider(new ArrayDataProvider(activitiesArray, { keyAttributes: 'id' }));
        }
      );
     
      self.selectedActivityChanged = function (event) { 
        if (event.detail.value.length != 0) { 
            var itemsArray = self.firstSelectedActivity().data.items; 
            self.itemsDataProvider(new ArrayDataProvider(itemsArray, { keyAttributes: 'id' })) 
            self.activitySelected(true);
            self.itemSelected(false); 
            self.selectedItem([]);
            self.itemData();
        } else { 
           self.activitySelected(false);
           self.itemSelected(false);
        }
      };
 
      self.selectedItemChanged = function (event) 
      { 
        if (event.detail.value.length != 0) 
        { 
            self.itemData(self.firstSelectedItem().data); 
            var pieSeries = 
            [
              { name: "Quantity in Stock", items: [self.itemData().quantity_instock] },
              { name: "Quantity Shipped", items: [self.itemData().quantity_shipped] }
            ]; 
            self.pieSeriesValue(pieSeries);
            self.itemSelected(true);
        } 
        else 
        { 
           self.itemSelected(false);
        }
      }; 
      // ======== End Copy   

      self.connected = function() { 
        document.title = "Comp9"; 
      };

       
    } 
    return Comp9ViewModel;
  }
);
