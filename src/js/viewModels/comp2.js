define(['accUtils', 'knockout', 'ojs/ojbootstrap', 'extrajs/DemoCircleLayout', 
          'text!jsons/usa_states.json',
          'ojs/ojattributegrouphandler', 'ojs/ojarraydataprovider', 'ojs/ojarraytreedataprovider',
          'text!jsons/commonCategoriesSingleGroupData.json',
          'text!jsons/commonCategoriesBubbleData.json',
          'text!jsons/commonCategoriesTimeSeriesData.json',
          'text!jsons/commonCategoriesTreeviewData.json',
          'text!jsons/commonCategoriesNBoxData.json',
          'text!jsons/commonCategoriesTMapData.json',
          'text!jsons/commonCategoriesDiagramData.json',
          'ojs/ojknockout', 'ojs/ojbutton',
          'ojs/ojlegend', 'ojs/ojchart', 'ojs/ojsunburst', 'ojs/ojtreemap',
          'ojs/ojthematicmap', 'ojs/ojnbox', 'ojs/ojpictochart', 'ojs/ojtoolbar', 'ojs/ojdiagram',
          'ojs/ojtagcloud'],
 function(accUtils, ko, Bootstrap, layout, geo, attributeGroupHandler, ArrayDataProvider, ArrayTreeDataProvider, 
      singleGroupData, bubbleData, timeSeriesData, singleLevelTreeData, nboxData, tmapData, diagramData) {

    function Comp2ViewModel() {
      var self = this;

      // Main code starts here 
     // Use ColorAttributeGroupHandler for consistent coloring
        this.colorHandler = new attributeGroupHandler.ColorAttributeGroupHandler();
  
        // Categories
        var data = JSON.parse(singleGroupData);
        var categories = data.map(function(item){ return item.series});
        this.hiddenCategoriesValue = ko.observableArray([categories[0]]);
  
        // Bar Chart Data
        this.chartDataProvider = new ArrayDataProvider(JSON.parse(timeSeriesData), { keyAttributes: 'id' });
        
        // Bubble Chart Data
        this.bubbleDataProvider = new ArrayDataProvider(JSON.parse(bubbleData), { keyAttributes: 'id' });
        
        //TagCloud, Legend and Picto Chart Data
        this.categoryDataProvider = new ArrayDataProvider(data, { keyAttributes: 'id' });
  
        // Sunburst and Treemap Data
        var treeData = JSON.parse(singleLevelTreeData);
        this.treeDataProvider = new ArrayTreeDataProvider(treeData, {keyAttributes: 'label'})
  
        // NBox Data
        this.rowData = [{id: '0'}, {id: '1'}, {id: '2'}];
        this.columnData = [{id: '0'}, {id: '1'}, {id: '2'}];
        this.cellData = [
            {row: '0', column: '0', shortDesc: 'Low Potential, Poor Performance'},
            {row: '0', column: '1', shortDesc: 'Low Potential, Fair Performance'},
            {row: '0', column: '2', shortDesc: 'Low Potential, Good Performance'},
            {row: '1', column: '0', shortDesc: 'Medium Potential, Poor Performance'},
            {row: '1', column: '1', shortDesc: 'Medium Potential, Fair Performance'},
            {row: '1', column: '2', shortDesc: 'Medium Potential, Good Performance'},
            {row: '2', column: '0', shortDesc: 'High Potential, Poor Performance'},
            {row: '2', column: '1', shortDesc: 'High Potential, Fair Performance'},
            {row: '2', column: '2', shortDesc: 'High Potential, Good Performance'}
        ];
        this.nboxDataProvider = new ArrayDataProvider(JSON.parse(nboxData), { keyAttributes: 'id' });
  
        // Thematic Map Data
        this.tmapDataProvider = new ArrayDataProvider(JSON.parse(tmapData), { keyAttributes: 'location' });
        this.mapProvider = {
            geo: JSON.parse(geo),
            propertiesKeys: {
              id: 'sLabel',
              shortLabel: 'sLabel',
              longLabel: 'lLabel'
            }
        };
  
        // diagram data
        this.layoutFunc = layout.circleLayout;
        var diagramObj = JSON.parse(diagramData);
        this.nodeDataProvider = new ArrayDataProvider(diagramObj.nodes, {keyAttributes: 'id'});
        this.linkDataProvider = new ArrayDataProvider(diagramObj.links, {keyAttributes: 'id'});
        this.getLinkDescription = function(index){
          return "Link L" + index + ", connects " + categories[index] + " to " + categories[index + 1];
        }
      // Main code ends here 
      
      self.connected = function() { 
        document.title = "Chart";
        // Implement further logic if needed
      };  
       
    }
 
    return Comp2ViewModel;
  }
);
