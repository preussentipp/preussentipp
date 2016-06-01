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
var login_1 = require('./login/login');
var users_1 = require('./users/users');
var user_1 = require('./users/user');
var header_1 = require('./header/header');
var login_service_1 = require('./login/login.service');
var AppComponent = (function () {
    function AppComponent(router, loginService) {
        router.changes.subscribe(function () {
            if (window.location.hash !== '#/authenticate') {
                if (!loginService.isAuthenticated()) {
                    router.navigate(['/authenticate']);
                }
                else {
                    loginService.sendLoginSuccess();
                }
            }
        });
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'hmac-app',
            templateUrl: './app/app.html',
            providers: [login_service_1.LoginService],
            directives: [router_1.ROUTER_DIRECTIVES, header_1.Header]
        }),
        router_1.Routes([
            new router_1.Route({ path: '/authenticate', component: login_1.Login }),
            new router_1.Route({ path: '/users', component: users_1.Users, }),
            new router_1.Route({ path: '/user/:id', component: user_1.User, }),
            new router_1.Route({ path: '*', component: login_1.Login })
        ]), 
        __metadata('design:paramtypes', [router_1.Router, login_service_1.LoginService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
