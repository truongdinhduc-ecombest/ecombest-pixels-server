"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BSONValue = void 0;
const constants_1 = require("./constants");
/** @public */
class BSONValue {
    /** @internal */
    get [Symbol.for("@@mdb.bson.version")]() {
        return constants_1.BSON_MAJOR_VERSION;
    }
}
exports.BSONValue = BSONValue;
