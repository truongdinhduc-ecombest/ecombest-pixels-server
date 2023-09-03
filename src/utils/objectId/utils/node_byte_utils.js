"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeJsByteUtils = exports.nodejsMathRandomBytes = void 0;
const error_1 = require("../error");
/** @internal */
function nodejsMathRandomBytes(byteLength) {
    return exports.nodeJsByteUtils.fromNumberArray(Array.from({ length: byteLength }, () => Math.floor(Math.random() * 256)));
}
exports.nodejsMathRandomBytes = nodejsMathRandomBytes;
/**
 * @internal
 * WARNING: REQUIRE WILL BE REWRITTEN
 *
 * This code is carefully used by require_rewriter.mjs any modifications must be reflected in the plugin.
 *
 * @remarks
 * "crypto" is the only dependency BSON needs. This presents a problem for creating a bundle of the BSON library
 * in an es module format that can be used both on the browser and in Node.js. In Node.js when BSON is imported as
 * an es module, there will be no global require function defined, making the code below fallback to the much less desireable math.random bytes.
 * In order to make our es module bundle work as expected on Node.js we need to change this `require()` to a dynamic import, and the dynamic
 * import must be top-level awaited since es modules are async. So we rely on a custom rollup plugin to seek out the following lines of code
 * and replace `require` with `await import` and the IIFE line (`nodejsRandomBytes = (() => { ... })()`) with `nodejsRandomBytes = await (async () => { ... })()`
 * when generating an es module bundle.
 */
const nodejsRandomBytes = (() => {
    try {
        return require("crypto").randomBytes;
    }
    catch (_a) {
        return nodejsMathRandomBytes;
    }
})();
/** @internal */
exports.nodeJsByteUtils = {
    toLocalBufferType(potentialBuffer) {
        var _a;
        if (Buffer.isBuffer(potentialBuffer)) {
            return potentialBuffer;
        }
        if (ArrayBuffer.isView(potentialBuffer)) {
            return Buffer.from(potentialBuffer.buffer, potentialBuffer.byteOffset, potentialBuffer.byteLength);
        }
        const stringTag = (_a = potentialBuffer === null || potentialBuffer === void 0 ? void 0 : potentialBuffer[Symbol.toStringTag]) !== null && _a !== void 0 ? _a : Object.prototype.toString.call(potentialBuffer);
        if (stringTag === "ArrayBuffer" ||
            stringTag === "SharedArrayBuffer" ||
            stringTag === "[object ArrayBuffer]" ||
            stringTag === "[object SharedArrayBuffer]") {
            return Buffer.from(potentialBuffer);
        }
        throw new error_1.BSONError(`Cannot create Buffer from ${String(potentialBuffer)}`);
    },
    allocate(size) {
        return Buffer.alloc(size);
    },
    equals(a, b) {
        return exports.nodeJsByteUtils.toLocalBufferType(a).equals(b);
    },
    fromNumberArray(array) {
        return Buffer.from(array);
    },
    fromBase64(base64) {
        return Buffer.from(base64, "base64");
    },
    toBase64(buffer) {
        return exports.nodeJsByteUtils.toLocalBufferType(buffer).toString("base64");
    },
    /** **Legacy** binary strings are an outdated method of data transfer. Do not add public API support for interpreting this format */
    fromISO88591(codePoints) {
        return Buffer.from(codePoints, "binary");
    },
    /** **Legacy** binary strings are an outdated method of data transfer. Do not add public API support for interpreting this format */
    toISO88591(buffer) {
        return exports.nodeJsByteUtils.toLocalBufferType(buffer).toString("binary");
    },
    fromHex(hex) {
        return Buffer.from(hex, "hex");
    },
    toHex(buffer) {
        return exports.nodeJsByteUtils.toLocalBufferType(buffer).toString("hex");
    },
    fromUTF8(text) {
        return Buffer.from(text, "utf8");
    },
    toUTF8(buffer, start, end) {
        return exports.nodeJsByteUtils
            .toLocalBufferType(buffer)
            .toString("utf8", start, end);
    },
    utf8ByteLength(input) {
        return Buffer.byteLength(input, "utf8");
    },
    encodeUTF8Into(buffer, source, byteOffset) {
        return exports.nodeJsByteUtils
            .toLocalBufferType(buffer)
            .write(source, byteOffset, undefined, "utf8");
    },
    randomBytes: nodejsRandomBytes,
};
