"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var account_1 = require('../account/account');
var account_events_service_1 = require('../account/account.events.service');
var securityToken_1 = require('../security/securityToken');
var AppUtils = require('../utils/app.utils');
var router_1 = require('@angular/router');
var LoginService = (function () {
    function LoginService(http, accountEventService, router) {
        this.http = http;
        this.accountEventService = accountEventService;
        this.router = router;
    }
    LoginService.prototype.authenticate = function (username, password) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(AppUtils.BACKEND_API_ROOT_URL + AppUtils.BACKEND_API_AUTHENTICATE_PATH, JSON.stringify({ login: username, password: password }), { headers: headers })
            .map(function (res) {
            var securityToken = new securityToken_1.SecurityToken({
                secretKey: res.headers.get(AppUtils.HEADER_X_SECRET),
                token: res.headers.get(AppUtils.HEADER_X_TOKEN_ACCESS),
                securityLevel: res.headers.get(AppUtils.HEADER_WWW_AUTHENTICATE)
            });
            localStorage.setItem(AppUtils.STORAGE_ACCOUNT_TOKEN, res.text());
            localStorage.setItem(AppUtils.STORAGE_SECURITY_TOKEN, JSON.stringify(securityToken));
            var account = new account_1.Account(res.json());
            _this.sendLoginSuccess(account);
            return account;
        });
    };
    LoginService.prototype.sendLoginSuccess = function (account) {
        if (!account) {
            account = new account_1.Account(JSON.parse(localStorage.getItem(AppUtils.STORAGE_ACCOUNT_TOKEN)));
        }
        this.accountEventService.loginSuccess(account);
    };
    LoginService.prototype.isAuthenticated = function () {
        return !!localStorage.getItem(AppUtils.STORAGE_ACCOUNT_TOKEN);
    };
    LoginService.prototype.removeAccount = function () {
        localStorage.removeItem(AppUtils.STORAGE_ACCOUNT_TOKEN);
        localStorage.removeItem(AppUtils.STORAGE_SECURITY_TOKEN);
    };
    LoginService.prototype.logout = function (callServer) {
        var _this = this;
        if (callServer === void 0) { callServer = true; }
        console.log('Logging out');
        if (callServer) {
            this.http.get(AppUtils.BACKEND_API_ROOT_URL + '/logout').subscribe(function () {
                _this.accountEventService.logout(new account_1.Account(JSON.parse(localStorage.getItem(AppUtils.STORAGE_ACCOUNT_TOKEN))));
                _this.removeAccount();
                _this.router.navigate(['/authenticate']);
            });
        }
        else {
            this.removeAccount();
            this.router.navigate(['/authenticate']);
        }
    };
    LoginService.prototype.isAuthorized = function (roles) {
        var authorized = false;
        if (this.isAuthenticated() && roles) {
            var account_2 = new account_1.Account(JSON.parse(localStorage.getItem(AppUtils.STORAGE_ACCOUNT_TOKEN)));
            if (account_2 && account_2.authorities) {
                roles.forEach(function (role) {
                    if (account_2.authorities.indexOf(role) !== -1) {
                        authorized = true;
                    }
                });
            }
        }
        return authorized;
    };
    LoginService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, account_events_service_1.AccountEventsService, router_1.Router])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
