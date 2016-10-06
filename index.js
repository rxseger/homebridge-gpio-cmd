var Service, Characteristic;
var child_process = require('child_process');

module.exports = function(homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;

    homebridge.registerAccessory('homebridge-gpio', 'GPIO', GPIOAccessory);
}

function GPIOAccessory(log, config) {
    this.log = log;
    this.name = config['name'];
    this.pin = +config['pin'];
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

function run_cmd(cmd, args, callBack ) {
    var spawn = child_process.spawn;
    var child = spawn(cmd, args);
    var resp = "";

    child.stdout.on('data', function (buffer) { resp += buffer.toString() });
    child.stdout.on('end', function() { callBack (resp) });
}

GPIOAccessory.prototype.getOn = function(callback) {
    run_cmd('gpio', ['-1', 'read', ''+this.pin], function(data) {
        //console.log('data=',data);
        var on = parseInt(data);
        callback(null, on?1:0);
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
	child_process.exec('gpio -1 write ' + this.pin + ' ' + (action?0:1));
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
