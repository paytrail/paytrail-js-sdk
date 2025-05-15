"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateError = void 0;
const class_validator_1 = require("class-validator");
function extractValidationErrors(errors) {
    let allErrors = [];
    errors.forEach((error) => {
        // Recursively extract errors from children if any
        if (error.children && error.children.length > 0) {
            allErrors = allErrors.concat(extractValidationErrors(error.children));
        }
        else {
            allErrors.push(error);
        }
    });
    return allErrors;
}
const validateError = (target) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = yield (0, class_validator_1.validate)(target);
    if (errors.length > 0) {
        const errorMessages = extractValidationErrors(errors);
        return JSON.stringify(errorMessages);
    }
    else {
        return null;
    }
});
exports.validateError = validateError;
