const Crawler = require("crawler");
// const async = require('async');
const q = require('q');
const moment = require('moment-jalaali');
const fs = require('fs');
import { convertHolidayDaysToFullDate, convertPeToEn } from './util';
import staticHolidays from './holidays1400.json';
export const requestToTime: any = async (month: any, year: any) => {
    let defer = q.defer();
    try {
        let crawler = new Crawler();
        crawler.queue({
            maxConnections: 10,
            uri: 'https://www.time.ir',
            method: 'POST',
            form: {
                Year: year,
                Month: month
            },
            callback: function (error: any, res: any, done: any) {
                if (error) {
                    console.log(error);
                } else {
                    let list: any = []
                    let $ = res.$;
                    $(".dayList")
                        .find("div > .holiday").each(function (index: any, element: any) {
                            list.push($(element).find(".jalali").text())
                        });
                    defer.resolve(list)
                }
                done();
            }
        });
    } catch (error) {
        console.log(error);
    }
    return defer.promise
}

export const getHolidaysYearOnline = async (year: any = null) => {
    try {
        year = (year) ? year : moment().format('jYYYY');
        let months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
        let result: any = [];
        for (let month of months) {
            try {
                let dayOfHolidays = await requestToTime(month, year)
                let converted = convertHolidayDaysToFullDate(dayOfHolidays, month, year)
                result.push(...converted);
            } catch (error) {
                throw error
            }
        }
        return result
    }
    catch (error) {
        console.log(error);
    }
}

export const getHolidaysYearAndMonthOnline = async (year: any = null, month: any = null) => {
    year = (year) ? year : moment().format('jYYYY')
    month = (month) ? month : moment().format('jM')
    try {
        let dayOfHolidays = await requestToTime({ month, year })
        let converted = convertHolidayDaysToFullDate(dayOfHolidays, month, year)
        return converted.sort()
    } catch (error) {
        throw error
    }
}


export const getHolidaysYearAndMonthsOnline = async (year: any = null, months: any = []) => {
    try {
        year = (year) ? year : moment().format('jYYYY');
        let result: any = [];
        for (let month of months) {
            try {
                let dayOfHolidays = await requestToTime(month, year)
                let converted = convertHolidayDaysToFullDate(dayOfHolidays, month, year)
                result.push(...converted);
            } catch (error) {
                throw error
            }
        }
        return result
    }
    catch (error) {
        console.log(error);
    }
}


export const isHolidaysOnline = async (date: any) => {
    let status;
    let year = date ? moment(date, 'jYYYY/jMM/jDD').format('jYYYY') : moment().format('jYYYY');
    let month = date ? moment(date, 'jYYYY/jMM/jDD').format('jM') : moment().format('jM');
    let day = date ? moment(date, 'jYYYY/jMM/jDD').format('jD') : moment().format('jD');
    try {
        let dayOfHolidays = await requestToTime({ month, year })
        dayOfHolidays = dayOfHolidays.map((day: any) => convertPeToEn(day))
        if (dayOfHolidays.includes(day)) {
            status = true
        }
        else {
            status = false
        }
        return status;
    } catch (error) {
        console.log(error);
    }
}

export const updateStaticHolidayDays = async (year: any = null) => {
    try {
        year = (year) ? year : moment().format('jYYYY');
        let fileName = `holidays${year}`
        let months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
        let result: any = [];
        for (let month of months) {
            try {
                let dayOfHolidays = await requestToTime(month, year)
                let converted = convertHolidayDaysToFullDate(dayOfHolidays, month, year)
                result.push(...converted);
            } catch (error) {
                throw error
            }
        }
        var json = JSON.stringify(result);
        fs.writeFileSync(`./src/${fileName}.json`, json, 'utf8')
        return result
    }
    catch (error) {
        console.log(error);
    }
}

export const isHolidaysOffline = async (date: any) => {
    let status;
    if(staticHolidays){
        try {
            if (staticHolidays.includes(date)) {
                status = true
            }
            else {
                status = false
            }
            return status;
        } catch (error) {
            console.log(error);
        }
    }
    else{
        throw new Error("Not exist offline date for this time, please use isHolidaysOnline")
    }

}