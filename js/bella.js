function Timer() {
    var self = this, shortDate = 'MMM Do YY', fullDate = shortDate + ", h:mm:ss a";
    self.clock = ko.observable(moment().format(fullDate));
    self.key = moment().format(shortDate);
    self.currentSession = ko.observable(null);
    self.keys = ko.observableArray([], {persist: "keys"});
    self.keys.push(self.key);
    self.sessions = ko.observableArray(null, {persist: self.key});

    self.tick = function() {
        self.clock(moment().format(fullDate));
    };
    self.endTick = function() {
        var cs = self.currentSession(), ct = moment(self.clock(), fullDate);
        return cs && cs.recording() && cs.ended(ct) || false;
    };

    self.toJS = function() {
        return ko.toJS(self.currentSession);
    };

    self.start = function() {
        var cs = self.currentSession, ct = moment(self.clock(), fullDate);
        (cs() && cs().started(ct) || cs(new Session({started:ct}))) && cs().recording(!0);
        return setInterval(self.endTick, 1e3);
    };

    self.end = function() {
        var t = self, cs = t.currentSession, r = cs() && cs().recording || null;
        return r && r(!1);
    };

    self.startStop = function() {
        var t = self, cs = t.currentSession();
        return cs && t.end() || t.start();
    };

    self.edit = function(d) {
        return self.sessions.remove(d) && self.currentSession(new Session(d));
    };

    self.trash = function(d) {
        return self.sessions.remove(d);
    };

    self.inSession = ko.computed(function(){
        var cs = this.currentSession();
        return cs && !cs.recording();
    }, self);

    self.save = function(){
        var t = self, cs = t.currentSession;
        return t.sessions.push(cs().toJS()) && cs(null);
    };

    self.add = function(d){
        d && typeof d === moment || (d=moment(d));

        return d.add('m', 5);
    }
    self.addToStart = function(){
        var cs = self.currentSession();
        return cs && cs.started(self.add(cs.started()));
    };
    self.addToEnd = function(){
        var cs = self.currentSession();
        return cs && cs.ended(self.add(cs.ended()));
    };
    self.subtract = function(d){
        d && typeof d === moment || (d=moment(d));

        return d.subtract('m', 5);
    };
    self.subtractFromStart = function(){
        var cs = self.currentSession();
        return cs && cs.started(self.subtract(cs.started()));
    };
    self.subtractFromEnd = function(){
        var cs = self.currentSession();
        return cs && cs.ended(self.subtract(cs.ended()));
    };

    setInterval(self.tick, 1e3);


}

function Session(data) {
    var self = this, data = data || {};

    self.started = ko.observable(data.started && moment(data.started) || null);
    self.recording = ko.observable(false);

    self.ended = ko.observable(data.ended && moment(data.ended) || null);

    self.startTime = ko.computed(function() {
        var s = this.started();
        return s && s.format('LT');
    }, self);

    self.endTime = ko.computed(function() {
        var s = this.ended();
        return !this.recording() && s && s.format('LT') || 0;
    }, self);

    self.durationTime = ko.computed(function() {
        return moment.duration(this.ended() - this.started());
    }, self);

    self.duration = ko.computed(function() {
        return this.durationTime().humanize();
    }, self);

    self.toJS = function() {
        var o = ko.toJS(self);
        delete o.durationTime;
        delete o.recording;

        return o;
    }
}
$(document).ready(function() {
    ko.applyBindings(new Timer());
});