# Homebridge GPIO

Supports triggering General Purpose Input Output (GPIO) pins on the Raspberry Pi.

## Requirements
-	[Homebridge](https://github.com/nfarina/homebridge) - _HomeKit support for the impatient_
-	[gpio-admin](https://github.com/quick2wire/quick2wire-gpio-admin) - _Use the GPIO pins on the Raspberry Pi without running as root_

## Installation
1.	Install Homebridge using `npm install -g homebridge`
2.	Install this plugin `npm install -g homebridge-gpio`
3.	Update your configuration file - see `sample-config.json` in this repo
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
        "pin": 7,
        "duration": 4000
    }
  ]
}
```

## Pin Configuration
An extract from: [pi-gpio](https://github.com/rakeshpai/pi-gpio):

> This couldn't have been more confusing. Raspberry Pi's physical pins are not laid out in any particular logical order. Most of them are given the names of the pins of the Broadcom chip it uses (BCM2835). There isn't even a logical relationship between the physical layout of the Raspberry Pi pin header and the Broadcom chip's pinout. The OS recognizes the names of the Broadcom chip and has nothing to do with the physical pin layout on the Pi. To add to the fun, the specs for the Broadcom chip are nearly impossible to get!

<table>
    <tr>
        <td>P1 - 3.3v</td>
        <td>1</td>
        <td>2</td>
        <td>5v</td>
    </tr>
    <tr>
        <td>I2C SDA</td>
        <td>3</td>
        <td>4</td>
        <td>--</td>
    </tr>
    <tr>
        <td>I2C SCL</td>
        <td>5</td>
        <td>6</td>
        <td>Ground</td>
    </tr>
    <tr>
        <td>GPIO</td>
        <td>7</td>
        <td>8</td>
        <td>TX</td>
    </tr>
    <tr>
        <td>--</td>
        <td>9</td>
        <td>10</td>
        <td>RX</td>
    </tr>
    <tr>
        <td>GPIO</td>
        <td>11</td>
        <td>12</td>
        <td>GPIO</td>
    </tr>
    <tr>
        <td>GPIO</td>
        <td>13</td>
        <td>14</td>
        <td>--</td>
    </tr>
    <tr>
        <td>GPIO</td>
        <td>15</td>
        <td>16</td>
        <td>GPIO</td>
    </tr>
    <tr>
        <td>--</td>
        <td>17</td>
        <td>18</td>
        <td>GPIO</td>
    </tr>
    <tr>
        <td>SPI MOSI</td>
        <td>19</td>
        <td>20</td>
        <td>--</td>
    </tr>
    <tr>
        <td>SPI MISO</td>
        <td>21</td>
        <td>22</td>
        <td>GPIO</td>
    </tr>
    <tr>
        <td>SPI SCLK</td>
        <td>23</td>
        <td>24</td>
        <td>SPI CE0</td>
    </tr>
    <tr>
        <td>--</td>
        <td>25</td>
        <td>26</td>
        <td>SPI CE1</td>
    </tr>
    <tr>
        <td colspan="4">Model A+ and Model B+ additional pins</td>
    </tr>
    <tr>
        <td>ID_SD</td>
        <td>27</td>
        <td>28</td>
        <td>ID_SC</td>
    </tr>
    <tr>
        <td>GPIO</td>
        <td>29</td>
        <td>30</td>
        <td>--</td>
    </tr>
    <tr>
        <td>GPIO</td>
        <td>31</td>
        <td>32</td>
        <td>GPIO</td>
    </tr>
    <tr>
        <td>GPIO</td>
        <td>33</td>
        <td>34</td>
        <td>--</td>
    </tr>
    <tr>
        <td>GPIO</td>
        <td>35</td>
        <td>36</td>
        <td>GPIO</td>
    </tr>
    <tr>
        <td>GPIO</td>
        <td>37</td>
        <td>38</td>
        <td>GPIO</td>
    </tr>
    <tr>
        <td>--</td>
        <td>39</td>
        <td>40</td>
        <td>GPIO</td>
    </tr>
</table>

> That gives you several GPIO pins to play with: pins 7, 11, 12, 13, 15, 16, 18 and 22 (with A+ and B+ giving 29, 31, 32, 33, 35, 37, 38 and 40). You should provide these physical pin numbers to this library, and not bother with what they are called internally. Easy-peasy.

## Licence

(The MIT License)

Copyright (c) 2016 James Blanksby james@blanks.by

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
