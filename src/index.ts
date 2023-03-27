import { Client, GatewayIntentBits } from "discord.js";
import { BotConfig } from "./config/bot";
import BotUtils from "./utils/BotUtils";

const client = new Client({
    intents: BotUtils.getGatewayIntents(BotConfig.discord.intents),
});

client.login("")