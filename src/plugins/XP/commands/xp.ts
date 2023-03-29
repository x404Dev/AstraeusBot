import { ChatInputCommandInteraction, PermissionsBitField, SlashCommandBuilder } from "discord.js";
import AstraeusCommand from "../../../structures/AstraeusCommand";
import { DiscordRankup } from "discord-rankup";

export default class XPCommand extends AstraeusCommand {
  constructor() {
    super(
      new SlashCommandBuilder()
        .setName("xp")
        .setDescription("Manage the XP system.")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageGuild)
    );
  }

  public async execute(interaction: ChatInputCommandInteraction) {
   
    const xp = await DiscordRankup.fetch(interaction.user.id, interaction.guildId!)

    if(!xp) {
      await DiscordRankup.createMember(interaction.user.id, interaction.guildId!)
      await interaction.reply({ content: `You have 0 xp!` });
      return;
    }

    await interaction.reply({ content: `You have ${xp.XP} xp!` });
    return;
  }
}
