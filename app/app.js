System.register(['angular2/angular2', 'app/components/ui-progress/ui-progress.component', 'app/services/data.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
            case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
            case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
        }
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var angular2_1, ui_progress_component_1, data_service_1;
    var App;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            },
            function (ui_progress_component_1_1) {
                ui_progress_component_1 = ui_progress_component_1_1;
            },
            function (data_service_1_1) {
                data_service_1 = data_service_1_1;
            }],
        execute: function() {
            App = (function () {
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
                        templateUrl: 'app/app.html',
                        directives: [angular2_1.CORE_DIRECTIVES, ui_progress_component_1.UIProgress]
                    }), 
                    __metadata('design:paramtypes', [data_service_1.DataService])
                ], App);
                return App;
            })();
            angular2_1.bootstrap(App, [[data_service_1.DataService]]);
        }
    }
});
