"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectId = void 0;
const bson_value_1 = require("./bson_value");
const error_1 = require("./error");
const utils_1 = require("./parser/utils");
const byte_utils_1 = require("./utils/byte_utils");
// Regular expression that checks for hex value
const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
// Unique sequence for the current process (initialized on first use)
let PROCESS_UNIQUE = null;
const kId = Symbol("id");
/**
 * A class representation of the BSON ObjectId type.
 * @public
 * @category BSONType
 */
class ObjectId extends bson_value_1.BSONValue {
    get _bsontype() {
        return "ObjectId";
    }
    /**
     * Create an ObjectId type
     *
     * @param inputId - Can be a 24 character hex string, 12 byte binary Buffer, or a number.
     */
    constructor(inputId) {
        super();
        // workingId is set based on type of input and whether valid id exists for the input
        let workingId;
        if (typeof inputId === "object" && inputId && "id" in inputId) {
            if (typeof inputId.id !== "string" && !ArrayBuffer.isView(inputId.id)) {
                throw new error_1.BSONError("Argument passed in must have an id that is of type string or Buffer");
            }
            if ("toHexString" in inputId &&
                typeof inputId.toHexString === "function") {
                workingId = byte_utils_1.ByteUtils.fromHex(inputId.toHexString());
            }
            else {
                workingId = inputId.id;
            }
        }
        else {
            workingId = inputId;
        }
        // the following cases use workingId to construct an ObjectId
        if (workingId == null || typeof workingId === "number") {
            // The most common use case (blank id, new objectId instance)
            // Generate a new id
            this[kId] = ObjectId.generate(typeof workingId === "number" ? workingId : undefined);
        }
        else if (ArrayBuffer.isView(workingId) && workingId.byteLength === 12) {
            // If intstanceof matches we can escape calling ensure buffer in Node.js environments
            this[kId] = byte_utils_1.ByteUtils.toLocalBufferType(workingId);
        }
        else if (typeof workingId === "string") {
            if (workingId.length === 12) {
                // TODO(NODE-4361): Remove string of length 12 support
                const bytes = byte_utils_1.ByteUtils.fromUTF8(workingId);
                if (bytes.byteLength === 12) {
                    this[kId] = bytes;
                }
                else {
                    throw new error_1.BSONError("Argument passed in must be a string of 12 bytes");
                }
            }
            else if (workingId.length === 24 && checkForHexRegExp.test(workingId)) {
                this[kId] = byte_utils_1.ByteUtils.fromHex(workingId);
            }
            else {
                throw new error_1.BSONError("Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer");
            }
        }
        else {
            throw new error_1.BSONError("Argument passed in does not match the accepted types");
        }
        // If we are caching the hex string
        if (ObjectId.cacheHexString) {
            this.__id = byte_utils_1.ByteUtils.toHex(this.id);
        }
    }
    /**
     * The ObjectId bytes
     * @readonly
     */
    get id() {
        return this[kId];
    }
    set id(value) {
        this[kId] = value;
        if (ObjectId.cacheHexString) {
            this.__id = byte_utils_1.ByteUtils.toHex(value);
        }
    }
    /** Returns the ObjectId id as a 24 character hex string representation */
    toHexString() {
        if (ObjectId.cacheHexString && this.__id) {
            return this.__id;
        }
        const hexString = byte_utils_1.ByteUtils.toHex(this.id);
        if (ObjectId.cacheHexString && !this.__id) {
            this.__id = hexString;
        }
        return hexString;
    }
    /**
     * Update the ObjectId index
     * @internal
     */
    static getInc() {
        return (ObjectId.index = (ObjectId.index + 1) % 0xffffff);
    }
    /**
     * Generate a 12 byte id buffer used in ObjectId's
     *
     * @param time - pass in a second based timestamp.
     */
    static generate(time) {
        if ("number" !== typeof time) {
            time = Math.floor(Date.now() / 1000);
        }
        const inc = ObjectId.getInc();
        const buffer = byte_utils_1.ByteUtils.allocate(12);
        // 4-byte timestamp
        byte_utils_1.BSONDataView.fromUint8Array(buffer).setUint32(0, time, false);
        // set PROCESS_UNIQUE if yet not initialized
        if (PROCESS_UNIQUE === null) {
            PROCESS_UNIQUE = byte_utils_1.ByteUtils.randomBytes(5);
        }
        // 5-byte process unique
        buffer[4] = PROCESS_UNIQUE[0];
        buffer[5] = PROCESS_UNIQUE[1];
        buffer[6] = PROCESS_UNIQUE[2];
        buffer[7] = PROCESS_UNIQUE[3];
        buffer[8] = PROCESS_UNIQUE[4];
        // 3-byte counter
        buffer[11] = inc & 0xff;
        buffer[10] = (inc >> 8) & 0xff;
        buffer[9] = (inc >> 16) & 0xff;
        return buffer;
    }
    /**
     * Converts the id into a 24 character hex string for printing, unless encoding is provided.
     * @param encoding - hex or base64
     */
    toString(encoding) {
        // Is the id a buffer then use the buffer toString method to return the format
        if (encoding === "base64")
            return byte_utils_1.ByteUtils.toBase64(this.id);
        if (encoding === "hex")
            return this.toHexString();
        return this.toHexString();
    }
    /** Converts to its JSON the 24 character hex string representation. */
    toJSON() {
        return this.toHexString();
    }
    /**
     * Compares the equality of this ObjectId with `otherID`.
     *
     * @param otherId - ObjectId instance to compare against.
     */
    equals(otherId) {
        if (otherId === undefined || otherId === null) {
            return false;
        }
        if (otherId instanceof ObjectId) {
            return (this[kId][11] === otherId[kId][11] &&
                byte_utils_1.ByteUtils.equals(this[kId], otherId[kId]));
        }
        if (typeof otherId === "string" &&
            ObjectId.isValid(otherId) &&
            otherId.length === 12 &&
            (0, utils_1.isUint8Array)(this.id)) {
            return byte_utils_1.ByteUtils.equals(this.id, byte_utils_1.ByteUtils.fromISO88591(otherId));
        }
        if (typeof otherId === "string" &&
            ObjectId.isValid(otherId) &&
            otherId.length === 24) {
            return otherId.toLowerCase() === this.toHexString();
        }
        if (typeof otherId === "string" &&
            ObjectId.isValid(otherId) &&
            otherId.length === 12) {
            return byte_utils_1.ByteUtils.equals(byte_utils_1.ByteUtils.fromUTF8(otherId), this.id);
        }
        if (typeof otherId === "object" &&
            "toHexString" in otherId &&
            typeof otherId.toHexString === "function") {
            const otherIdString = otherId.toHexString();
            const thisIdString = this.toHexString().toLowerCase();
            return (typeof otherIdString === "string" &&
                otherIdString.toLowerCase() === thisIdString);
        }
        return false;
    }
    /** Returns the generation date (accurate up to the second) that this ID was generated. */
    getTimestamp() {
        const timestamp = new Date();
        const time = byte_utils_1.BSONDataView.fromUint8Array(this.id).getUint32(0, false);
        timestamp.setTime(Math.floor(time) * 1000);
        return timestamp;
    }
    /** @internal */
    static createPk() {
        return new ObjectId();
    }
    /**
     * Creates an ObjectId from a second based number, with the rest of the ObjectId zeroed out. Used for comparisons or sorting the ObjectId.
     *
     * @param time - an integer number representing a number of seconds.
     */
    static createFromTime(time) {
        const buffer = byte_utils_1.ByteUtils.fromNumberArray([
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ]);
        // Encode time into first 4 bytes
        byte_utils_1.BSONDataView.fromUint8Array(buffer).setUint32(0, time, false);
        // Return the new objectId
        return new ObjectId(buffer);
    }
    /**
     * Creates an ObjectId from a hex string representation of an ObjectId.
     *
     * @param hexString - create a ObjectId from a passed in 24 character hexstring.
     */
    static createFromHexString(hexString) {
        if ((hexString === null || hexString === void 0 ? void 0 : hexString.length) !== 24) {
            throw new error_1.BSONError("hex string must be 24 characters");
        }
        return new ObjectId(byte_utils_1.ByteUtils.fromHex(hexString));
    }
    /** Creates an ObjectId instance from a base64 string */
    static createFromBase64(base64) {
        if ((base64 === null || base64 === void 0 ? void 0 : base64.length) !== 16) {
            throw new error_1.BSONError("base64 string must be 16 characters");
        }
        return new ObjectId(byte_utils_1.ByteUtils.fromBase64(base64));
    }
    /**
     * Checks if a value is a valid bson ObjectId
     *
     * @param id - ObjectId instance to validate.
     */
    static isValid(id) {
        if (id == null)
            return false;
        try {
            new ObjectId(id);
            return true;
        }
        catch (_a) {
            return false;
        }
    }
    /** @internal */
    toExtendedJSON() {
        if (this.toHexString)
            return { $oid: this.toHexString() };
        return { $oid: this.toString("hex") };
    }
    /** @internal */
    static fromExtendedJSON(doc) {
        return new ObjectId(doc.$oid);
    }
    /**
     * Converts to a string representation of this Id.
     *
     * @returns return the 24 character hex string representation.
     * @internal
     */
    [Symbol.for("nodejs.util.inspect.custom")]() {
        return this.inspect();
    }
    inspect() {
        return `new ObjectId("${this.toHexString()}")`;
    }
}
exports.ObjectId = ObjectId;
/** @internal */
ObjectId.index = Math.floor(Math.random() * 0xffffff);
