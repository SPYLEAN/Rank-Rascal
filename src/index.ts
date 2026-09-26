import { Client, Events, GatewayIntentBits } from "discord.js";
import { handleCommand } from "./commands.js";
import { config } from "./config.js";
import { closeDatabase, initializeDatabase } from "./db.js";
import { userFacingMessage } from "./errors.js";
import { startProfileRefreshJob } from "./jobs.js";
import { checkCommandRate, rateLimitMessage } from "./ratelimit.js";
import { startWebServer } from "./web.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Rank Rascal is yapping as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const respond = async (message: string) => {
    const payload = { content: `⚠️ ${message}`, ephemeral: true } as const;
    try {
      if (interaction.deferred || interaction.replied) await interaction.editReply(payload);
      else await interaction.reply(payload);
    } catch (replyError) {
      console.error("Could not send error reply", replyError instanceof Error ? replyError.name : "unknown");
    }
  };
  const rate = checkCommandRate(interaction.user.id, interaction.commandName);
  if (!rate.allowed) {
    await respond(rateLimitMessage(rate.retryAfterMs));
    return;
  }
  try {
    await handleCommand(interaction);
  } catch (error) {
    // Only UserError messages are shown to members; everything else is logged and hidden.
    const message = userFacingMessage(error);
    if (error instanceof Error && error.name !== "UserError") {
      console.error(`Command /${interaction.commandName} failed`, error);
    }
    await respond(message);
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
