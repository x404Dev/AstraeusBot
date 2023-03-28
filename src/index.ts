import { GatewayIntentBits } from "discord.js";
import { BotConfig } from "./config/bot";
import BotUtils from "./utils/BotUtils";
import dotenv from "dotenv";
import AstraeusClient from "./structure/AstraeusClient";
dotenv.config();

const client = new AstraeusClient({
    intents: BotUtils.getGatewayIntents(BotConfig.discord.intents),
});

// Load all built-in events
client.loadDefaultEvents();

// Start plugins with the PluginManager
client.pluginsManager.enableAllPlugins(client);

client.login(process.env.DISCORD_TOKEN);