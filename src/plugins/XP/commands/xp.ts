import { ChatInputCommandInteraction, GuildMember, PermissionsBitField, SlashCommandBuilder } from "discord.js";
import AstraeusCommand from "../../../structures/AstraeusCommand";
import { DiscordRankup, XPCardData } from "discord-rankup";
import { Rank } from "canvacord";
import { XPConfig } from "../../../config/xp";

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

    // await interaction.reply({ content: `You have ${xp.XP} xp!` });

    //create canvacord card

    const rankData: XPCardData = await DiscordRankup.getCardData(interaction.user.id, interaction.guildId!)

    const rank = new Rank()
      .setAvatar(interaction.user.displayAvatarURL())
      .setCurrentXP(rankData.progressXP)
      .setRequiredXP(rankData.progressXP + rankData.missingXP)
      .setUsername(interaction.user.username)
      .setDiscriminator(interaction.user.discriminator)
      .setRank(await DiscordRankup.getRank(interaction.user.id, interaction.guildId!))
      .setLevel(rankData.level)
      .setBackground(XPConfig.card.background.type, XPConfig.card.background.data)
      .setOverlay(XPConfig.card.overlay.color, XPConfig.card.overlay.opacity, XPConfig.card.overlay.display)  
    
    if(XPConfig.card.status?.useCurrent) {
      // rank.setStatus((interaction.member! as GuildMember).presence.status)
    } else {
      rank.setCustomStatusColor(XPConfig.card.status.custom)
    }

    return await interaction.reply({ files: [await rank.build()] })
  }
}
