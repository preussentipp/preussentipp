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
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var login_service_1 = require('./login.service');
var account_events_service_1 = require('../account/account.events.service');
///<reference path="../../../../../typings/lodash/lodash.d.ts" />
var Login = (function () {
    function Login(router, form, loginService, accountEventService) {
        var _this = this;
        this.router = router;
        this.wrongCredentials = false;
        this.loginService = loginService;
        this.loginForm = form.group({
            username: ['', common_1.Validators.required],
            password: ['', common_1.Validators.required]
        });
        accountEventService.subscribe(function (account) {
            if (!account.authenticated) {
                if (account.error) {
                    if (account.error.indexOf('BadCredentialsException') !== -1) {
                        _this.error = 'Username and/or password are invalid !';
                    }
                    else {
                        _this.error = account.error;
                    }
                }
            }
        });
    }
    Login.prototype.authenticate = function (event, username, password) {
        var _this = this;
        event.preventDefault();
        this.loginService.authenticate(username, password)
            .subscribe(function (account) {
            _this.account = account;
            console.log('Successfully logged', account);
            _this.router.navigate(['/users']);
        });
    };
    Login = __decorate([
        core_1.Component({
            selector: 'login',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [login_service_1.LoginService],
            templateUrl: './app/login/login.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, common_1.FormBuilder, login_service_1.LoginService, account_events_service_1.AccountEventsService])
    ], Login);
    return Login;
}());
exports.Login = Login;
