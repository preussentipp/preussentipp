"use strict";
var SecurityToken = (function () {
    function SecurityToken(token) {
        _.assignIn(this, token);
    }
    SecurityToken.prototype.isEncoding = function (encoding) {
        return this.securityLevel
            && this.securityLevel === encoding;
    };
    return SecurityToken;
}());
exports.SecurityToken = SecurityToken;
