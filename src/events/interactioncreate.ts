import { BaseInteraction, CommandInteraction } from 'discord.js';
import AstraeusClient from 'structures/AstraeusClient';

export default {
  name: 'interactionCreate',
  once: false,
  execute(client: AstraeusClient, interaction: BaseInteraction) {
    if(interaction.isCommand()) {
      client.commandsManager.executeCommand(interaction as CommandInteraction);
    }
  },
};