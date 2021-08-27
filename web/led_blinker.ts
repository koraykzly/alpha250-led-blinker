class LedBlinker {
    private driver: Driver;
    private id: number;
    private cmds: HashTable<ICommand>;

    constructor (private client: Client) {
        this.driver = this.client.getDriver('LedBlinker');
        this.id = this.driver.id;
        this.cmds = this.driver.getCmds();
    }

    setLeds(value: number): void {
        this.client.send(Command(this.id, this.cmds['set_leds'], value));
    }
    
    setLed(index: number, status: boolean): void {
        this.client.send(Command(this.id, this.cmds['set_led'], index, status));
    }
        
    getLeds(cb: (value: number) => void): void {
        this.client.readUint32(Command(this.id, this.cmds['get_leds']), (value) => {cb(value)} ) ;
    }
}

class LedBlinkerControl {
    private led_btns: HTMLElement[];
    private led_status: boolean[];
    private int_input: HTMLInputElement;
    private set_led_btn: HTMLElement;
    private status_info: HTMLElement;
    
    constructor (private document: Document, private driver: LedBlinker) {
        this.init();
        this.update();
    }
    
    init(): void {
        this.led_btns = new Array(8);
        this.led_status = new Array(8);
        for(let i=0; i<8; i++) {
            this.led_btns[i] = document.getElementById('led-btn'+i);
            this.led_btns[i].onclick = () => {
                this.driver.setLed(i, !this.led_status[i]);
                this.update();
            }
        }
        this.int_input = (<HTMLInputElement>document.getElementById('int-input'));
        this.set_led_btn = document.getElementById('set-led-btn');
        this.set_led_btn.onclick = () => {
            
            var value = +this.int_input.value;
            if(isNaN(value)) {
                this.int_input.value = '';
                return;
            }
            
            if(value > 255) value = 255;
            if(value < 0)   value = 0;
                
            this.driver.setLeds(value);
            console.log('Set Leds:', value);
            this.update();
        }
        this.status_info = document.getElementById('status-info');
    }
    
    update(): void {
        this.driver.getLeds( (value) => {
            var bin = value.toString(2).padStart(8, '0');
            for(let i=0; i<8; i++) {
                if(+bin.charAt(i)) {
                    this.led_btns[7-i].style.backgroundColor = '#ff5555';
                    this.led_status[7-i] = true;
                } else {
                    this.led_btns[7-i].style.backgroundColor = '#dddddd';
                    this.led_status[7-i] = false;
                }
            }
            this.status_info.innerHTML = value + " - 0b" + bin;
        });
    }

}
