import { GatewayIntentBits } from "discord.js";

export default class BotUtils {

    public static getGatewayIntents(intents: string[]): GatewayIntentBits[] {
        return intents.map((intent) => {
            return GatewayIntentBits[intent as keyof typeof GatewayIntentBits];
          });
    }
}