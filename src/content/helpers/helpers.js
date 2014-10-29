module.exports.register = function (Handlebars, options) {
  'use strict';

  Handlebars.registerHelper('slugify', function (text) {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g,'')
      .replace(/ +/g,'-')
      ;
  });

};
