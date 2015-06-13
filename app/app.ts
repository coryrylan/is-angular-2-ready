/// <reference path="../typings/angular2/angular2.d.ts" />

import {Component, View, bootstrap, NgFor} from 'angular2/angular2';
import {UIProgress} from 'app/components/ui-progress/ui-progress.component';
import dataService from 'app/services/data.service';

declare let Zone;
declare let fetch;
declare let Promise;

@Component({
  selector: 'not-ready'
})
@View({
  templateUrl: 'app/app.html',
  directives: [NgFor, UIProgress]
})
class MyAppComponent {
  milestones: any;
  
  constructor() {
    this.milestones = [];
    
    dataService.loadMilestones().then(milestones => {
      this.milestones = dataService.data.slimMilestones;
    })
  }
}

bootstrap(MyAppComponent);