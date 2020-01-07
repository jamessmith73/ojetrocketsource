define(['accUtils',  'ojs/ojbootstrap', 'ojs/ojattributegrouphandler',
    'text!jsons/cityStateData.json',
    'ojs/ojarraytreedataprovider', 'ojs/ojknockout', 'ojs/ojsunburst', 'ojs/ojpopup'],
 function(accUtils, ko, Bootstrap, attributeGroupHandler, jsonData, ArrayTreeDataProvider) {

    function Comp7ViewModel() {
      var self = this;

      // Main code starts here 
     var colorHandler = new attributeGroupHandler.ColorAttributeGroupHandler();
  
        var nodes = JSON.parse(jsonData);
        this.sunburstData= new ArrayTreeDataProvider(nodes, {keyAttributes: 'id', childrenAttribute: "nodes"});
        this.getColor = function() {
          return colorHandler.getValue(Math.floor(Math.random() * 4));
        };
        this.getTooltip = function(){
          return {'preventDefault':true};
        };
        
         

        this.openPopup = function(event) {
          var nodeContext;
          var sunburst = document.getElementById('sunburst1');
          if (event.target.id !== 'sunburst1')
            nodeContext = sunburst.getContextByNode(event.target);
  
          if (nodeContext){
            var popup = document.getElementById('popup1');
            var indices = nodeContext['indexPath'];
            var node = sunburst.getNode(indices);
            var popupText = "" + node.label + " has size " + node.size +
                            "<br/><a href='http://www.oracle.com' target='_blank'>www.oracle.com</a>";
            var content = popup.children[0];
            content.innerHTML = popupText;
            popup.open(null, {of: {x: event.pageX, y: event.pageY}, 
                              my: {horizontal : 'center', vertical : 'bottom'}, 
                              at: {horizontal : 'center'}, collision: 'none'});
          }
        };

         
      // Main code ends here 
      
      self.connected = function() { 
        document.title = "Chart";
        // Implement further logic if needed
      };  
       
    }
 
    return Comp7ViewModel;
  }
);
