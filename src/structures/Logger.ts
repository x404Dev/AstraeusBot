export default class Logger {

    public readonly name: string;

    constructor(name: string) {
        this.name = name;
    }


    public log(...msgs: string[]) {
        for (const msg of msgs) {
          console.log(`[${this.name}] ${msg}`);
        }
      }
    
      public warn(...msgs: string[]) {
        for (const msg of msgs) {
          console.warn(`\x1b[33m\x1b[1m[WARN] [${this.name}] ${msg}\x1b[0m`);
        }
      }
    
      public error(...msgs: string[]) {
        for (const msg of msgs) {
          console.error(`\x1b[31m\x1b[1m[FATAL] [${this.name}] ${msg}\x1b[0m`);
        }
      }
}