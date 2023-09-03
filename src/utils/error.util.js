"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandlerError = void 0;
class HandlerError extends Error {
    constructor(statusCode, message, error) {
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
    }
}
exports.HandlerError = HandlerError;
