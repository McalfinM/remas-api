"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateToStringV2 = exports.stringToDateV2 = exports.dateToUnixTimestamp = exports.stringToDate = void 0;
const stringToDate = (dateString) => {
    const splitted = dateString.split("/");
    return new Date(`${splitted[2]}-${splitted[1].padStart(2, "0")}-${splitted[0].padStart(2, "0")}`);
};
exports.stringToDate = stringToDate;
const dateToUnixTimestamp = (date) => {
    return Math.floor(date.getTime() / 1000);
};
exports.dateToUnixTimestamp = dateToUnixTimestamp;
const stringToDateV2 = (dateString) => {
    if (!dateString)
        return null;
    try {
        const splitted = dateString.split("/");
        const year = splitted[0];
        const month = splitted[1].padStart(2, "0");
        const date = splitted[2].padStart(2, "0");
        if (year.length < 4)
            throw new Error();
        if (month.length > 2)
            throw new Error();
        if (date.length > 2)
            throw new Error();
        return new Date(`${year}-${month}-${date}`);
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.stringToDateV2 = stringToDateV2;
const dateToStringV2 = (dateParam) => {
    try {
        const year = dateParam.getFullYear().toString();
        const month = (dateParam.getMonth() + 1).toString().padStart(2, "0");
        const date = dateParam.getDate().toString().padStart(2, "0");
        return `${year}/${month}/${date}`;
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.dateToStringV2 = dateToStringV2;
