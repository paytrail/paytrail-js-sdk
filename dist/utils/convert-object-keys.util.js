"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertObjectKeys = void 0;
const convertObjectKeys = (obj) => {
    const convertedObj = {};
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const convertedKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
            convertedObj[convertedKey] = obj[key];
        }
    }
    return convertedObj;
};
exports.convertObjectKeys = convertObjectKeys;
