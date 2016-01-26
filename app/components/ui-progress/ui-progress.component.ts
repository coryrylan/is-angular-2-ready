import {Component} from 'angular2/core';

@Component({
  selector: 'ui-progress',
  inputs: ['value'],
  template: `
  	 <div class="progress">
	     <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuemin="0" aria-valuemax="100" [style.width]="value + '%'">
	       {{value}}%
	     </div>
	   </div>
  `
})
export class UIProgress { }