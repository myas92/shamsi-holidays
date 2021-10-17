import Crawler = require("crawler");
// const async = require('async');
import q = require('q');
import moment = require('moment-jalaali');
import fs = require('fs');
import { convertHolidayDaysToFullDate, convertPeToEn, readFile } from './util';
export const requestToTime = async (month: string, year: string): Promise<any> => {
    const defer = q.defer();
    try {
        const crawler = new Crawler(null);
        crawler.queue({
            maxConnections: 10,
            uri: 'https://www.time.ir',
            method: 'POST',
            form: {
                Year: year,
                Month: month
            },
            callback: (error: any, res: any, done: any) => {
                if (error) {
                    throw error
                } else {
                    const list: any = []
                    const $ = res.$;
                    $(".dayList")
                        .find("div > .holiday").each((index: any, element: any) => {
                            list.push($(element).find(".jalali").text())
                        });
                    defer.resolve(list)
                }
                done();
            }
        });
    } catch (error) {
        throw error;
    }
    return defer.promise
}

export const getHolidaysYearOnlineOneByOne = async (year: any = null) => {
    year = (year) ? year : moment().format('jYYYY');
    const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const result: any = [];
    for (const month of months) {
        try {
            const daysOfHoliday = await requestToTime(month, year)
            const converted = convertHolidayDaysToFullDate(daysOfHoliday, month, year)
            result.push(...converted);
        } catch (error) {
            throw error
        }
    }
    return result
}
export const getHolidaysYearOnline = async (year: any = null) => {
    year = (year) ? year : moment().format('jYYYY');
    const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const result: any = [];
    const requests = []
    // Create list of requests
    for (const month of months) {
        requests.push(requestToTime(month, year))
    }
    const statusesPromiseRequest = Promise.all(requests);
    const datesOfHolidays = await statusesPromiseRequest;
    // Process Result
    datesOfHolidays.forEach((daysOfHoliday, month) => {
        try {
            const converted = convertHolidayDaysToFullDate(daysOfHoliday, month + 1, year)
            result.push(...converted);
        } catch (error) {
            throw error
        }
    })
    return result
}

export const getHolidaysYearAndMonthOnline = async (year: string = '', month: string = '') => {
    year = (year) ? year : moment().format('jYYYY')
    month = (month) ? month : moment().format('jM')
    try {
        const daysOfHoliday = await requestToTime(month, year)
        const converted = convertHolidayDaysToFullDate(daysOfHoliday, month, year)
        return converted.sort()
    } catch (error) {
        throw error
    }
}


export const getHolidaysYearAndMonthsOnline = async (year: string = null, months: string[] = []) => {
    try {
        year = (year) ? year : moment().format('jYYYY');
        const result: string[] = [];
        for (const month of months) {
            try {
                const daysOfHoliday = await requestToTime(month, year)
                const converted = convertHolidayDaysToFullDate(daysOfHoliday, month, year)
                result.push(...converted);
            } catch (error) {
                throw error
            }
        }
        return result
    }
    catch (error) {
        throw error
    }
}


export const isHolidaysOnline = async (date: string) => {
    let status = false;
    const year = date ? moment(date, 'jYYYY/jMM/jDD').format('jYYYY') : moment().format('jYYYY');
    const month = date ? moment(date, 'jYYYY/jMM/jDD').format('jM') : moment().format('jM');
    const dayInput = date ? moment(date, 'jYYYY/jMM/jDD').format('jD') : moment().format('jD');
    try {
        let daysOfHoliday = await requestToTime(month, year)
        daysOfHoliday = daysOfHoliday.map((day: string) => convertPeToEn(day))
        if (daysOfHoliday.includes(dayInput)) {
            status = true
        }
        return status;
    } catch (error) {
        throw error
    }
}

export const isHolidaysOffline = async (date: string = '') => {
    let isHoliday = false;
    date = (date) ? date : moment().format('jYYYY/jMM/jDD');
    const year = moment(date, 'jYYYY/jMM/jDD').format('jYYYY')
    const fileName = `./src/holidays${year}.json`;
    const staticHolidays = readFile(fileName)
    if (staticHolidays.length !== 0) {
        try {
            if (staticHolidays.includes(date)) {
                isHoliday = true
            }
            return isHoliday;
        } catch (error) {
            throw error
        }
    }
    else {
        throw new Error("Not exist offline date for this time, please use isHolidaysOnline")
    }
}

export const updateStaticHolidayDays = async (year: string = '') => {
    try {
        year = (year) ? year : moment().format('jYYYY');
        const fileName = `holidays${year}`
        const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
        const result: string[] = [];
        for (const month of months) {
            try {
                const daysOfHoliday = await requestToTime(month, year)
                const converted = convertHolidayDaysToFullDate(daysOfHoliday, month, year)
                result.push(...converted);
            } catch (error) {
                throw error
            }
        }
        const json = JSON.stringify(result);
        fs.writeFileSync(`./src/${fileName}.json`, json, 'utf8')
        return result
    }
    catch (error) {
        throw error
    }
}