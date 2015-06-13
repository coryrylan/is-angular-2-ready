/// <reference path="../typings/angular2/angular2.d.ts" />
if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
if (typeof __metadata !== "function") __metadata = function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var ui_progress_component_1 = require('app/components/ui-progress/ui-progress.component');
var data_service_1 = require('app/services/data.service');
var MyAppComponent = (function () {
    function MyAppComponent() {
        var _this = this;
        this.milestones = [];
        data_service_1.default.loadMilestones().then(function (milestones) {
            _this.milestones = data_service_1.default.data.slimMilestones;
        });
    }
    MyAppComponent = __decorate([
        angular2_1.Component({
            selector: 'not-ready'
        }),
        angular2_1.View({
            templateUrl: 'app/app.html',
            directives: [angular2_1.NgFor, ui_progress_component_1.UIProgress]
        }), 
        __metadata('design:paramtypes', [])
    ], MyAppComponent);
    return MyAppComponent;
})();
angular2_1.bootstrap(MyAppComponent);
