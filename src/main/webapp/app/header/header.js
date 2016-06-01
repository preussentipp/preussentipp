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
var account_events_service_1 = require('../account/account.events.service');
var login_service_1 = require('../login/login.service');
var Header = (function () {
    function Header(accountEventService, loginService) {
        var _this = this;
        this.loginService = loginService;
        accountEventService.subscribe(function (account) {
            if (!account.authenticated) {
                _this.authenticated = false;
                _this.loginService.logout(false);
            }
            else {
                _this.authenticated = true;
            }
        });
    }
    Header.prototype.logout = function (event) {
        event.preventDefault();
        this.loginService.logout();
    };
    Header = __decorate([
        core_1.Component({
            selector: 'header',
            templateUrl: './app/header/header.html',
            providers: [login_service_1.LoginService],
        }), 
        __metadata('design:paramtypes', [account_events_service_1.AccountEventsService, login_service_1.LoginService])
    ], Header);
    return Header;
}());
exports.Header = Header;
