import fs from "fs";
import { Collection, CommandInteraction, REST, Routes } from "discord.js";
import AstraeusClient from "structures/AstraeusClient";
import AstraeusCommand from "structures/AstraeusCommand";
import path from "path";

export default class CommandsManager {
  private readonly _client: AstraeusClient;
  private readonly commands: Collection<string, any>;

  constructor(client: AstraeusClient) {
    this._client = client;
    this.commands = new Collection<string, AstraeusCommand>();
  }

  public async registerCommands(): Promise<void> {
    // Register pre-built commands
    const commandsPath = path.join(__dirname, "../commands");
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js") || file.endsWith(".ts"));
    for (const file of commandFiles) {
      const cmdDir = path.join(commandsPath, file);
      const command = new (require(cmdDir).default);
      this.commands.set(command.slashCommand.name, command);
    }

    // Register plugin commands
    const pluginsPath = path.join(__dirname, "../plugins");
    const pluginFolders = fs
      .readdirSync(pluginsPath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    for (const pluginFolder of pluginFolders) {
      const pluginPath = path.join(pluginsPath, pluginFolder, "commands");
      if (!fs.existsSync(pluginPath)) {
        continue;
      }
      const pluginCommandFiles = fs
        .readdirSync(pluginPath)
        .filter((file) => file.endsWith(".js") || file.endsWith(".ts"));

      for (const file of pluginCommandFiles) {
        const command = new (require(`../plugins/${pluginFolder}/commands/${file}`).default);

        this.commands.set(command.slashCommand.name, command);
      }
    }

    const rest = new REST({ version: "10" }).setToken(this._client.token!);

    try {
      console.log("[AstraeusBot] Started refreshing application (/) commands.");

      const guildCommands = this.commands.filter((command) => command.guildID);
      // Register guild commands
      if (guildCommands.size > 0) {
        const guildCommandsData = rest.put(
          Routes.applicationGuildCommands(
            this._client.user!.id,
            guildCommands.first()!.guildID
          ),
          { body: guildCommands.map((command) => command.toJSON()) }
        );
      }

      console.log(`[AstraeusBot] Added ${guildCommands.size} guild commands.`);

      const globalCommands: Collection<string, AstraeusCommand> =
        this.commands.filter((command) => !command.guildID);
      // Register global commands
      if (globalCommands.size > 0) {
        const globalCommandsData = rest.put(
          Routes.applicationCommands(process.env.DISCORD_APP_ID!),
          { body: globalCommands.map((command) => command.toJSON()) }
        );
      }

      console.log(
        `[AstraeusBot] Added ${globalCommands.size} global commands.`
      );

      console.log(
        "[AstraeusBot] Successfully reloaded application (/) commands."
      );
    } catch (error) {
      console.error(error);
    }
  }

  public addCommand(command: any): void {
    this.commands.set(command.name, command);
  }

  public removeCommand(commandName: string): void {
    this.commands.delete(commandName);
  }

  public executeCommand(interaction: CommandInteraction) {
    const command = this.commands.get(interaction.commandName);
    if (!command)
      return interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    try {
      command.execute(interaction);
    } catch (error) {
      console.error(error);
      interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
}
