/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['accUtils', 'ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojcomposite', 'demo-card/loader'],
 function(accUtils, oj, ko, $) {

    function DashboardViewModel() {
      var self = this;

      //==== copy
  self.employees = [
      {
        name: 'Deb Raphaely',
        avatar: 'images/debraphaely.png',
        title: 'Purchasing Director',
        work: 5171278899,
        email: 'deb.raphaely@oracle.com'
      },
      {
        name: 'Madhusudhan Rao',
        avatar: 'images/Madhu.png', 
        title: 'IT Manager',
        work: 6501232234,
        email: 'youknow.him@oracle.com'
      }
    ];
      //==== copy 
      
      self.connected = function() {
        accUtils.announce('Dashboard page loaded.', 'assertive');
        document.title = "Dashboard";
        // Implement further logic if needed
      };

      

      
      self.transitionCompleted = function() {
        // Implement if needed
      };
    }

    
    return DashboardViewModel;
  }
);
