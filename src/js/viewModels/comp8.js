define(['accUtils', 'knockout', 'ojs/ojbootstrap', 'ojs/ojmodel', 'ojs/ojknockouttemplateutils', 'ojs/ojcollectiondatagriddatasource',
    'ojs/ojconverter-datetime', 'ojs/ojconverter-number', 'ojs/ojknockout', 'ojs/ojdatagrid'],
 function(accUtils, ko, Bootstrap, Model, KnockoutTemplateUtils,
    collectionModule, DateTimeConverter, NumberConverter) {

    function Comp8ViewModel() {
      var self = this;

      // Main code starts here 
      this.KnockoutTemplateUtils = KnockoutTemplateUtils;
      var dateOptions = { formatType: 'date', dateFormat: 'medium' };
      this.dateConverter = new DateTimeConverter.IntlDateTimeConverter(dateOptions);
  
      var salaryOptions =
        {
          style: 'currency',
          currency: 'USD',
          currencyDisplay: 'symbol'
        };
      this.salaryConverter = new NumberConverter.IntlNumberConverter(
              salaryOptions);
  
      var collection = new Model.Collection(null, {
        //url: 'js/jsons/employeeData.json'
        //url: 'https://cloud-flix.com/jsonmanager/employeeData.json'
        url: 'https://cloud-flix.com/jsonmanager/empjsonGET.php'
      });
  
      this.dataSource = new collectionModule.CollectionDataGridDataSource(collection,
              { rowHeader: 'EMPLOYEE_ID' }
          );
  
      this.getCellClassName = function (cellContext) {
        var key = cellContext.keys.column;
        if (key === 'SALARY') {
          return 'oj-helper-justify-content-right';
        } else if (key === 'FIRST_NAME' ||
                  key === 'LAST_NAME' ||
                  key === 'EMAIL' ||
                  key === 'HIRE_DATE') {
          return 'oj-sm-justify-content-flex-start';
        }
        return '';
      };
      // Main code ends here 
      
      self.connected = function() { 
        document.title = "Chart";
        // Implement further logic if needed
      };  
       
    }
 
    return Comp8ViewModel;
  }
);
