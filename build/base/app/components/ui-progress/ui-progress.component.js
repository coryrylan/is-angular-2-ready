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
