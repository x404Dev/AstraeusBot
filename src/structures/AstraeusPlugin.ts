import path from "path";
import fs from "fs";
import AstraeusClient from "./AstraeusClient";
import Logger from "./Logger";

export default class AstraeusPlugin extends Logger {
  public readonly name: string;
  public readonly version: string;
  public readonly description: string;
  public readonly author: string;
  public readonly website: string;
  public readonly license: string;
  public active: boolean;
  public client?: AstraeusClient;

  constructor(
    name: string,
    version: string,
    description: string,
    author: string,
    website: string,
    license: string
  ) {
    super(name);
    this.name = name;
    this.version = version;
    this.description = description;
    this.author = author;
    this.website = website;
    this.license = license;
    this.active = false;
  }

  public setEnabled(enabled: boolean): void {
    if (!this.client)
      throw new Error(
        "Client is not defined! Be sure that the plugin is properly initiated before doing anything with it!"
      );
    if (enabled === this.active) return;
    if (enabled) {
      this.onEnable();
      this.registerEvents(this.client);
    } else {
      this.onDisable();
      this.unregisterEvents(this.client);
    }
    this.active = enabled;
  }

  public init(client: AstraeusClient): void {
    this.client = client;
    this.setEnabled(true);
  }

  /**
   * Called when the plugin is enabled.
   */
  onEnable(): void {}

  /**
   * Called when the plugin is disabled.
   */
  onDisable(): void {}

  async registerEvents(client: AstraeusClient): Promise<void> {
    //get all events in ./events/ in plugin folder
    const eventsPath = path.join(__dirname, "../plugins", this.name, "events");
    const eventFiles = fs
      .readdirSync(eventsPath)
      .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

    for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file);
      const event = await import(filePath);

      if (event.once) {
        console.log(`[${this.name}] Registering event ${event.name}...`);
        client.once(event.name, (...args: any[]) => event.execute(...args));
      } else {
        client.on(event.name, (...args: any[]) => event.execute(...args));
      }
    }
  }

  async unregisterEvents(client: AstraeusClient): Promise<void> {
    //get all events in ./events/ in plugin folder
    const eventsPath = path.join(__dirname, "../events");
    const eventFiles = fs
      .readdirSync(eventsPath)
      .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

    for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file);
      const event = await import(filePath);
      client.off(event.name, (...args: any[]) => event.execute(...args));
    }
  }
}
