import {
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import AstraeusEmbed from "../structures/AstraeusEmbed";
import AstraeusCommand from "../structures/AstraeusCommand";
import client from "../index";
import CommandsUtils from "../utils/CommandUtils";

export default class PluginsCommand extends AstraeusCommand {
  constructor() {
    super(
      new SlashCommandBuilder()
        .setName("plugins")
        .setDescription("Get infos and manage the plugins")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false)
        .addSubcommand((subcommand) =>
          subcommand.setName("list").setDescription("List all enabled plugins")
        )
    );
  }

  public async execute(interaction: ChatInputCommandInteraction) {
    if (
      !(await CommandsUtils.operatorMiddleware(
        interaction,
        interaction.user.id
      ))
    )
      return;
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case "list":
        const infoEmbed = new AstraeusEmbed()
          .setBrandedTitle("Plugins Manager")
          .setDescription("Here is a list of all enabled plugins:")
          .setFields(
            client.pluginsManager.plugins.map((value) => ({
              name: value.name,
              value: `Version: ${value.version}`,
              inline: true,
            }))
          );

        await interaction.reply({ embeds: [infoEmbed] });
        break;
    }
  }
}
