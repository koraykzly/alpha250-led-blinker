class App {
    private driver:  LedBlinker;
    private control: LedBlinkerControl;

    constructor(window: Window, document: Document, ip: string) {
        let client = new Client(ip, 5);

        client.init( () => {
            this.driver = new LedBlinker(client);
            this.control = new LedBlinkerControl(document, this.driver);
            console.log('client initialized.')
        });

        window.onbeforeunload = () => { client.exit(); };
    }
}


let app = new App(window, document, location.hostname);

