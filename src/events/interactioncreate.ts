import { BaseInteraction } from 'discord.js';
import AstraeusClient from 'src/structure/AstraeusClient';

export default {
  name: 'interactionCreate',
  once: false,
  execute(client: AstraeusClient, interaction: BaseInteraction) {
    if(interaction.isCommand()) {
      console.log(interaction.commandName);
      client.commandsManager.executeCommand(interaction);
    }
  },
};