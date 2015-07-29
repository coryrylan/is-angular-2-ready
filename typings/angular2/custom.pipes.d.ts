declare module "angular2/change_detection" {
    interface PipeFactory { }
    interface Pipe { }
    class Pipes {
        static extend(pipes: any)
    }
    class BasePipe implements Pipe { }
    class NullPipeFactory { }
    class PipeRegistry {
        constructor(pipes: any)
    }
    class WrappedValue {
        static wrap(...args): any
    }
    class ChangeDetectorRef {
        requestCheck(): void;
    }
    var defaultPipeRegistry: any;
    var defaultPipes: any;
    class Parser {

    }
    class Lexer {

    }
    class ChangeDetection {

    }
    class DynamicChangeDetection {

    }
    class PreGeneratedChangeDetection {
        static isSupported(): boolean;
    }
    class JitChangeDetection {
        static isSupported(): boolean;
    }
}

declare module "angular2/pipes" {
    class ObservablePipe {
        constructor(ref: any)
        _subscription: any;
        _observable: any;
        _updateLatestValue(value: any): any;
        _subscribe(obs: any): any;
    }
}