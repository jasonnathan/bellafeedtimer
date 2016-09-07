import { ReactiveVar } from 'meteor/reactive-var';
import {_} from 'underscore';

export default function Observable(val) {
    // in case val is already an instance, we can simply reuse it
    var rv = val instanceof ReactiveVar ? val : new ReactiveVar(val);

    // return a functional getter/setter based on the value
    return function (newVal) {
        return _.isUndefined(newVal) ? rv.get() : rv.set(newVal);
    }
}
