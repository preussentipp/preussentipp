"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var app_component_1 = require('./app.component');
var http_1 = require('@angular/http');
var account_events_service_1 = require('./account/account.events.service');
var hmac_http_client_1 = require('./utils/hmac-http-client');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    http_1.HTTP_PROVIDERS,
    router_1.ROUTER_PROVIDERS,
    hmac_http_client_1.HmacHttpClient,
    account_events_service_1.AccountEventsService,
    http_1.Http,
    core_1.provide(common_1.LocationStrategy, { useClass: common_1.HashLocationStrategy }),
    core_1.provide(http_1.Http, { useFactory: function (xhrBackend, requestOptions, accountEventService) {
            return new hmac_http_client_1.HmacHttpClient(xhrBackend, requestOptions, accountEventService);
        },
        deps: [http_1.XHRBackend, http_1.RequestOptions, account_events_service_1.AccountEventsService],
        multi: false
    })
]);
