"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webByteUtils = exports.webMathRandomBytes = void 0;
const error_1 = require("../error");
function isReactNative() {
    const { navigator } = globalThis;
    return typeof navigator === "object" && navigator.product === "ReactNative";
}
/** @internal */
function webMathRandomBytes(byteLength) {
    if (byteLength < 0) {
        throw new RangeError(`The argument 'byteLength' is invalid. Received ${byteLength}`);
    }
    return exports.webByteUtils.fromNumberArray(Array.from({ length: byteLength }, () => Math.floor(Math.random() * 256)));
}
exports.webMathRandomBytes = webMathRandomBytes;
/** @internal */
const webRandomBytes = (() => {
    var _a;
    const { crypto } = globalThis;
    if (crypto != null && typeof crypto.getRandomValues === "function") {
        return (byteLength) => {
            // @ts-expect-error: crypto.getRandomValues cannot actually be null here
            // You cannot separate getRandomValues from crypto (need to have this === crypto)
            return crypto.getRandomValues(exports.webByteUtils.allocate(byteLength));
        };
    }
    else {
        if (isReactNative()) {
            const { console } = globalThis;
            (_a = console === null || console === void 0 ? void 0 : console.warn) === null || _a === void 0 ? void 0 : _a.call(console, "BSON: For React Native please polyfill crypto.getRandomValues, e.g. using: https://www.npmjs.com/package/react-native-get-random-values.");
        }
        return webMathRandomBytes;
    }
})();
const HEX_DIGIT = /(\d|[a-f])/i;
/** @internal */
exports.webByteUtils = {
    toLocalBufferType(potentialUint8array) {
        var _a;
        const stringTag = (_a = potentialUint8array === null || potentialUint8array === void 0 ? void 0 : potentialUint8array[Symbol.toStringTag]) !== null && _a !== void 0 ? _a : Object.prototype.toString.call(potentialUint8array);
        if (stringTag === "Uint8Array") {
            return potentialUint8array;
        }
        if (ArrayBuffer.isView(potentialUint8array)) {
            return new Uint8Array(potentialUint8array.buffer.slice(potentialUint8array.byteOffset, potentialUint8array.byteOffset + potentialUint8array.byteLength));
        }
        if (stringTag === "ArrayBuffer" ||
            stringTag === "SharedArrayBuffer" ||
            stringTag === "[object ArrayBuffer]" ||
            stringTag === "[object SharedArrayBuffer]") {
            return new Uint8Array(potentialUint8array);
        }
        throw new error_1.BSONError(`Cannot make a Uint8Array from ${String(potentialUint8array)}`);
    },
    allocate(size) {
        if (typeof size !== "number") {
            throw new TypeError(`The "size" argument must be of type number. Received ${String(size)}`);
        }
        return new Uint8Array(size);
    },
    equals(a, b) {
        if (a.byteLength !== b.byteLength) {
            return false;
        }
        for (let i = 0; i < a.byteLength; i++) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    },
    fromNumberArray(array) {
        return Uint8Array.from(array);
    },
    fromBase64(base64) {
        return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
    },
    toBase64(uint8array) {
        return btoa(exports.webByteUtils.toISO88591(uint8array));
    },
    /** **Legacy** binary strings are an outdated method of data transfer. Do not add public API support for interpreting this format */
    fromISO88591(codePoints) {
        return Uint8Array.from(codePoints, (c) => c.charCodeAt(0) & 0xff);
    },
    /** **Legacy** binary strings are an outdated method of data transfer. Do not add public API support for interpreting this format */
    toISO88591(uint8array) {
        return Array.from(Uint16Array.from(uint8array), (b) => String.fromCharCode(b)).join("");
    },
    fromHex(hex) {
        const evenLengthHex = hex.length % 2 === 0 ? hex : hex.slice(0, hex.length - 1);
        const buffer = [];
        for (let i = 0; i < evenLengthHex.length; i += 2) {
            const firstDigit = evenLengthHex[i];
            const secondDigit = evenLengthHex[i + 1];
            if (!HEX_DIGIT.test(firstDigit)) {
                break;
            }
            if (!HEX_DIGIT.test(secondDigit)) {
                break;
            }
            const hexDigit = Number.parseInt(`${firstDigit}${secondDigit}`, 16);
            buffer.push(hexDigit);
        }
        return Uint8Array.from(buffer);
    },
    toHex(uint8array) {
        return Array.from(uint8array, (byte) => byte.toString(16).padStart(2, "0")).join("");
    },
    fromUTF8(text) {
        return new TextEncoder().encode(text);
    },
    toUTF8(uint8array, start, end) {
        return new TextDecoder("utf8", { fatal: false }).decode(uint8array.slice(start, end));
    },
    utf8ByteLength(input) {
        return exports.webByteUtils.fromUTF8(input).byteLength;
    },
    encodeUTF8Into(buffer, source, byteOffset) {
        const bytes = exports.webByteUtils.fromUTF8(source);
        buffer.set(bytes, byteOffset);
        return bytes.byteLength;
    },
    randomBytes: webRandomBytes,
};
