export declare const requestToTime: (month: string, year: string) => Promise<any>;
export declare const getHolidaysYearOnlineOneByOne: (year?: any) => Promise<any>;
export declare const getHolidaysYearOnline: (year?: any) => Promise<any>;
export declare const getHolidaysYearAndMonthOnline: (year?: string, month?: string) => Promise<any>;
export declare const getHolidaysYearAndMonthsOnline: (year?: string, months?: string[]) => Promise<string[]>;
export declare const isHolidaysOnline: (date: string) => Promise<boolean>;
export declare const isHolidaysOffline: (date?: string) => Promise<boolean>;
export declare const updateStaticHolidayDays: (year?: string) => Promise<string[]>;
