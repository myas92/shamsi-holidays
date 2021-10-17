import moment = require('moment-jalaali');
import fs = require('fs');
export const convertPeToEn = (numbers: any) => {
  if (numbers === null || numbers === undefined) return "";
  let res = "";
  for (const num of numbers) {
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


export const convertHolidayDaysToFullDate = (days: any, month: any, year: any) => {
  let fullDate = [];
  fullDate = days.map((day: any) => {
    const date = `${year}/${month}/${convertPeToEn(day)}`
    return moment(date, 'jYYYY,jM,jD').format('jYYYY/jMM/jDD')
  })
  return fullDate
}


export const readFile = (fileName: string) => {
  let staticHolidays: any = [];
  if (fs.existsSync(fileName)) {
    staticHolidays = fs.readFileSync(fileName, 'utf8');
    staticHolidays = JSON.parse(staticHolidays);
  }
  return staticHolidays
}