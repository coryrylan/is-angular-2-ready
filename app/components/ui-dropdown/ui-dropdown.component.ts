import {Component, View} from 'angular2/angular2';

@Component({
    selector: 'ui-dropdown',
    properties: ['title', 'visible']
})
@View({
    templateUrl: 'app/components/ui-dropdown/ui-dropdown.component.html'
})
export class UIDropdownComponent {
    visible: boolean;

    constructor() {
        this.visible = false;
    }

    toggle() {
        this.visible = !this.visible;
    }
}