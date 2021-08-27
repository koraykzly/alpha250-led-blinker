/// Led Blinker driver
/// (c) Koheron

#ifndef __DRIVERS_LED_BLINKER_HPP__
#define __DRIVERS_LED_BLINKER_HPP__
#include <context.hpp>
#include <iostream>


class LedBlinker
{
  public:
    LedBlinker(Context& ctx)
    : i2c(ctx.i2c.get("i2c-0"))
    {}

    void set_leds(uint8_t value) {
        value = ~value & 0xFF;
        std::array<uint8_t, 2> buff {led_ports, value};
        i2c.write(i2c_address, buff);
    }
    
    void set_led(uint8_t index, bool status) {
        uint8_t leds = get_leds();
        if (status)
            leds = leds | (1 << index);
        else
            leds = leds & (~(1 << index) & 0xFF);
        
        set_leds(leds);
    }

    uint32_t get_leds() {
        std::array<uint8_t, 2> buff {led_ports, 0};
        i2c.read(i2c_address, buff);
        return ~buff[1] & 0xFF;
    }

  private:
    I2cDev& i2c;
    static constexpr uint32_t i2c_address = 0b0100000;
    static constexpr uint32_t led_ports = 0x3;
    
    
};

#endif // __DRIVERS_LED_BLINKER_HPP__
