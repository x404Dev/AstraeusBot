import AstraeusPlugin from "../../structures/AstraeusPlugin";
import { DiscordRankup } from "discord-rankup";
import client from "../../index";

export default class XPPlugin extends AstraeusPlugin {


  constructor() {
    super(
      "XP",
      "1.0.0",
      "A plugin that allows you to gain XP.",
      "Astraeus",
      "",
      "MIT"
    );
    DiscordRankup.init(process.env.MONGO_URL!, client).then(
        () => console.log("[XP] Connected to MongoDB!")
    );
  }

  onEnable(): void {
    console.log("[XP] Thanks for using XPPlugin for AstraeusBot!");
    this.client?.packages.set(
      "[XP] discord-rankup",
      "https://www.npmjs.com/package/discord-rankup"
    );
  }

  onDisable(): void {
    this.client?.packages.delete("[XP] discord-rankup");
  }

}
