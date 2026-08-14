import { Client, Events, GatewayIntentBits } from "discord.js";
import { handleCommand } from "./commands.js";
import { config } from "./config.js";
import { closeDatabase, initializeDatabase } from "./db.js";
import { startProfileRefreshJob } from "./jobs.js";
import { startWebServer } from "./web.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Rank Rascal is yapping as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  try {
    await handleCommand(interaction);
  } catch (error) {
    const message = error instanceof Error ? error.message : "The Rascal fell down the stairs internally.";
    const payload = { content: `⚠️ ${message}`, ephemeral: true } as const;
    if (interaction.deferred || interaction.replied) await interaction.editReply(payload);
    else await interaction.reply(payload);
  }
});

process.on("unhandledRejection", (error) => console.error("Unhandled rejection", error));

const databaseEngine = await initializeDatabase();
console.log(`Rank Rascal database ready (${databaseEngine}).`);
const webServer = startWebServer();
const refreshTimer = startProfileRefreshJob();

let stopping = false;
async function shutdown(signal: string): Promise<void> {
  if (stopping) return;
  stopping = true;
  console.log(`Received ${signal}; shutting down cleanly.`);
  clearInterval(refreshTimer);
  client.destroy();
  await new Promise<void>((resolve) => webServer.close(() => resolve()));
  await closeDatabase();
}

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.once(signal, () => {
    void shutdown(signal).finally(() => process.exit(0));
  });
}

await client.login(config.discordToken());
