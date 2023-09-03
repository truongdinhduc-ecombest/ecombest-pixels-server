"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BSONDataView = exports.ByteUtils = void 0;
const node_byte_utils_1 = require("./node_byte_utils");
const web_byte_utils_1 = require("./web_byte_utils");
/**
 * Check that a global Buffer exists that is a function and
 * does not have a '_isBuffer' property defined on the prototype
 * (this is to prevent using the npm buffer)
 */
const hasGlobalBuffer = typeof Buffer === "function" && ((_a = Buffer.prototype) === null || _a === void 0 ? void 0 : _a._isBuffer) !== true;
/**
 * This is the only ByteUtils that should be used across the rest of the BSON library.
 *
 * The type annotation is important here, it asserts that each of the platform specific
 * utils implementations are compatible with the common one.
 *
 * @internal
 */
exports.ByteUtils = hasGlobalBuffer
    ? node_byte_utils_1.nodeJsByteUtils
    : web_byte_utils_1.webByteUtils;
class BSONDataView extends DataView {
    static fromUint8Array(input) {
        return new DataView(input.buffer, input.byteOffset, input.byteLength);
    }
}
exports.BSONDataView = BSONDataView;
