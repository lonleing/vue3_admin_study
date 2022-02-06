import { ActionMethod, MutationMethod } from "vuex";

export default abstract class BaseModule<T> {
    constructor () {
        // 
    }
    protected namespaced = true;
    protected abstract state (): T
    protected abstract mutations: { [x: string]: MutationMethod }
    protected abstract actions: { [x: string]: ActionMethod }
}