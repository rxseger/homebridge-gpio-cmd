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
        if (err) callback(err);
        var on = value;
        callback(null, on);
    });
}

GPIOAccessory.prototype.setOn = function(on, callback) {
    var self = this;
    if (on) {
        this.log('Turning on pin #' + this.pin);
        gpio.open(self.pin, 'output', function() {
        	gpio.write(self.pin, 0, function() {
                callback(null);
        	});
        });
    } else {
		this.log('Turning off pin #' + this.pin);
        gpio.open(self.pin, 'output', function() {
            gpio.write(self.pin, 1, function() {
                callback(null);
            });
        });
    }
}