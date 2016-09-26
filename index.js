var gpio = require('pi-gpio');
var Service, Characteristic;

module.exports = function(homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;

    homebridge.registerAccessory('homebridge-gpio', 'GPIO', GPIOAccessory);
}

function GPIOAccessory(log, config) {
    this.log = log;
    this.name = config['name'];
    this.pin = config['pin'];
    this.duration = config['duration'];
    this.service = new Service.Switch(this.name);

    if (!this.pin) throw new Error('You must provide a config value for pin.');

    this.service
        .getCharacteristic(Characteristic.On)
        .on('get', this.getOn.bind(this))
        .on('set', this.setOn.bind(this));

}

GPIOAccessory.prototype.getServices = function() {
    return [this.service];
}

GPIOAccessory.prototype.getOn = function(callback) {
    gpio.read(this.pin, function(err, value) {
        if (err) {
        	callback(err);
        } else {
	        var on = value;
    	    callback(null, on);
    	}
    });
}

GPIOAccessory.prototype.setOn = function(on, callback) {
    if (on) {
        this.pinAction(0);
		if (is_defined(this.duration) && is_int(this.duration)) {
			this.pinTimer()
		}
		callback(null);
    } else {
		this.pinAction(1);
		callback(null);
    }
}

GPIOAccessory.prototype.pinAction = function(action) {
        this.log('Turning ' + (action == 0 ? 'on' : 'off') + ' pin #' + this.pin);

        var self = this;
        gpio.open(self.pin, 'output', function() {
        gpio.write(self.pin, action, function() {
		gpio.close(self.pin);
		return true;
        });
    });
}

GPIOAccessory.prototype.pinTimer = function() {
        var self = this;
        setTimeout(function() {
			self.pinAction(1);
        }, this.duration);
}

var is_int = function(n) {
   return n % 1 === 0;
}

var is_defined = function(v) {
	return typeof v !== 'undefined';
}
