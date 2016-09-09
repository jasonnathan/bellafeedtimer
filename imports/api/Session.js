import {
  Random
} from 'meteor/random';

import moment from 'moment';
// import {
//   SimpleSchema
// } from 'meteor/aldeed:simple-schema';
import Observable from '../helpers/Observable.js';
import Utils from '../helpers/Utils.js';


const humanize = require('humanize-duration')
  .humanizer({
    language: 'shortEn',
    languages: {
      shortEn: {
        y: () => 'y',
        mo: () => 'mo',
        w: () => 'w',
        d: () => 'd',
        h: () => 'h',
        m: () => 'm',
        s: () => 's',
        ms: () => 'ms'
      }
    },
    round: true,
    spacer: ''
  })

export default class Session {
  /**
   * Dependancy injection for Session because it can take on an existing document
   * Sets all internal properties
   *
   * @returns @instance Session
   */
  constructor(data) {
    if(typeof data !== 'object'){
      throw new Error("Session must be instantiated with an object argument");
    }
    if(typeof data !== 'object' || data.position === undefined){
      throw new Error("Session must be instantiated with at least a position parameter");
    }
    this.state = {};
    let k;
    for (k in data) {
      this.state[k] = data[k];
    }
    this.state._id = Random.id();
    // used to visually indicate if a recording is in progress
    this.recording = Observable(true);
    // stores a reference to the total elapsed time.
    this.secondsPassed = Observable(1);
    //Recordings.insert(this.toJS);
  }

  /**
   * Possible values for position is LEFT or RIGHT
   * @returns Moment | undefined
   */
  get position() {
    return this.state.position;
  }

  set position(val) {
    this.state.position = this.constructor.checkPosition(val);
  }

  /**
   * Returns an existing start timestamp or null if not found
   * @returns Moment | undefined
   */
  get started() {
    return this.state.started;
  }

  set started(val) {
    this.state.started = this.constructor.checkDate(val);
  }

  /**
   * Returns an existing ended timestamp or null if not found
   * @returns Moment | undefined
   */
  get ended() {
    return this.state.ended;
  }

  /**
   * Returns an existing ended timestamp or null if not found
   * @returns Moment | undefined
   */
  set ended(val) {
    this.state.ended = this.constructor.checkDate(val);
  }

  /**
   * Returns an existing start timestamp or null is not found
   * @returns Observable (String)
   */
  get startTime() {
    return this.started ? this.started.format("LT") : undefined;
  }

  /**
   * Returns an existing end timestamp or null is not found
   * @returns Observable (String)
   */
  get endTime() {
    return !this.recording() && this.ended ? this.ended.format('LT') : undefined;
  }

  static checkDate(val) {
    if (!moment.isMoment(val)) {
      if (!moment.isDate(val)) {
        throw new Error("Value must be a date or a moment object, " + typeof val + " given");
      }
      return moment(val);
    }
    return val;
  }

  static checkPosition(val) {
    if (val !== "LEFT" || val !== "RIGHT")
      throw new Error("Position must be either LEFT or RIGHT. ''" + val + "' given.");

    return val;
  }

  /**
   * Computes the duration elapsed of the current recording
   * @returns Number milliseconds
   */
  durationMilliseconds() {
    let duration = this.secondsPassed();
    if (this.started) {
      duration = moment.duration(this.ended ? this.ended : moment() - this.started)
        .as('ms');
    }
    this.secondsPassed(duration);
    return duration;
  }

  get durationText() {
    return humanize(this.durationMilliseconds());
  }

  /**
   * Computes the actual JS representation of this class's underlying data
   * @returns Object A serializable Object for saving to DB
   */
  get toJS() {
    return Utils.toJS(Object.assign({}, this.state, {
      position: this.position,
      startTime: this.startTime,
      endTime: this.endTime,
      duration: this.durationMilliseconds(),
      durationText: this.durationText,
    }));
  }

  /**
   * Similar to toJS above expect it returns a JSON String
   * @returns String
   */
  get toJSON() {
    return Utils.toJSON(this.toJS);
  }
}

// export const Recordings = new RecordingCollection('recordings');
