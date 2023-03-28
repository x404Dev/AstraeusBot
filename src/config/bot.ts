export const BotConfig = {
  discord: {
    // Here is all the possible intents: ['Guilds', 'GuildMembers', 'GuildBans', 'GuildEmojis', 'GuildIntegrations', 'GuildWebhooks', 'GuildInvites', 'GuildVoiceStates', 'GuildPresences', 'GuildMessages', 'GuildMessageReactions', 'GuildMessageTyping', 'DirectMessages', 'DirectMessageReactions', 'DirectMessageTyping']
    intents: ["Guilds", "GuildMembers", "GuildMessages"],
    // status can be: "online", "idle", "dnd", "invisible", type can be: "PLAYING", "STREAMING", "WATCHING"
    presence: { status: "dnd", activity: { name: "Astraeus Dev", type: "PLAYING" }}
  },
};
