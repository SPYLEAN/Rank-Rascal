import { REST, Routes } from "discord.js";
import { commandData } from "./commands.js";
import { config } from "./config.js";

const rest = new REST({ version: "10" }).setToken(config.discordToken());
const route = config.discordGuildId
  ? Routes.applicationGuildCommands(config.discordClientId(), config.discordGuildId)
  : Routes.applicationCommands(config.discordClientId());

await rest.put(route, { body: commandData });
console.log(`Registered ${commandData.length} Rank Rascal commands${config.discordGuildId ? " in the test server" : " globally"}.`);
