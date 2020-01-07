define(['accUtils','knockout', 'ojs/ojbootstrap', 'ojs/ojattributegrouphandler',
    'text!jsons/usaMeanIncomeSubregion.json', 
    'ojs/ojarraytreedataprovider', 'ojs/ojknockout', 'ojs/ojtreemap'],
 function(accUtils, ko, Bootstrap, attributeGroupHandler, jsonData, ArrayTreeDataProvider) {

    function Comp1ViewModel() {
      var self = this;

      // copy from 
      var handler = new attributeGroupHandler.ColorAttributeGroupHandler();
        var data = JSON.parse(jsonData);
        this.treemapData= new ArrayTreeDataProvider(data, {keyAttributes: 'label', childrenAttribute: "nodes"});
        this.getColor = function(meanIncome){
          if (meanIncome < 45000) // 1st quartile
            return handler.getValue('1stQuartile');
          else if (meanIncome < 49000) // 2nd quartile
            return handler.getValue('2ndQuartile');
          else if (meanIncome < 56000) // 3rd quartile
            return handler.getValue('3rdQuartile');
          else
            return handler.getValue('4thQuartile');
        };
        this.getShortDesc = function(label, population, meanIncome) {
          return "&lt;b&gt;" + label +
                 "&lt;/b&gt;&lt;br/&gt;Population: " + population +
                 "&lt;br/&gt;Income: " + meanIncome;
        };
      //};

      // copy to 
      
      self.connected = function() { 
        document.title = "About"; 
      };

      
 
    }

     
    return Comp1ViewModel;
  }
);
