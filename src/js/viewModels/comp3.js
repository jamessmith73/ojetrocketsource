define(['accUtils', 'knockout', 'ojs/ojbootstrap', 'ojs/ojarraydataprovider', 'ojs/ojknockout', 'ojs/ojswipeactions', 'ojs/ojlistview', 'ojs/ojmenu'],
 function(accUtils, ko, Bootstrap, ArrayDataProvider) {

    function Comp3ViewModel() {
      var self = this;
      
      self.connected = function() { 
        document.title = "Customers";
        // Implement further logic if needed
      };

     // start copy ========
 this.allItems = ko.observableArray([{ id: 'email_1', title: 'Meeting Invite: Product direction', from: 'Amy Bartlet', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac interdum sollicitudin, sem erat ultrices ipsum.' },
                                              { id: 'email_2', title: 'Re: Latest market analysis from XYZ', from: 'Nina Evans', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac interdum sollicitudin, sem erat ultrices ipsum' },
                                              { id: 'email_3', title: 'Feedback from architecture review', from: 'James Marlow', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac interdum sollicitudin, sem erat ultrices ipsum' },
                                              { id: 'email_4', title: 'Customer success stories', from: 'Julia Nayar', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac interdum sollicitudin, sem erat ultrices ipsum' },
                                              { id: 'email_5', title: 'AD: Honey Harvest for 2015', from: 'Bruce Ernst', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac interdum sollicitudin, sem erat ultrices ipsum' },
                                              { id: 'email_6', title: 'Friend looking for internship', from: 'Julia Chen', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac interdum sollicitudin, sem erat ultrices ipsum' },
                                              { id: 'email_7', title: 'Re: Feedback from architecture review', from: 'Nina Evans', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac interdum sollicitudin, sem erat ultrices ipsum' },
                                              { id: 'email_8', title: 'Re: Customer success stories', from: 'Julia Chen', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac interdum sollicitudin, sem erat ultrices ipsum' }
      ]);
      this.dataSource = new ArrayDataProvider(this.allItems, { idAttribute: 'id' });
  
      this.action = ko.observable('No action taken yet');
  
      this.renderOptions = function (data) {
        var id = data.id;
        if (id === 'email_3') { return 'archive'; }
        return 'read';
      };
  
      this.handleAction = function (event, context) {
        this.currentItem = context.data.id;
        this.doAction(event.target.value);
      }.bind(this);
  
      this.handleMenuItemAction = function (event) {
        this.doAction(event.target.id);
      }.bind(this);
  
      this.setCurrentItem = function (target) {
        var context = document.getElementById('listview').getContextByNode(target);
        if (context != null) {
          this.currentItem = context.key;
        } else {
          this.currentItem = null;
        }
      }.bind(this);
  
      this.doAction = function (action) {
        if (this.currentItem != null) { this.action('Handle ' + action + ' action on: ' + this.currentItem); }
  
        if (action === 'trash') {
          this.remove(this.currentItem);
        } else if (action === 'more') {
          document.getElementById('moremenu').open();
        }
      }.bind(this);
  
      this.remove = function (key) {
        this.allItems.remove(function (current) {
          return (current.id === key);
        });
      }.bind(this);

     // end copy ===========

      
    }

    
    return Comp3ViewModel;
  }
);
