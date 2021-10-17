"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStaticHolidayDays = exports.isHolidaysOffline = exports.isHolidaysOnline = exports.getHolidaysYearAndMonthsOnline = exports.getHolidaysYearAndMonthOnline = exports.getHolidaysYearOnline = exports.getHolidaysYearOnlineOneByOne = exports.requestToTime = void 0;
var Crawler = require("crawler");
// const async = require('async');
var q = require("q");
var moment = require("moment-jalaali");
var fs = require("fs");
var util_1 = require("./util");
var requestToTime = function (month, year) { return __awaiter(void 0, void 0, void 0, function () {
    var defer, crawler;
    return __generator(this, function (_a) {
        defer = q.defer();
        try {
            crawler = new Crawler(null);
            crawler.queue({
                maxConnections: 10,
                uri: 'https://www.time.ir',
                method: 'POST',
                form: {
                    Year: year,
                    Month: month
                },
                callback: function (error, res, done) {
                    if (error) {
                        throw error;
                    }
                    else {
                        var list_1 = [];
                        var $_1 = res.$;
                        $_1(".dayList")
                            .find("div > .holiday").each(function (index, element) {
                            list_1.push($_1(element).find(".jalali").text());
                        });
                        defer.resolve(list_1);
                    }
                    done();
                }
            });
        }
        catch (error) {
            throw error;
        }
        return [2 /*return*/, defer.promise];
    });
}); };
exports.requestToTime = requestToTime;
var getHolidaysYearOnlineOneByOne = function (year) {
    if (year === void 0) { year = null; }
    return __awaiter(void 0, void 0, void 0, function () {
        var months, result, _i, months_1, month, daysOfHoliday, converted, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    year = (year) ? year : moment().format('jYYYY');
                    months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
                    result = [];
                    _i = 0, months_1 = months;
                    _a.label = 1;
                case 1:
                    if (!(_i < months_1.length)) return [3 /*break*/, 6];
                    month = months_1[_i];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, (0, exports.requestToTime)(month, year)];
                case 3:
                    daysOfHoliday = _a.sent();
                    converted = (0, util_1.convertHolidayDaysToFullDate)(daysOfHoliday, month, year);
                    result.push.apply(result, converted);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    throw error_1;
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/, result];
            }
        });
    });
};
exports.getHolidaysYearOnlineOneByOne = getHolidaysYearOnlineOneByOne;
var getHolidaysYearOnline = function (year) {
    if (year === void 0) { year = null; }
    return __awaiter(void 0, void 0, void 0, function () {
        var months, result, requests, _i, months_2, month, statusesPromiseRequest, datesOfHolidays;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    year = (year) ? year : moment().format('jYYYY');
                    months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
                    result = [];
                    requests = [];
                    // Create list of requests
                    for (_i = 0, months_2 = months; _i < months_2.length; _i++) {
                        month = months_2[_i];
                        requests.push((0, exports.requestToTime)(month, year));
                    }
                    statusesPromiseRequest = Promise.all(requests);
                    return [4 /*yield*/, statusesPromiseRequest];
                case 1:
                    datesOfHolidays = _a.sent();
                    // Process Result
                    datesOfHolidays.forEach(function (daysOfHoliday, month) {
                        try {
                            var converted = (0, util_1.convertHolidayDaysToFullDate)(daysOfHoliday, month + 1, year);
                            result.push.apply(result, converted);
                        }
                        catch (error) {
                            throw error;
                        }
                    });
                    return [2 /*return*/, result];
            }
        });
    });
};
exports.getHolidaysYearOnline = getHolidaysYearOnline;
var getHolidaysYearAndMonthOnline = function (year, month) {
    if (year === void 0) { year = ''; }
    if (month === void 0) { month = ''; }
    return __awaiter(void 0, void 0, void 0, function () {
        var daysOfHoliday, converted, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    year = (year) ? year : moment().format('jYYYY');
                    month = (month) ? month : moment().format('jM');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, exports.requestToTime)(month, year)];
                case 2:
                    daysOfHoliday = _a.sent();
                    converted = (0, util_1.convertHolidayDaysToFullDate)(daysOfHoliday, month, year);
                    return [2 /*return*/, converted.sort()];
                case 3:
                    error_2 = _a.sent();
                    throw error_2;
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.getHolidaysYearAndMonthOnline = getHolidaysYearAndMonthOnline;
var getHolidaysYearAndMonthsOnline = function (year, months) {
    if (year === void 0) { year = null; }
    if (months === void 0) { months = []; }
    return __awaiter(void 0, void 0, void 0, function () {
        var result, _i, months_3, month, daysOfHoliday, converted, error_3, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    year = (year) ? year : moment().format('jYYYY');
                    result = [];
                    _i = 0, months_3 = months;
                    _a.label = 1;
                case 1:
                    if (!(_i < months_3.length)) return [3 /*break*/, 6];
                    month = months_3[_i];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, (0, exports.requestToTime)(month, year)];
                case 3:
                    daysOfHoliday = _a.sent();
                    converted = (0, util_1.convertHolidayDaysToFullDate)(daysOfHoliday, month, year);
                    result.push.apply(result, converted);
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _a.sent();
                    throw error_3;
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/, result];
                case 7:
                    error_4 = _a.sent();
                    throw error_4;
                case 8: return [2 /*return*/];
            }
        });
    });
};
exports.getHolidaysYearAndMonthsOnline = getHolidaysYearAndMonthsOnline;
var isHolidaysOnline = function (date) { return __awaiter(void 0, void 0, void 0, function () {
    var status, year, month, dayInput, daysOfHoliday, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                status = false;
                year = date ? moment(date, 'jYYYY/jMM/jDD').format('jYYYY') : moment().format('jYYYY');
                month = date ? moment(date, 'jYYYY/jMM/jDD').format('jM') : moment().format('jM');
                dayInput = date ? moment(date, 'jYYYY/jMM/jDD').format('jD') : moment().format('jD');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, exports.requestToTime)(month, year)];
            case 2:
                daysOfHoliday = _a.sent();
                daysOfHoliday = daysOfHoliday.map(function (day) { return (0, util_1.convertPeToEn)(day); });
                if (daysOfHoliday.includes(dayInput)) {
                    status = true;
                }
                return [2 /*return*/, status];
            case 3:
                error_5 = _a.sent();
                throw error_5;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.isHolidaysOnline = isHolidaysOnline;
var isHolidaysOffline = function (date) {
    if (date === void 0) { date = ''; }
    return __awaiter(void 0, void 0, void 0, function () {
        var isHoliday, year, fileName, staticHolidays;
        return __generator(this, function (_a) {
            isHoliday = false;
            date = (date) ? date : moment().format('jYYYY/jMM/jDD');
            year = moment(date, 'jYYYY/jMM/jDD').format('jYYYY');
            fileName = "./src/holidays" + year + ".json";
            staticHolidays = (0, util_1.readFile)(fileName);
            if (staticHolidays.length !== 0) {
                try {
                    if (staticHolidays.includes(date)) {
                        isHoliday = true;
                    }
                    return [2 /*return*/, isHoliday];
                }
                catch (error) {
                    throw error;
                }
            }
            else {
                throw new Error("Not exist offline date for this time, please use isHolidaysOnline");
            }
            return [2 /*return*/];
        });
    });
};
exports.isHolidaysOffline = isHolidaysOffline;
var updateStaticHolidayDays = function (year) {
    if (year === void 0) { year = ''; }
    return __awaiter(void 0, void 0, void 0, function () {
        var fileName, months, result, _i, months_4, month, daysOfHoliday, converted, error_6, json, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    year = (year) ? year : moment().format('jYYYY');
                    fileName = "holidays" + year;
                    months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
                    result = [];
                    _i = 0, months_4 = months;
                    _a.label = 1;
                case 1:
                    if (!(_i < months_4.length)) return [3 /*break*/, 6];
                    month = months_4[_i];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, (0, exports.requestToTime)(month, year)];
                case 3:
                    daysOfHoliday = _a.sent();
                    converted = (0, util_1.convertHolidayDaysToFullDate)(daysOfHoliday, month, year);
                    result.push.apply(result, converted);
                    return [3 /*break*/, 5];
                case 4:
                    error_6 = _a.sent();
                    throw error_6;
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6:
                    json = JSON.stringify(result);
                    fs.writeFileSync("./src/" + fileName + ".json", json, 'utf8');
                    return [2 /*return*/, result];
                case 7:
                    error_7 = _a.sent();
                    throw error_7;
                case 8: return [2 /*return*/];
            }
        });
    });
};
exports.updateStaticHolidayDays = updateStaticHolidayDays;
//# sourceMappingURL=holidays.js.map