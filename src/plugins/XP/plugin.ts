import AstraeusPlugin from "../../structures/AstraeusPlugin";
import { DiscordRankup } from "discord-rankup";
import client from "../../index";
import Logger from "@structures/Logger";

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
        () => this.log("Connected to MongoDB!")
    );
  }

  onEnable(): void {
    this.log("Thanks for using XPPlugin for AstraeusBot!");
    this.client?.packages.set(
      "[XP] discord-rankup",
      "https://www.npmjs.com/package/discord-rankup"
    );
    this.client?.packages.set("[XP] canvacord", "https://canvacord.js.org/");
  }

  onDisable(): void {
    this.client?.packages.delete("[XP] discord-rankup");
  }

}
