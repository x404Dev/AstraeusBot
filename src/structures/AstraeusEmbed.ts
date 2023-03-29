import { EmbedBuilder } from "discord.js";
import { BotConfig } from "../config/bot";
import client from '..'

export default class AstraeusEmbed extends EmbedBuilder {

    constructor() {
        super();
        this.setFooter({
          text: BotConfig.discord.embed.footer_text,
          iconURL: client.user?.displayAvatarURL()
        });
        //Convert hex to ColorResolvable
        this.setColor(parseInt(BotConfig.discord.embed.color.replace("#", ""), 16));
      }

  public setBrandedTitle(title: string): this {
    return this.setTitle(`${BotConfig.discord.embed.title} | ${title}`);
  }
}

