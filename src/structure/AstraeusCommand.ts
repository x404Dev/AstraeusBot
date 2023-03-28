import { CommandInteraction, RESTPostAPIChatInputApplicationCommandsJSONBody, SlashCommandBuilder } from "discord.js";

export default class AstraeusCommand {

    public guilds?: string[];
    public slashCommand: SlashCommandBuilder;

    constructor(command: SlashCommandBuilder) {
        this.slashCommand = command;
    }

    public execute(interaction: CommandInteraction): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public toJSON(): RESTPostAPIChatInputApplicationCommandsJSONBody {
        return this.slashCommand.toJSON();
    }

}