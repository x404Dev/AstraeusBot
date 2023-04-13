import { ChatInputCommandInteraction } from "discord.js";
import client from "../index";

export default class CommandsUtils {

    public static async operatorMiddleware(interaction: ChatInputCommandInteraction, operator: string): Promise<boolean> {
        if (!client.isOperator(operator)) {
            interaction.reply({ content: "You are not allowed to use this command!", ephemeral: true });
            return false;
        }
        return true;
    }

}