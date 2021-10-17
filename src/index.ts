export {
    getHolidaysYearOnline,
    getHolidaysYearAndMonthOnline,
    getHolidaysYearAndMonthsOnline,
    isHolidaysOnline,
    updateStaticHolidayDays,
    isHolidayOffline as isHoliday,
    getHolidaysYearOffline as getHolidays
} from './holidays';



// import {
//     getHolidaysYearAndMonthOnline,
//     getHolidaysYearOnline,
//     getHolidaysYearAndMonthsOnline,
//     isHolidaysOnline,
//     updateStaticHolidayDays,
//     isHolidayOffline,
//     getHolidaysYearOffline
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

//         // let x4 = await updateStaticHolidayDays('1405')
//         // console.log("updateStaticHolidayDays:", x4);

//         // let x5 = await isHolidayOffline("1400/01/02")
//         // console.log("isHolidayOffline:", x5);

//         let x6 = await getHolidaysYearOffline("1400")
//         console.log("isHolidayOffline:", x6);

//     } catch (error) {
//         console.log(error);
//         console.log(error);
//     }

// }
// runTests()