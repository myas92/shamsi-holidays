const moment = require('moment-jalaali');
export const convertPeToEn = (number:any) => {
    if (number == null || number == undefined) return "";
    let res = "";
    for (let i = 0; i < number.length; i++) {
      switch (number[i]) {
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
          res += number[i];
      }
    }
    return res;
  };


  export const convertHolidayDaysToFullDate =(days: any, month: any, year: any)=> {
    let fullDate = [];
    fullDate = days.map((day: any) => {
        let date = `${year}/${month}/${convertPeToEn(day)}`
        return moment(date, 'jYYYY,jM,jD').format('jYYYY/jMM/jDD')
    })
    return fullDate
}