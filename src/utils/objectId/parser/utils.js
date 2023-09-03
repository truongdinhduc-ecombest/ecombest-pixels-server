"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDate = exports.isMap = exports.isRegExp = exports.isBigUInt64Array = exports.isBigInt64Array = exports.isUint8Array = exports.isAnyArrayBuffer = void 0;
function isAnyArrayBuffer(value) {
    return ["[object ArrayBuffer]", "[object SharedArrayBuffer]"].includes(Object.prototype.toString.call(value));
}
exports.isAnyArrayBuffer = isAnyArrayBuffer;
function isUint8Array(value) {
    return Object.prototype.toString.call(value) === "[object Uint8Array]";
}
exports.isUint8Array = isUint8Array;
function isBigInt64Array(value) {
    return Object.prototype.toString.call(value) === "[object BigInt64Array]";
}
exports.isBigInt64Array = isBigInt64Array;
function isBigUInt64Array(value) {
    return Object.prototype.toString.call(value) === "[object BigUint64Array]";
}
exports.isBigUInt64Array = isBigUInt64Array;
function isRegExp(d) {
    return Object.prototype.toString.call(d) === "[object RegExp]";
}
exports.isRegExp = isRegExp;
function isMap(d) {
    return Object.prototype.toString.call(d) === "[object Map]";
}
exports.isMap = isMap;
function isDate(d) {
    return Object.prototype.toString.call(d) === "[object Date]";
}
exports.isDate = isDate;
