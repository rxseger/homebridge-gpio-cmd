# Homebridge GPIO

Supports triggering General Purpose Input Output (GPIO) pins on the Raspberry Pi.

## Requirements
-	[Homebridge](https://github.com/nfarina/homebridge) - _HomeKit support for the impatient_
-	[gpio-admin](https://github.com/quick2wire/quick2wire-gpio-admin) - _Use the GPIO pins on the Raspberry Pi without running as root_

## Installation
1.	Install Homebridge using `npm install -g homebridge`
2.	Install this plugin `npm install -g homebridge-gpio`
3.	Update your conifguration file - see `sample-config.json` in this repo
4.	Install my forked version of [gpo-admin](https://github.com/quick2wire/quick2wire-gpio-admin) _(abandoned project)_:

```bash
git clone git://github.com/jamesblanksby/quick2wire-gpio-admin.git
cd quick2wire-gpio-admin
make
sudo make install
sudo adduser $USER gpio
```

## Configuration
Example `config.json`

```json
{
	"accessories": [
		{
			"accessory": "GPIO",
			"name": "GPIO4",
			"pin": 7
		}
	]
}
```

## Pin Configuration
An extract from: [pi-gpio](https://github.com/rakeshpai/pi-gpio):

> This couldn't have been more confusing. Raspberry Pi's physical pins are not laid out in any particular logical order. Most of them are given the names of the pins of the Broadcom chip it uses (BCM2835). There isn't even a logical relationship between the physical layout of the Raspberry Pi pin header and the Broadcom chip's pinout. The OS recognizes the names of the Broadcom chip and has nothing to do with the physical pin layout on the Pi. To add to the fun, the specs for the Broadcom chip are nearly impossible to get!

| P1 - 3.3v                             | 1  | 2  | 5V      |
|---------------------------------------|----|----|---------|
| I2C SDA                               | 3  | 4  | --      |
| I2C SCL                               | 5  | 6  | Ground  |
| GPIO                                  | 7  | 8  | TX      |
| --                                    | 9  | 10 | RX      |
| GPIO                                  | 11 | 12 | GPIO    |
| GPIO                                  | 13 | 14 | --      |
| GPIO                                  | 15 | 16 | GPIO    |
| --                                    | 17 | 18 | GPIO    |
| SPI MOSI                              | 19 | 20 | --      |
| SPI MISO                              | 21 | 22 | GPIO    |
| SPI SCLK                              | 23 | 24 | SPI CE0 |
| --                                    | 25 | 26 | SPI CE1 |
| Model A+ and Model B+ additional pins                     |
| ID_SD                                 | 27 | 28 | ID_SC   |
| GPIO                                  | 29 | 30 | --      |
| GPIO                                  | 31 | 32 | GPIO    |
| GPIO                                  | 33 | 34 | --      |
| GPIO                                  | 35 | 36 | GPIO    |
| GPIO                                  | 37 | 38 | GPIO    |
| --                                    | 39 | 40 | GPIO    |

> That gives you several GPIO pins to play with: pins 7, 11, 12, 13, 15, 16, 18 and 22 (with A+ and B+ giving 29, 31, 32, 33, 35, 37, 38 and 40). You should provide these physical pin numbers to this library, and not bother with what they are called internally. Easy-peasy.

## Licence

(The MIT License)

Copyright (c) 2016 James Blanksby james@blanks.by

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.