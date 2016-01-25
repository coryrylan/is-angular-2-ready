var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var ui_progress_component_1 = require('app/components/ui-progress/ui-progress.component');
var data_service_1 = require('app/services/data.service');
var App = (function () {
    function App(dataService) {
        var _this = this;
        this.milestones = [];
        dataService.loadMilestones().then(function (milestones) {
            _this.milestones = dataService.data.slimMilestones;
        });
    }
    App = __decorate([
        angular2_1.Component({
            selector: 'not-ready',
            templateUrl: 'app/app.html?v=1.5',
            directives: [angular2_1.CORE_DIRECTIVES, ui_progress_component_1.UIProgress]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof data_service_1.DataService !== 'undefined' && data_service_1.DataService) === 'function' && _a) || Object])
    ], App);
    return App;
    var _a;
})();
angular2_1.bootstrap(App, [[data_service_1.DataService]]);
