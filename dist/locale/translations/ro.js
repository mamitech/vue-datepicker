!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).ro=t()}(this,(function(){"use strict";var e=function(e,t,n,r){this.language=e,this.months=t,this.monthsAbbr=n,this.days=r,this.rtl=!1,this.ymd=!1,this.yearSuffix=""},t={language:{configurable:!0},months:{configurable:!0},monthsAbbr:{configurable:!0},days:{configurable:!0}};return t.language.get=function(){return this._language},t.language.set=function(e){if("string"!=typeof e)throw new TypeError("Language must be a string");this._language=e},t.months.get=function(){return this._months},t.months.set=function(e){if(12!==e.length)throw new RangeError("There must be 12 months for "+this.language+" language");this._months=e},t.monthsAbbr.get=function(){return this._monthsAbbr},t.monthsAbbr.set=function(e){if(12!==e.length)throw new RangeError("There must be 12 abbreviated months for "+this.language+" language");this._monthsAbbr=e},t.days.get=function(){return this._days},t.days.set=function(e){if(7!==e.length)throw new RangeError("There must be 7 days for "+this.language+" language");this._days=e},e.prototype.getMonthByAbbrName=function(e){var t=-1;this._monthsAbbr.some((function(n,r){return n===e&&(t=r,!0)}));var n=t+1;return n<10?"0"+n:""+n},e.prototype.getMonthByName=function(e){var t=-1;this._months.some((function(n,r){return n===e&&(t=r,!0)}));var n=t+1;return n<10?"0"+n:""+n},Object.defineProperties(e.prototype,t),new e("Romanian",["Ianuarie","Februarie","Martie","Aprilie","Mai","Iunie","Iulie","August","Septembrie","Octombrie","Noiembrie","Decembrie"],["Ian","Feb","Mar","Apr","Mai","Iun","Iul","Aug","Sep","Oct","Noi","Dec"],["D","L","Ma","Mi","J","V","S"])}));
