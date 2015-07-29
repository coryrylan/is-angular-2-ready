declare module "angular2/forms" {
    var formDirectives: any;
    var formInjectables: any;
    class FormBuilder {
        group(config: any): any
        array(): any
    }
    class Validators {
        static required(): any
    }
    class ControlGroup {
        value: any
        controls: any
        include(): any
        exclude(): any
    }
    class Control {
        valueChanges(): any
    }
    class ControlArray {
        push(): any
        removeAt(): any
    }

    class NgControlName {

    }
    class NgControlGroup {

    }
    class NgFormControl {

    }
    class NgModel {

    }
    class NgFormModel {

    }
    class NgForm {

    }
    class NgSelectOption {

    }
    class NgRequiredValidator {

    }
    class NgControl {
        control: any;
        valueAccessor: any;
    }

}