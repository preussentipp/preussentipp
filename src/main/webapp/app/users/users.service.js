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
var AppUtils = require('../utils/app.utils');
var account_1 = require('../account/account');
var UsersService = (function () {
    function UsersService(http) {
        this.http = http;
    }
    UsersService.prototype.getAll = function () {
        return this.http.get(AppUtils.BACKEND_API_ROOT_URL + '/users')
            .map(function (res) {
            var users = [];
            var jsonResults = res.json();
            jsonResults.forEach(function (jsonResult) {
                users.push(new account_1.Account(jsonResult));
            });
            return users;
        });
    };
    UsersService.prototype.getById = function (id) {
        return this.http.get(AppUtils.BACKEND_API_ROOT_URL + '/users/' + id).map(function (res) {
            return new account_1.Account(res.json());
        });
    };
    UsersService.prototype.getProfiles = function () {
        return this.http.get(AppUtils.BACKEND_API_ROOT_URL + '/users/profiles').map(function (res) { return res.json(); });
    };
    UsersService.prototype.saveUser = function (account) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(AppUtils.BACKEND_API_ROOT_URL + '/users/' + account.id, JSON.stringify(account), { headers: headers })
            .map(function (res) {
            return new account_1.Account(res.json());
        });
    };
    UsersService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
