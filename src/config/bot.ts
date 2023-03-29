import { Embed, PresenceStatusData } from "discord.js";

export const BotConfig = {
  checkForUpdates: true,
  discord: {
    // Here is all the possible intents: ['Guilds', 'GuildMembers', 'GuildBans', 'GuildEmojis', 'GuildIntegrations', 'GuildWebhooks', 'GuildInvites', 'GuildVoiceStates', 'GuildPresences', 'GuildMessages', 'GuildMessageReactions', 'GuildMessageTyping', 'DirectMessages', 'DirectMessageReactions', 'DirectMessageTyping']
    intents: ["Guilds", "GuildMembers", "GuildMessages"],
    // status can be: "online", "idle", "dnd", "invisible", type can be: "PLAYING", "STREAMING", "WATCHING"
    presence: { activities: [{ name: '🚀 Meow' }], status: 'online' as PresenceStatusData },

    embed: {
      title: "AstraeusBot",
      color: "#2C3E50",
      footer_text: "AstraeusBot",
    }
  },
};
