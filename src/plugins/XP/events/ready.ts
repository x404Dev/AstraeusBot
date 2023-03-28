import { Client } from 'discord.js';

export default {
  name: 'ready',
  once: true,
  execute(client: Client) {
    console.log(`Plugin Event works!`);
  },
};