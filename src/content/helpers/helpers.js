module.exports.register = function (Handlebars, options) {
  'use strict';

  Handlebars.registerHelper('slugify', function (text) {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g,'')
      .replace(/ +/g,'-');
  });

  // ref: http://stackoverflow.com/a/16315366/885540
  Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
    switch (operator) {
      case '==':
        return (v1 == v2) ? options.fn(this) : options.inverse(this);
      case '===':
        return (v1 === v2) ? options.fn(this) : options.inverse(this);
      case '<':
        return (v1 < v2) ? options.fn(this) : options.inverse(this);
      case '<=':
        return (v1 <= v2) ? options.fn(this) : options.inverse(this);
      case '>':
        return (v1 > v2) ? options.fn(this) : options.inverse(this);
      case '>=':
        return (v1 >= v2) ? options.fn(this) : options.inverse(this);
      case '&&':
        return (v1 && v2) ? options.fn(this) : options.inverse(this);
      case '||':
        return (v1 || v2) ? options.fn(this) : options.inverse(this);
      default:
        return options.inverse(this);
    }
  });

  // for determining when #each loops is halfway through a hash
  Handlebars.registerHelper('ifHalfway', function (index, hash, options) {
    var length = Object.keys(hash).length;
    return (index == Math.ceil(length / 2)) ? options.fn(this) : options.inverse(this);
  });

};
