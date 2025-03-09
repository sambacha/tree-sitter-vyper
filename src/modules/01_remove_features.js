// modules/01_remove_features.js
//const { removeRule } = require('./utils'); //<- Remove this

module.exports = function (grammar, utils) { //Pass in utils
    const { removeRule } = utils;
    removeRule(grammar, 'class_definition');
    //... rest of removals

    return grammar;
};