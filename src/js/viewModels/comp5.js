define(['accUtils','knockout', 'ojs/ojbootstrap', 'ojs/ojmodel', 
'ojs/ojknockouttemplateutils', 'ojs/ojconverter-datetime', 'ojs/ojcollectiondatagriddatasource',
 'ojs/ojtimeutils', 'ojs/ojknockout', 'ojs/ojdatagrid', 'ojs/ojtimeaxis'],
 function(accUtils, ko, Bootstrap, Model, KnockoutTemplateUtils, DateTimeConverter, collectionModule, TimeUtils) {

    function Comp5ViewModel() {
      var self = this;

      // Main code starts here 
      this.KnockoutTemplateUtils = KnockoutTemplateUtils;
  
          var collection = new Model.Collection(null, {
            url: 'js/jsons/ganttDataProgress.json'
          });
  
          this.dataSource = new collectionModule.CollectionDataGridDataSource(collection,
              {rowHeader: 'id', columns:['name','start','end','description']});
  
          this.projectStartDate = new Date("Jan 3, 2016").toISOString();
          this.projectEndDate = new Date("Mar 27, 2016").toISOString();
  
          // date formatters
          this.dateConverterShort = new DateTimeConverter.IntlDateTimeConverter({"formatType": "date", "dateFormat": "short"});
          this.dateConverterLong = new DateTimeConverter.IntlDateTimeConverter({"formatType": "date", "dateFormat": "long"});
  
          this.timeAxisWidth = ko.observable(550);
  
          var dir = document.documentElement.getAttribute("dir");
          if (dir)
            dir = dir.toLowerCase();
          this.isRTL = (dir === 'rtl');
  
          this.columnHeaderSortable = function(headerContext)
          {
            return headerContext["index"] === 3 ? "disable":"auto";
          };
  
          this.columnHeaderStyle = function(headerContext)
          {
            if (headerContext["index"] === 3)
              return "width:" + this.timeAxisWidth() + "px; height:62px; padding:0;";
            return "width:90px; height:62px;";
          }.bind(this);
  
          this.cellClassName = function(cellContext) {
            var colIndex = cellContext["indexes"]["column"];
            if (colIndex === 3)
              return "oj-datagrid-cell-no-padding oj-helper-text-align-start demo-chart-row-container";
            return "oj-helper-justify-content-right";
          };
  
          this.getId = function(rowInd)
          {
            var row = collection.models[rowInd].attributes;
            return row['id'];
          };
  
          this.getPosition = function(rowInd, pos)
          {
            var row = collection.models[rowInd].attributes;
            return TimeUtils.getPosition(row[pos], this.projectStartDate, this.projectEndDate, this.timeAxisWidth());
          }.bind(this);
  
          this.getLength = function(rowInd, start, end)
          {
            var row = collection.models[rowInd].attributes;
            return TimeUtils.getLength(row[start], row[end], this.projectStartDate, this.projectEndDate, this.timeAxisWidth());
          }.bind(this);
  
          this.getProgress = function(rowInd)
          {
            var row = collection.models[rowInd].attributes;
            var percent = this.getLength(rowInd, 'start', 'progress') / this.getLength(rowInd, 'start', 'end') * 100;
            return Math.round(percent * 10) / 10;
          }.bind(this);
  
          this.getAriaLabel = function(rowInd)
          {
            var row = collection.models[rowInd].attributes;
            var taskStartTime = row['start'];
            var taskEndTime = row['end'];
  
            var taskStart = 'Start date is ' + this.dateConverterLong.format(taskStartTime)+ '. ';
            var taskEnd = 'End date is ' + this.dateConverterLong.format(taskEndTime) + '. ';
            var duration = 'Duration is ' + ((new Date(taskEndTime)).getTime() - (new Date(taskStartTime)).getTime()) / (1000*60*60*24) + ' days. ';
            var progress = 'Progress is ' + this.getProgress(rowInd) + '%';
            return taskStart + taskEnd + duration + progress;
          }.bind(this);
     // };
      // Main code ends here 
      
      self.connected = function() { 
        document.title = "Chart";
        // Implement further logic if needed
      };  
       
    }
 
    return Comp5ViewModel;
  }
);
