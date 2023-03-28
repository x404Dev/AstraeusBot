import fs from "fs";
import path from "path";
import AstraeusClient from "src/structure/AstraeusClient";
import AstraeusPlugin from "src/structure/AstraeusPlugin";

const { EnablePlugins } = require("../config/plugins");

export default class PluginManager {

    public plugins: AstraeusPlugin[] = [];

    public client: AstraeusClient;

    constructor(client: AstraeusClient) {
        this.client = client;
    }

    public disabledPlugins: string[] = [];

    public pluginDir = path.join(__dirname, "../plugins");

    enableAllPlugins(client: AstraeusClient): void {
        //Enable all plugins in /plugins/(name)/ in config/plugins.ts
        EnablePlugins.forEach((pluginName: string) => {
            console.log(`[${pluginName}] Enabling plugin...`);
            const pluginPath = path.join(this.pluginDir, pluginName, "plugin.ts");
            if (!fs.existsSync(pluginPath)) {
                throw new Error(`Plugin ${pluginName} does not exist!`);
            }
            try {
                const pluginFile = require(pluginPath).default;
                const plugin = new pluginFile();
                this.plugins.push(plugin);
                plugin.init(client);
                console.log(`[${pluginName}] Plugin enabled using version ${plugin.version}!`)
            } catch (error) {
                this.disabledPlugins.push(pluginName);
                console.error(`[${pluginName}] Error while enabling the plugin! ${error}`);
            }
        });
    }

}