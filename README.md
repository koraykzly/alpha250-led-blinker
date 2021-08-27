# Koheron Alpha250 - Led Blinker

This is a simple led blinker program for Koheron Alpha250 board. 
You can find more information from

- [Alpha250](https://www.koheron.com/fpga/alpha250-signal-acquisition-generation)
- [Koheron Software Development Kit](https://github.com/Koheron/koheron-sdk)


## Description

Alpha250 has 8 user LEDs and these can be controlled by [gpio expander](https://github.com/Koheron/koheron-sdk/blob/master/boards/alpha250/drivers/gpio-expander.hpp). I2C bus address of gpio expander is 0b01000000, LEDs are connected to output port 1. This program basically writes and reads this address via C++ driver and is managed by a simple web interface and Python.

This example very similar to [example/red-pitaya/led-blinker](https://github.com/Koheron/koheron-sdk/tree/master/examples/red-pitaya/led-blinker) in koheron-sdk.


## How to run

1. Setup [koheron-sdk](https://github.com/Koheron/koheron-sdk#getting-started), if you haven't.
2. Open a folder named **instruments** in sdk and clone the repository inside.
3. Run the command from sdk with IP address you use for the board.

    ```bash
    $ make CONFIG=instruments/alpha250-led-blinker/config.yml HOST=192.168.1.2 run
    ```
