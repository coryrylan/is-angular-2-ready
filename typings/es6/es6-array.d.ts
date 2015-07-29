// Temp until ts supports arra.find (does not as of 1.5.3)
interface Array<T> {
    find(predicate: (T) => boolean): T;
}