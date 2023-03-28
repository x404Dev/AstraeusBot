import AstraeusPlugin from "../../structure/AstraeusPlugin";

export default class XPPlugin extends AstraeusPlugin {

    constructor() {
        super("XP", "1.0.0", "A plugin that allows you to gain XP.", "Astraeus", "", "MIT");
    }

    onEnable(): void {
        console.log("[XP] Thanks for using XPPlugin for AstraeusBot!");
    }

}