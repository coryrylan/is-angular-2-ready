import {Component, View} from 'angular2/angular2';

@Component({
  selector: 'ui-progress',
  properties: ['value']
})
@View({
  template: `
  	 <div class="progress">
	     <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuemin="0" aria-valuemax="100" [style.width]="value + '%'">
	       {{value}}%
	     </div>
	   </div>
  `
})
export class UIProgress { }