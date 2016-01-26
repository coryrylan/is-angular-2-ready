import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {UIProgress} from './components/ui-progress/ui-progress.component';
import {DataService} from './services/data.service';

@Component({
    selector: 'not-ready',
    templateUrl: 'app/app.html?v=1.6',
    directives: [UIProgress]
})
class App {
    milestones: any;

    constructor(dataService: DataService) {
        this.milestones = [];

        dataService.loadMilestones().then(milestones => {
            this.milestones = dataService.data.slimMilestones;
        });
    }
}

bootstrap(App, [[DataService]]);