!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(t=t||self).mn=n()}(this,(function(){"use strict";var t=function(t,n,e,r){this.language=t,this.months=n,this.monthsAbbr=e,this.days=r,this.rtl=!1,this.ymd=!1,this.yearSuffix=""},n={language:{configurable:!0},months:{configurable:!0},monthsAbbr:{configurable:!0},days:{configurable:!0}};n.language.get=function(){return this._language},n.language.set=function(t){if("string"!=typeof t)throw new TypeError("Language must be a string");this._language=t},n.months.get=function(){return this._months},n.months.set=function(t){if(12!==t.length)throw new RangeError("There must be 12 months for "+this.language+" language");this._months=t},n.monthsAbbr.get=function(){return this._monthsAbbr},n.monthsAbbr.set=function(t){if(12!==t.length)throw new RangeError("There must be 12 abbreviated months for "+this.language+" language");this._monthsAbbr=t},n.days.get=function(){return this._days},n.days.set=function(t){if(7!==t.length)throw new RangeError("There must be 7 days for "+this.language+" language");this._days=t},t.prototype.getMonthByAbbrName=function(t){var n=-1;this._monthsAbbr.some((function(e,r){return e===t&&(n=r,!0)}));var e=n+1;return e<10?"0"+e:""+e},t.prototype.getMonthByName=function(t){var n=-1;this._months.some((function(e,r){return e===t&&(n=r,!0)}));var e=n+1;return e<10?"0"+e:""+e},Object.defineProperties(t.prototype,n);var e=new t("Mongolia",["1 дүгээр сар","2 дугаар сар","3 дугаар сар","4 дүгээр сар","5 дугаар сар","6 дугаар сар","7 дугаар сар","8 дугаар сар","9 дүгээр сар","10 дугаар сар","11 дүгээр сар","12 дугаар сар"],["1-р сар","2-р сар","3-р сар","4-р сар","5-р сар","6-р сар","7-р сар","8-р сар","9-р сар","10-р сар","11-р сар","12-р сар"],["Ня","Да","Мя","Лх","Пү","Ба","Бя"]);return e.ymd=!0,e}));
