///<reference path="../../../../../typings/lodash/lodash.d.ts" />
"use strict";
var Account = (function () {
    function Account(account) {
        this.authenticated = true;
        if (account) {
            _.assignIn(this, account);
            this.authenticated = false;
        }
    }
    return Account;
}());
exports.Account = Account;
