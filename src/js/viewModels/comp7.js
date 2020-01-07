define(['accUtils', 'knockout', 'ojs/ojbootstrap', 'ojs/ojpagingdataproviderview',
 'ojs/ojcollectiondataprovider', 'ojs/ojmodel', 'ojs/ojconverter-number', 'ojs/ojknockout', 
 'ojs/ojlistview', 'ojs/ojgauge', 'ojs/ojbutton', 'ojs/ojcheckboxset', 'ojs/ojselectcombobox', 'ojs/ojpagingcontrol'],
 function(accUtils, ko, Bootstrap, PagingDataProviderView, CollectionDataProvider, Model, NumberConverter) {

    function Comp7ViewModel() {
      var self = this;

      // Main code starts here 
      var criteriaMap = {};
      criteriaMap.lh = { key: 'PRICE', direction: 'ascending' };
      criteriaMap.hl = { key: 'PRICE', direction: 'descending' };
      criteriaMap.reviews = { key: 'REVIEWS', direction: 'descending' };
      criteriaMap.date = { key: 'PUBLISH_DATE', direction: 'ascending' };
  
      var filters = ['lt30', '30to40', '40to50', 'gt50', 'five', 'four', 'three', 'two', 'dcoward', 'jbrock', 'hschildt', 'jmanico', 'mnaftalin'];
  
      var filterFunc = {};
      filterFunc.lt30 = function (model) { return (parseFloat(model.get('PRICE')) < 30); };
      filterFunc['30to40'] = function (model) { return (parseFloat(model.get('PRICE')) > 30 && parseFloat(model.get('PRICE')) < 40); };
      filterFunc['40to50'] = function (model) { return (parseFloat(model.get('PRICE')) >= 40 && parseFloat(model.get('PRICE')) <= 50); };
      filterFunc.gt50 = function (model) { return (parseFloat(model.get('PRICE')) > 50); };
  
      filterFunc.five = function (model) { return (parseFloat(model.get('RATING')) === 5); };
      filterFunc.four = function (model) { return (parseFloat(model.get('RATING')) >= 4); };
      filterFunc.three = function (model) { return (parseFloat(model.get('RATING')) >= 3); };
      filterFunc.two = function (model) { return (parseFloat(model.get('RATING')) < 3); };
  
      filterFunc.dcoward = function (model) { return (model.get('AUTHOR').indexOf('Danny Coward') > -1); };
      filterFunc.jbrock = function (model) { return (model.get('AUTHOR').indexOf('John Brock') > -1); };
      filterFunc.jmanico = function (model) { return (model.get('AUTHOR').indexOf('Jim Manico') > -1); };
      filterFunc.hschildt = function (model) { return (model.get('AUTHOR').indexOf('Herbert Schildt') > -1); };
      filterFunc.mnaftalin = function (model) { return (model.get('AUTHOR').indexOf('Maurice Naftalin') > -1); };
  
      var currencyOptions =
        {
          style: 'currency',
          currency: 'USD',
          currencyDisplay: 'symbol'
        };
      this.currencyConverter = new NumberConverter.IntlNumberConverter(currencyOptions);
  
      var model = Model.Model.extend({
        idAttribute: 'ID'
      });
  
      this.collection = new Model.Collection(null, {
        url: 'js/jsons/productData4.json',
        model: model
      });
      var originalCollection = this.collection;
      this.dataProvider = ko.observable();
      this.dataProvider(new PagingDataProviderView(new CollectionDataProvider(this.collection)));
  
      this.currentPrice = [];
      this.currentAuthor = [];
      this.currentRating = [];
      this.currentSort = ko.observable('default');
  
  
      this.executeSort = function (key, direction) {
        if (key) {
          this.collection.comparator = key;
          if (direction === 'ascending') {
            this.collection.sortDirection = 1;
          } else {
            this.collection.sortDirection = -1;
          }
        }
        this.collection.sort();
      }.bind(this);
  
      this.handleSortCriteriaChanged = function (event, ui) {
        var criteria = criteriaMap[event.detail.value];
        if (criteria) {
          this.executeSort(criteria.key, criteria.direction);
        } else {
          this.handleFilterChanged(event, ui);
        }
      }.bind(this);
  
      // eslint-disable-next-line no-unused-vars
      this.handleFilterChanged = function (event, ui) {
        var value = event.detail.value;
        if (!Array.isArray(value)) {
          return;
        }
  
        var results = [];
        var processed = false;
  
        for (var i = 0; i < filters.length; i++) {
          var filter = filters[i];
          if (value.indexOf(filter) > -1) {
            results = results.concat(originalCollection.filter(filterFunc[filter]));
            processed = true;
          }
        }
  
        if (processed) {
          this.collection = new Model.Collection(results);
        } else {
          this.collection = originalCollection;
        }
        if (this.currentSort() !== 'default') {
          var criteria = criteriaMap[this.currentSort()];
          if (criteria) {
            this.executeSort(criteria.key, criteria.direction);
          }
        }
        this.dataProvider(new PagingDataProviderView(new CollectionDataProvider(this.collection)));
      }.bind(this);
    //}
      // Main code ends here 
      
      self.connected = function() { 
        document.title = "Chart";
        // Implement further logic if needed
      };  
       
    }
 
    return Comp7ViewModel;
  }
);
