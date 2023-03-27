export const BotConfig = {
    discord: {
        token: "",
        // https://discord.com/developers/docs/topics/gateway#gateway-intents and https://discordjs.guide/popular-topics/intents.html#privileged-intents for more infos.
        intents: [
            "Guilds",
            "GuildMembers",
            "GuildMessages"
        ]
    }
};