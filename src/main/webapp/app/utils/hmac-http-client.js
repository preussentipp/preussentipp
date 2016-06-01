"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var Observable_1 = require('rxjs/Observable');
var securityToken_1 = require('../security/securityToken');
var AppUtils = require('../utils/app.utils');
var account_events_service_1 = require('../account/account.events.service');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/share');
///<reference path="../../../../../typings/cryptojs/cryptojs.d.ts" />
var HmacHttpClient = (function (_super) {
    __extends(HmacHttpClient, _super);
    function HmacHttpClient(_backend, _defaultOptions, accountEventsService) {
        _super.call(this, _backend, _defaultOptions);
        this.accountEventsService = accountEventsService;
    }
    HmacHttpClient.prototype.addSecurityHeader = function (url, method, options) {
        if (AppUtils.UrlMatcher.matches(url)) {
            var securityToken = new securityToken_1.SecurityToken(JSON.parse(localStorage.getItem(AppUtils.STORAGE_SECURITY_TOKEN)));
            var date = new Date().toISOString();
            var secret = securityToken.secretKey;
            var message = method + url + date;
            options.headers.set(AppUtils.HEADER_AUTHENTICATION, securityToken.token);
            if (securityToken.isEncoding('HmacSHA256')) {
                options.headers.set(AppUtils.HEADER_X_DIGEST, CryptoJS.HmacSHA256(message, secret).toString());
            }
            else if (securityToken.isEncoding('HmacSHA1')) {
                options.headers.set(AppUtils.HEADER_X_DIGEST, CryptoJS.HmacSHA1(message, secret).toString());
            }
            else if (securityToken.isEncoding('HmacMD5')) {
                options.headers.set(AppUtils.HEADER_X_DIGEST, CryptoJS.HmacMD5(message, secret).toString());
            }
            options.headers.set(AppUtils.HEADER_X_ONCE, date);
            console.log('url', url);
            console.log('message', message);
            console.log('secret', secret);
            console.log('hmac message', options.headers.get(AppUtils.HEADER_X_DIGEST));
        }
    };
    HmacHttpClient.prototype.setOptions = function (options) {
        if (!options) {
            options = {};
        }
        if (!options.headers) {
            options.headers = new http_1.Headers();
        }
        return options;
    };
    HmacHttpClient.prototype.mapResponse = function (res, observer) {
        if (res.ok && res.headers) {
            var securityToken = new securityToken_1.SecurityToken(JSON.parse(localStorage.getItem(AppUtils.STORAGE_SECURITY_TOKEN)));
            if (securityToken) {
                securityToken.token = res.headers.get(AppUtils.HEADER_X_TOKEN_ACCESS);
                localStorage.setItem(AppUtils.STORAGE_SECURITY_TOKEN, JSON.stringify(securityToken));
            }
        }
        observer.next(res);
        observer.complete();
    };
    HmacHttpClient.prototype.catchResponse = function (res, observer) {
        if (res.status === 403) {
            console.log('Unauthorized request:', res.text());
            this.accountEventsService.logout({ error: res.text() });
        }
        observer.complete();
    };
    HmacHttpClient.prototype.get = function (url, options) {
        var _this = this;
        options = this.setOptions(options);
        this.addSecurityHeader(url, 'GET', options);
        return Observable_1.Observable.create(function (observer) {
            _super.prototype.get.call(_this, url, options)
                .subscribe(function (res) {
                _this.mapResponse(res, observer);
            }, function (res) {
                _this.catchResponse(res, observer);
            });
        });
    };
    HmacHttpClient.prototype.post = function (url, body, options) {
        var _this = this;
        options = this.setOptions(options);
        this.addSecurityHeader(url, 'POST', options);
        return Observable_1.Observable.create(function (observer) {
            _super.prototype.post.call(_this, url, body, options)
                .subscribe(function (res) {
                _this.mapResponse(res, observer);
            }, function (res) {
                _this.catchResponse(res, observer);
            });
        });
    };
    HmacHttpClient.prototype.put = function (url, body, options) {
        var _this = this;
        options = this.setOptions(options);
        this.addSecurityHeader(url, 'PUT', options);
        return Observable_1.Observable.create(function (observer) {
            _super.prototype.put.call(_this, url, body, options)
                .subscribe(function (res) {
                _this.mapResponse(res, observer);
            }, function (res) {
                _this.catchResponse(res, observer);
            });
        });
    };
    HmacHttpClient = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.ConnectionBackend, http_1.RequestOptions, account_events_service_1.AccountEventsService])
    ], HmacHttpClient);
    return HmacHttpClient;
}(http_1.Http));
exports.HmacHttpClient = HmacHttpClient;
