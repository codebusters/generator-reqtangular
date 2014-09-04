'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var NgRequireModuleGenerator = yeoman.generators.Base.extend({
  askForModules: function() {
    this.prompt([
      {
        type: "list",
        name: "moduleOption",
        message: "Choose module option",
        choices: ["Blank", "Pre-built"],
        filter: function(val) {
          return val.toLowerCase();
        },
        default: 0
      }
    ], function(res) {
      if (res.moduleOption === 'blank') {
        this.invoke('reqtangular:blankModule', {
          options: {
            'skip-welcome-message' : true
          }
        });
      } else {
       this.invoke('reqtangular:prebuiltModule', {
          options: {
            'skip-welcome-message' : true
          }
        });
      }
    }.bind(this));
  }
});

module.exports = NgRequireModuleGenerator;
