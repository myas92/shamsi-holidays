"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = exports.convertHolidayDaysToFullDate = exports.convertPeToEn = void 0;
var moment = require("moment-jalaali");
var fs = require("fs");
var convertPeToEn = function (numbers) {
    if (numbers === null || numbers === undefined)
        return "";
    var res = "";
    for (var _i = 0, numbers_1 = numbers; _i < numbers_1.length; _i++) {
        var num = numbers_1[_i];
        switch (num) {
            case "\u06F0":
                res += "\u0030";
                break;
            case "\u06F1":
                res += "\u0031";
                break;
            case "\u06F2":
                res += "\u0032";
                break;
            case "\u06F3":
                res += "\u0033";
                break;
            case "\u06F4":
                res += "\u0034";
                break;
            case "\u06F5":
                res += "\u0035";
                break;
            case "\u06F6":
                res += "\u0036";
                break;
            case "\u06F7":
                res += "\u0037";
                break;
            case "\u06F8":
                res += "\u0038";
                break;
            case "\u06F9":
                res += "\u0039";
                break;
            default:
                res += num;
        }
    }
    return res;
};
exports.convertPeToEn = convertPeToEn;
var convertHolidayDaysToFullDate = function (days, month, year) {
    var fullDate = [];
    fullDate = days.map(function (day) {
        var date = year + "/" + month + "/" + (0, exports.convertPeToEn)(day);
        return moment(date, 'jYYYY,jM,jD').format('jYYYY/jMM/jDD');
    });
    return fullDate;
};
exports.convertHolidayDaysToFullDate = convertHolidayDaysToFullDate;
var readFile = function (fileName) {
    var staticHolidays = [];
    if (fs.existsSync(fileName)) {
        staticHolidays = fs.readFileSync(fileName, 'utf8');
        staticHolidays = JSON.parse(staticHolidays);
    }
    return staticHolidays;
};
exports.readFile = readFile;
//# sourceMappingURL=util.js.map