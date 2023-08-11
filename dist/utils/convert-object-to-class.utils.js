"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertObjectToClass = void 0;
const convertObjectToClass = (object, targetClass) => Object.assign(new targetClass(), object);
exports.convertObjectToClass = convertObjectToClass;
