function Timer() {
    var self = this, fullDate = 'MMM Do YY, h:mm:ss a', passed = 'mm [mins]', time = 'LT';
    self.clock = ko.observable(moment().format(fullDate));
    self.startTime = ko.observable();
    self.endTime = ko.observable();
    self.leftTime = ko.observable();
    self.rightTime = ko.observable();
    self.tick = function(){
        self.clock(moment().format(fullDate));
    };
    self.toJS = function(){
        return {
            start : self.startTime(),
            finish : self.endTime(),
            leftStart : self.leftStart(),
            rightStart : self.rightStart()
        };
    };
    
    setInterval(self.tick, 1000);
}
$(document).ready(function(){
    ko.applyBindings(new Timer());
});