import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import client from "../../.."
import AstraeusCommand from "../../../structures/AstraeusCommand";
import AstraeusEmbed from "../../../structures/AstraeusEmbed";

export default class XPCommand extends AstraeusCommand {
  constructor() {
    super(
      new SlashCommandBuilder()
        .setName("infos")
        .setDescription("Get infos about the bot.")
    );
  }

  public async execute(interaction: ChatInputCommandInteraction) {
    const infoEmbed = new AstraeusEmbed()
      .setBrandedTitle("Infos")
      .setDescription(
        "AstreausBot is an Open Source bot made by [x404dev](https://github.com/x404Dev) made to be easy for " +
          "everyone to use and modify. It is made with [discord.js](https://discord.js.org/#/) and [TypeScript](https://www.typescriptlang.org/)." +
          " It also supports plugins, so you can add your own commands and events to the bot." +
          " Here is a list of all the libraries used for this bot:"
      )
      .setFields(
        client.packages.map((value, key) => ({
          name: key,
          value: value,
          inline: true,
        }))
      );

    await interaction.reply({ embeds: [infoEmbed] });
  }
}
