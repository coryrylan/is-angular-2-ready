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
var angular2_1 = require('angular2/angular2');
var UIProgress = (function () {
    function UIProgress() {
    }
    UIProgress = __decorate([
        angular2_1.Component({
            selector: 'ui-progress',
            properties: ['value']
        }),
        angular2_1.View({
            template: "\n  \t <div class=\"progress\">\n\t     <div class=\"progress-bar progress-bar-danger\" role=\"progressbar\" aria-valuemin=\"0\" aria-valuemax=\"100\" [style.width]=\"value + '%'\">\n\t       {{value}}%\n\t     </div>\n\t   </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], UIProgress);
    return UIProgress;
})();
exports.UIProgress = UIProgress;
