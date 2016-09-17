import moment from 'moment';
import {
  Observable
} from './Observable.js';

export default class Utils {
  /**
   * Simple static method that converts objects with ReactiveVars to plain JS.
   * Currently also supports moment objects
   *
   * @param Object data
   * @returns Object
   */
  static toJS(data) {
    // we need an object
    if (typeof data !== 'object')
      throw new Error("Utils::toJS() needs an Object as first argument, " + typeof data + " given instead");
    // placeholder return object
    let ret = {}
      // loop through keys
    for (var v in data) {
      // perform all the conversions
      ret[v] = Utils.doConversions(data[v]);
    }
    // return
    return ret;
  }

  /**
   * A simple utility to do all the needed conversions. New conversions should
   * be added to this method.
   *
   * @link Utils.convertMoment
   * @link Utils.convertObsvFuncs
   * @todo Make this method a little more automatic in conversion detection
   * @returns mixed
   */
  static doConversions(val) {
    val = Utils.convertObsvFuncs(val);
    val = Utils.convertMoment(val);

    return val;
  }

  /**
   * Checks if a value is an instance of a Moment object & returns the val as
   * a Date, if not returns the value as is
   *
   * @returns Date|Mixed
   */
  static convertMoment(val) {
    if (moment.isMoment(val)) {
      return val.toDate();
    }
    return val;
  }

  /**
   * Converts a given value to the computed value of the its underlying function/
   * Observable. If not, returns the value as is
   *
   * @returns Mixed
   */
  static convertObsvFuncs(val) {
    if (typeof val === Observable || typeof val === 'function') {
      return val();
    }
    return val;
  }

  /**
   * This is a shorthand to get JSON directly from the output of toJS()
   *
   * @param Object data
   * @returns Object
   */
  static toJSON(data) {
    return JSON.stringify(Utils.toJS(data), null, 2);
  }

  /**
   * Simple diffing for 2 objects
   *
   * @param o1 {Object}
   * @param o2 {Object}
   */
  static diff(o1, o2) {
    Object.keys(o2)
      .reduce((diff, key) => {
        return (o1[key] === o2[key]) ? diff : {
          ...diff,
        [key]: o2[key]
        }
      }, {});
  }
}
