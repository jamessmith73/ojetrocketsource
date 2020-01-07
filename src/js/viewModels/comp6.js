define(['accUtils', 'ojs/ojbootstrap', 'knockout', 'ojs/ojflattenedtreedataproviderview', 
'ojs/ojarraytreedataprovider', 'ojs/ojknockouttemplateutils', 
'text!jsons/projectData3.json', 
'ojs/ojknockout',
'ojs/ojtable', 'ojs/ojrowexpander', 'ojs/ojchart' ,'ojs/ojattributegrouphandler', 
'text!jsons/cityStateData.json','ojs/ojsunburst', 'ojs/ojpopup'],

/*
'knockout', 'ojs/ojbootstrap', 'ojs/ojattributegrouphandler',
    'text!../cookbook/dataVisualizations/treeView/resources/cityStateData.json',
    'ojs/ojarraytreedataprovider', 'ojs/ojknockout', 'ojs/ojsunburst', 'ojs/ojpopup'
*/

 function(accUtils, Bootstrap, ko, FlattenedTreeDataProviderView, ArrayTreeDataProvider, KnockoutTemplateUtils, jsonDataStr ) {
/*
ko, Bootstrap, PagingDataProviderView, CollectionDataProvider, Model, NumberConverter
*/
    function Comp6ViewModel() {
      var self = this;

      // Main code starts here  1
      this.dataProvider = ko.observable();
      this.KnockoutTemplateUtils = KnockoutTemplateUtils;
      var arrayTreeDataProvider = new ArrayTreeDataProvider(JSON.parse(jsonDataStr), { keyAttributes: 'id' });
      // eslint-disable-next-line max-len
      this.dataProvider(new FlattenedTreeDataProviderView(arrayTreeDataProvider, { expanded: this.expanded }));
      // Main code ends here 1

      // Main code starts here  2

      // Main code starts here  2
      
      self.connected = function() { 
        document.title = "Chart";
        // Implement further logic if needed
      };  
       
    }
 
    return Comp6ViewModel;
  }
);
