"use strict";

var terms = require('./settings/dictionary').dimensions,
    splitSpaceDelimited = require('./manipulators/split-space-delimited');

module.exports = {
    
    /*
        Split dimensions in format "Top Right Bottom Left"
        
        @param [string]: Dimension values
            "20px 0 30px 40px" -> {20px, 0, 30px, 40px}
            "20px 0 30px" -> {20px, 0, 30px, 0}
            "20px 0" -> {20px, 0, 20px, 0}
            "20px" -> {20px, 20px, 20px, 20px}
        
        @return [object]: Object with T/R/B/L metrics
    */
    split: function (value) {
        var dimensions = splitSpaceDelimited(value),
            numDimensions = dimensions.length,
            jumpBack = (numDimensions !== 1) ? 2 : 1,
            i, j = i = 0,
            splitValue = {};

        for (; i < 4; i++) {
            splitValue[terms[i]] = dimensions[j];

            // Jump back (to start) counter if we've reached the end of our values
            j++;
            j = (j === numDimensions) ? j - jumpBack : j;
        }

        return splitValue;
    },

    combine: function () {}
};