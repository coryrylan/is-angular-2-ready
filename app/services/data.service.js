System.register(['angular2/angular2'], function(exports_1) {
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
    var angular2_1;
    var DataService;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            }],
        execute: function() {
            DataService = (function () {
                function DataService() {
                    this.data = {
                        milestones: [],
                        slimMilestones: []
                    };
                }
                DataService.prototype.loadMilestones = function () {
                    var _this = this;
                    return window.fetch('https://api.github.com/repos/angular/angular/milestones')
                        .then(this._status)
                        .then(this._json)
                        .then(function (d) {
                        _this.data.milestones = d;
                        _this._updateSlimMilestones();
                    }).catch(function (error) { return console.log('Request failed', error); });
                };
                DataService.prototype._updateSlimMilestones = function () {
                    var _this = this;
                    this.data.milestones.forEach(function (milestone) {
                        var total = milestone.closed_issues + milestone.open_issues;
                        var completion = (milestone.closed_issues / total) * 100;
                        if (isNaN(completion)) {
                            completion = 0;
                        }
                        _this.data.slimMilestones.push({
                            completion: completion.toFixed(0),
                            title: milestone.title,
                            open_issues: milestone.open_issues,
                            closed_issues: milestone.closed_issues,
                            description: milestone.description
                        });
                    });
                };
                DataService.prototype._status = function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return Promise.resolve(response);
                    }
                    else {
                        return Promise.reject(new Error(response.statusText));
                    }
                };
                DataService.prototype._json = function (response) {
                    return response.json();
                };
                DataService = __decorate([
                    angular2_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], DataService);
                return DataService;
            })();
            exports_1("DataService", DataService);
        }
    }
});
