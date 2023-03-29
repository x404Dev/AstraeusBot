import { Client } from 'discord.js';
import { BotConfig } from '../config/bot';

export default {
  name: 'ready',
  once: true,
  execute(client: Client) {
    console.log(`[AstraeusBot] Ready! Logged in as ${client.user?.tag}`);
    //Set Presence from config
    client.user?.setPresence(BotConfig.discord.presence)

  },
};