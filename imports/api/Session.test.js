/*global describe it before*/

import assert from 'assert';
import moment from 'moment';
import Session from './Session.js';



describe("Session Module", function(){
  it("should throw an error when constructed without an object argument", function(){
    assert.throws(() => new Session, Error);
  });
  it("should throw an error when constructed without required POSITION", function(){
    assert.throws(() => new Session({}), Error);
  });
  it("should create a session successfully when constructed", function(){
    let sess = new Session({position:'LEFT'});
    assert.strictEqual(typeof sess, 'object');
  });
  it("should set properties of a session when constructed with data", function(){
    let prop = {
      "position": "LEFT",
      "started": moment("2016-09-08T13:39:29.573Z").toDate()
    }
  })

})
