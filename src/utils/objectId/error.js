"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BSONRuntimeError = exports.BSONVersionError = exports.BSONError = void 0;
const constants_1 = require("./constants");
/**
 * @public
 * @category Error
 *
 * `BSONError` objects are thrown when BSON ecounters an error.
 *
 * This is the parent class for all the other errors thrown by this library.
 */
class BSONError extends Error {
    /**
     * @internal
     * The underlying algorithm for isBSONError may change to improve how strict it is
     * about determining if an input is a BSONError. But it must remain backwards compatible
     * with previous minors & patches of the current major version.
     */
    get bsonError() {
        return true;
    }
    get name() {
        return "BSONError";
    }
    constructor(message) {
        super(message);
    }
    /**
     * @public
     *
     * All errors thrown from the BSON library inherit from `BSONError`.
     * This method can assist with determining if an error originates from the BSON library
     * even if it does not pass an `instanceof` check against this class' constructor.
     *
     * @param value - any javascript value that needs type checking
     */
    static isBSONError(value) {
        return (value != null &&
            typeof value === "object" &&
            "bsonError" in value &&
            value.bsonError === true &&
            // Do not access the following properties, just check existence
            "name" in value &&
            "message" in value &&
            "stack" in value);
    }
}
exports.BSONError = BSONError;
/**
 * @public
 * @category Error
 */
class BSONVersionError extends BSONError {
    get name() {
        return "BSONVersionError";
    }
    constructor() {
        super(`Unsupported BSON version, bson types must be from bson ${constants_1.BSON_MAJOR_VERSION}.0 or later`);
    }
}
exports.BSONVersionError = BSONVersionError;
/**
 * @public
 * @category Error
 *
 * An error generated when BSON functions encounter an unexpected input
 * or reaches an unexpected/invalid internal state
 *
 */
class BSONRuntimeError extends BSONError {
    get name() {
        return "BSONRuntimeError";
    }
    constructor(message) {
        super(message);
    }
}
exports.BSONRuntimeError = BSONRuntimeError;
