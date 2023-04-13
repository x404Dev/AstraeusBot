import { Client, ClientOptions, Collection } from "discord.js";
import PluginManager from "../managers/PluginManager";
import path, { parse } from "path";
import fs from "fs";
import CommandsManager from "../managers/CommandsManager";
import { BotConfig } from "../config/bot";
import axios from "axios";
// import fetch from "node-fetch";

export default class AstraeusClient extends Client {
  public readonly pluginsManager: PluginManager = new PluginManager(this);
  public readonly commandsManager: CommandsManager = new CommandsManager(this);
  private readonly operators: string[] = [];
  public readonly packages: Collection<string, string> = new Collection<
    string,
    string
  >();

  constructor(options: ClientOptions) {
    super(options);
    if (BotConfig.checkForUpdates) this.checkForUpdates();
    this.packages.set(`discord.js`, "https://discord.js.org/");
    this.packages.set("typescript", "https://www.typescriptlang.org/");
    if(process.env.BOT_OWNER_ID) this.operators.push(process.env.BOT_OWNER_ID);
  }

  public loadDefaultEvents(): void {
    const eventsPath = path.join(__dirname, "../events");
    const eventFiles = fs
      .readdirSync(eventsPath)
      .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

    for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file);
      import(filePath).then((eventModule) => {
        const event = eventModule.default;

        if (event.once) {
          this.once(event.name, (...args: any[]) =>
            event.execute(this, ...args)
          );
        } else {
          this.on(event.name, (...args: any[]) => event.execute(this, ...args));
        }
      });
    }
  }

  async checkForUpdates(): Promise<void> {
    //Check in github repo if theres a tag with a bigger version than the current one
    // https://github.com/x404Dev/AstraeusBot

    const url = "https://api.github.com/repos/x404Dev/AstraeusBot/tags";

    try {
      const response = await axios.get(url);
      const data = response.data;
      const latestVersion = data[0].name;
      const currentVersion = this._getVersion().version;

      if (
        parseInt(currentVersion.replace(".", "")) <
        parseInt(latestVersion.replace(".", ""))
      ) {
        const line = "+----------------------------------------------------+";
        console.log(`
${line}
|   There is a new version of Astraeus available!    |
|                                                    |
|   Current version: ${currentVersion}                           |
|   Latest version: ${latestVersion}                            |
|                                                    |
|   Download it here:                                |
|   https://github.com/x404Dev/AstraeusBot/releases  |
${line}
`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  private _getVersion() {
    const pkgPath = path.join(__dirname, "../../package.json");
    return JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  }

  public isOperator(id: string): boolean {
    return this.operators.includes(id);
  }
}
