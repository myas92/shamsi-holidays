"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHolidays = exports.isHoliday = exports.updateStaticHolidayDays = exports.isHolidaysOnline = exports.getHolidaysYearAndMonthsOnline = exports.getHolidaysYearAndMonthOnline = exports.getHolidaysYearOnline = void 0;
var holidays_1 = require("./holidays");
Object.defineProperty(exports, "getHolidaysYearOnline", { enumerable: true, get: function () { return holidays_1.getHolidaysYearOnline; } });
Object.defineProperty(exports, "getHolidaysYearAndMonthOnline", { enumerable: true, get: function () { return holidays_1.getHolidaysYearAndMonthOnline; } });
Object.defineProperty(exports, "getHolidaysYearAndMonthsOnline", { enumerable: true, get: function () { return holidays_1.getHolidaysYearAndMonthsOnline; } });
Object.defineProperty(exports, "isHolidaysOnline", { enumerable: true, get: function () { return holidays_1.isHolidaysOnline; } });
Object.defineProperty(exports, "updateStaticHolidayDays", { enumerable: true, get: function () { return holidays_1.updateStaticHolidayDays; } });
Object.defineProperty(exports, "isHoliday", { enumerable: true, get: function () { return holidays_1.isHolidayOffline; } });
Object.defineProperty(exports, "getHolidays", { enumerable: true, get: function () { return holidays_1.getHolidaysYearOffline; } });
// import {
//     getHolidaysYearAndMonthOnline,
//     getHolidaysYearOnline,
//     getHolidaysYearAndMonthsOnline,
//     isHolidaysOnline,
//     updateStaticHolidayDays,
//     isHolidayOffline as isHoliday,
//     getHolidaysYearOffline as getHolidays
// } from './holidays';
// async function runTests() {
//     try {
//         // let x = await getHolidaysYearOnline()
//         // console.log("getHolidaysYearOnline", x);
//         // let x1 = await getHolidaysYearAndMonthOnline()
//         // console.log("getHolidaysYearAndMonthOnline:", x1);
//         // let x2 = await getHolidaysYearAndMonthsOnline("1400", ['1', '2'])
//         // console.log("getHolidaysYearAndMonthsOnline:", x2);
//         // let x3 = await isHolidaysOnline("1400/01/02")
//         // console.log("isHolidaysOnline:", x3);
//         // let x4 = await updateStaticHolidayDays('1406')
//         // console.log("updateStaticHolidayDays:", x4);
//         let x5 = await isHoliday("1400/01/01")
//         console.log("isHoliday:", x5);
//         // let x6 = await getHolidays("1400")
//         // console.log("getHolidays:", x6);
//     } catch (error) {
//         console.log(error);
//         console.log(error);
//     }
// }
// runTests()
//# sourceMappingURL=index.js.map