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
var account_1 = require('../account/account');
var users_service_1 = require('./users.service');
var User = (function () {
    function User(router, routeSegment, form, userService) {
        this.user = new account_1.Account();
        this.profiles = [];
        this.router = router;
        this.userService = userService;
        this.userForm = form.group({
            login: ['', common_1.Validators.required],
            profile: ['', common_1.Validators.required]
        });
        this.getUser(routeSegment.getParam('id'));
        this.getProfiles();
    }
    User.prototype.getUser = function (id) {
        var _this = this;
        this.userService.getById(id).subscribe(function (user) { return _this.user = user; });
    };
    User.prototype.getProfiles = function () {
        var _this = this;
        this.userService.getProfiles().subscribe(function (profiles) { return _this.profiles = profiles; });
    };
    User.prototype.saveUser = function () {
        var _this = this;
        this.userService.saveUser(this.user).subscribe(function () { return _this.router.navigate(['/users']); });
    };
    User.prototype.cancel = function () {
        this.router.navigate(['/users']);
    };
    User = __decorate([
        core_1.Component({
            selector: 'user',
            directives: [router_1.ROUTER_DIRECTIVES],
            templateUrl: './app/users/user.html',
            providers: [users_service_1.UsersService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.RouteSegment, common_1.FormBuilder, users_service_1.UsersService])
    ], User);
    return User;
}());
exports.User = User;
