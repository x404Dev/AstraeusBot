import { Client, ClientOptions } from "discord.js";
import PluginManager from "../managers/PluginManager";
import path from "path";
import fs from "fs";

export default class AstraeusClient extends Client {
  public pluginsManager: PluginManager = new PluginManager(this);

  constructor(options: ClientOptions) {
    super(options);
  }

  public loadDefaultEvents(): void {
    const eventsPath = path.join(__dirname, "../events");
    const eventFiles = fs
      .readdirSync(eventsPath)
      .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

    for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file);
      const event = require(filePath).default;

      if (event.once) {
        this.once(event.name, (...args: any[]) => event.execute(...args));
      } else {
        this.on(event.name, (...args: any[]) => event.execute(...args));
      }
    }
  }
}
