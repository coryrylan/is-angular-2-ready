import {Component, View, bootstrap, CORE_DIRECTIVES} from 'angular2/angular2';
import {UIProgress} from 'app/components/ui-progress/ui-progress.component';
import {DataService} from 'app/services/data.service';

@Component({
    selector: 'not-ready',
    templateUrl: 'app/app.html?v=1.5',
    directives: [CORE_DIRECTIVES, UIProgress]
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