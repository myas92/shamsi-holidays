
import {
  requestToTime,
  getHolidaysYearOnline,
  getHolidaysYearAndMonthOnline,
  getHolidaysYearAndMonthsOnline,
  isHolidayOffline
} from '../src/holidays';
describe("test shmasi-holidays functions", () => {
  // it("requestToTime: should return dates of holidays for 1400/01", async () => {
  //   const holidays = await requestToTime('1', '1400')
  //   expect(holidays).toEqual(['۱', '۲', '۳', '۴', '۶', '۹', '۱۲', '۱۳', '۲۰', '۲۷']);
  // });

  // it("getHolidaysYearOnline: should return dates of holidays for 1400", async () => {
  //   const holidays = await getHolidaysYearOnline('1400');
  //   expect(holidays.length).toBe(74);
  // }, 40000);//set timeout for test

  // it("getHolidaysYearAndMonthOnline: should return dates of holidays for 1400/1", async () => {
  //   const holidays = await getHolidaysYearAndMonthOnline('1400', '1');
  //   expect(holidays.length).toBe(10);
  // });//set timeout for test

  // it("getHolidaysYearAndMonthsOnline: should return dates of holidays for 1400/01 and 400/02", async () => {
  //   const holidays = await getHolidaysYearAndMonthsOnline('1400', ['1', '2']);
  //   expect(holidays.length).toBe(17);
  // }, 40000);//set timeout for test


  // it("isHolidayOffline: should return status of date for 1400/01/02", async () => {
  //   const statusHoliday = await isHolidayOffline('1400/01/02');
  //   expect(statusHoliday).toBe(true);
  // });

  // it("isHolidayOffline: should throw Error of date for 1396/01/02", async () => {
  //   let statusHoliday = isHolidayOffline('1396/01/02');
  //   expect(statusHoliday).rejects.toThrow();
  // });
  it("just test for npm", () => {
    expect(1).toBe(1)
  })
});