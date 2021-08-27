#!/usr/bin/env python
# -*- coding: utf-8 -*-

from koheron import command, connect
import os, time

class LedBlinker(object):
    def __init__(self, client):
        self.client = client

    @command()
    def set_leds(self, led_value):
        pass

    @command()
    def get_leds(self):
        return self.client.recv_uint32()
    
    @command()
    def set_led(self, index, status):
        pass

host = os.getenv('HOST','192.168.1.2')
client = connect(host, name='alpha250-led-blinker')
driver = LedBlinker(client)

pattern = [
    0b00000000, 0b00000001, 0b00000010, 0b00000100, 0b00001000, 0b00010000,
    0b00100000, 0b01000000, 0b10000000, 0b01000000, 0b00100000, 0b00010000,
    0b00001000, 0b00000100, 0b00000010, 0b00000001, 0b00000000, 0b10000001,
    0b11000011, 0b11100111, 0b11111111, 0b01111110, 0b00111100, 0b00011000,
    0b00000000, 0b00011000, 0b00111100, 0b01111110, 0b11111111, 0b11100111,
    0b11000011, 0b10000001, 0b00000000, 0b10101010, 0b01010101, 0b10101010,
    0b01010101, 0b10101010, 0b01010101, 0b00000000
]

def party_mode(pattern):
    for i in pattern:
        driver.set_leds(i)
        time.sleep(0.2)

#party_mode(pattern)
