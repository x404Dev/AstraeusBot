import AstraeusClient from "@structures/AstraeusClient";
import AstraeusPlugin from "@structures/AstraeusPlugin";
import fs from "fs";
import path from "path";
import EnablePlugins from "../config/plugins";

export default class PluginManager {
  public readonly plugins: AstraeusPlugin[] = [];

  private readonly _client: AstraeusClient;

  constructor(client: AstraeusClient) {
    this._client = client;
  }

  public disabledPlugins: string[] = [];

  public pluginDir = path.join(__dirname, "../plugins");

  enableAllPlugins(): void {
    //Enable all plugins in /plugins/(name)/ in config/plugins.ts
    EnablePlugins.forEach((pluginName: string) => {
        this.enablePlugin(pluginName);
    });
  }

  enablePlugin(pluginName: string): void {
    console.log(`[${pluginName}] Enabling plugin...`);
    const pluginPath = path.join(this.pluginDir, pluginName, "plugin.ts");
    if (!fs.existsSync(pluginPath)) {
      throw new Error(`Plugin ${pluginName} does not exist!`);
    }
    try {
      const pluginFile = require(pluginPath).default;
      const plugin = new pluginFile();
      this.plugins.push(plugin);
      plugin.init(this._client);
      console.log(
        `[${pluginName}] Plugin enabled using version ${plugin.version}!`
      );
    } catch (error) {
      this.disabledPlugins.push(pluginName);
      console.error(
        `[${pluginName}] Error while enabling the plugin! ${error}`
      );
    }
  }
}
