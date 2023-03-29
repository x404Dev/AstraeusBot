import { BotConfig } from "./config/bot";
import BotUtils from "./utils/BotUtils";
import dotenv from "dotenv";
import AstraeusClient from "./structures/AstraeusClient";
dotenv.config();

const client = new AstraeusClient({
    intents: BotUtils.getGatewayIntents(BotConfig.discord.intents),
});

// Load all built-in events
client.loadDefaultEvents();

// Start plugins with the PluginManager
client.pluginsManager.enableAllPlugins();

// Load all commands

client.commandsManager.registerCommands();

client.login(process.env.DISCORD_TOKEN);

export default client;

