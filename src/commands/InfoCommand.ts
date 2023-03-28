import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import AstraeusCommand from "../structure/AstraeusCommand";

export default class InfoCommand extends AstraeusCommand {

    constructor() {
        console.log("InfoCommand")
        super(new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!"));
    }

    public async execute(interaction: CommandInteraction) {
        await interaction.reply("Pong!");
    }

}
