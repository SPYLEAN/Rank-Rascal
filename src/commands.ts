import {
  ActionRowBuilder,
  AttachmentBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
  type ChatInputCommandInteraction,
} from "discord.js";
import {
  countDistinctQuestPeriods,
  countQuestCompletions,
  getGuildSettings,
  getProfile,
  listEarnedBadges,
  listPublicProfiles,
  listQuestCompletionsForPeriod,
  saveGuildSettings,
  saveProfile,
  setPrivacy,
  unlinkProfile,
} from "./db.js";
import {
  BADGES,
  QUESTS,
  badgeAssetPath,
  evaluateAutomaticBadges,
  getBadgeDefinition,
  recordVerifiedQuest,
  utcPeriodKey,
} from "./badges.js";
import { accountAge, dripVerdict, profileStatus } from "./humor.js";
import { createRobloxAuthorization } from "./oauth.js";
import { findRobloxProfile } from "./roblox.js";

const PURPLE = 0x7a4dff;
const LIME = 0xb7ff36;
const PINK = 0xff4fa3;

export const commandData = [
  new SlashCommandBuilder()
    .setName("link-roblox")
    .setDescription("Securely verify and connect your Roblox identity"),
  new SlashCommandBuilder()
    .setName("preview-roblox")
    .setDescription("Try Rank Rascal using an unverified public Roblox profile")
    .addStringOption((o) => o.setName("username").setDescription("Roblox username").setRequired(true)),
  new SlashCommandBuilder()
    .setName("rotfile")
    .setDescription("Open a player's deeply professional Rascal profile")
    .addUserOption((o) => o.setName("player").setDescription("Player to inspect")),
  new SlashCommandBuilder()
    .setName("dripcheck")
    .setDescription("Send a Roblox avatar to the Drip Department")
    .addUserOption((o) => o.setName("player").setDescription("Player to inspect")),
  new SlashCommandBuilder()
    .setName("fraudcheck")
    .setDescription("Compare two linked Roblox profiles with unnecessary drama")
    .addUserOption((o) => o.setName("opponent").setDescription("Your alleged opponent").setRequired(true)),
  new SlashCommandBuilder().setName("yapping-order").setDescription("View the server's extremely serious ranking"),
  new SlashCommandBuilder()
    .setName("badges")
    .setDescription("Open a player's Rank Rascal badge shelf")
    .addUserOption((o) => o.setName("player").setDescription("Player whose badge shelf you want to inspect")),
  new SlashCommandBuilder()
    .setName("quests")
    .setDescription("View today's verified quests and your badge progress"),
  new SlashCommandBuilder()
    .setName("witness-protection")
    .setDescription("Choose whether your Rotfile appears in public rankings")
    .addBooleanOption((o) => o.setName("public").setDescription("Show public profile").setRequired(true)),
  new SlashCommandBuilder().setName("unlink-roblox").setDescription("Remove your linked Roblox profile"),
  new SlashCommandBuilder()
    .setName("rascal-config")
    .setDescription("Configure Rank Rascal in this server")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addBooleanOption((o) => o.setName("announcements").setDescription("Enable automatic Rot Reports"))
    .addIntegerOption((o) => o.setName("humor-level").setDescription("1 = mild, 2 = chaotic, 3 = fully cooked").setMinValue(1).setMaxValue(3)),
].map((command) => command.toJSON());

function guildId(interaction: ChatInputCommandInteraction): string {
  if (!interaction.guildId) throw new Error("Rank Rascal only works inside a server.");
  return interaction.guildId;
}

async function getVisibleProfile(interaction: ChatInputCommandInteraction, userId: string) {
  const profile = await getProfile(guildId(interaction), userId);
  if (!profile) throw new Error("That player has no Rotfile yet. Use `/link-roblox` first.");
  if (userId !== interaction.user.id && !profile.publicProfile) {
    throw new Error("That Rascal is currently in Witness Protection.");
  }
  return profile;
}

function addUnlockField(embed: EmbedBuilder, names: string[]): void {
  if (names.length === 0) return;
  embed.addFields({
    name: "🏆 Badge unlocked",
    value: names.map((name) => `**${name}**`).join(" · "),
  });
}

export async function handleCommand(interaction: ChatInputCommandInteraction): Promise<void> {
  if (!interaction.inGuild()) throw new Error("Rank Rascal only works inside a server.");

  if (interaction.commandName === "link-roblox") {
    const url = await createRobloxAuthorization(interaction.user.id, guildId(interaction));
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Verify with Roblox").setEmoji("🧪").setURL(url),
    );
    await interaction.reply({
      content: "Roblox will confirm your identity. Rank Rascal never sees your password and discards the OAuth token after verification.",
      components: [row],
      ephemeral: true,
    });
    return;
  }

  if (interaction.commandName === "preview-roblox") {
    await interaction.deferReply({ ephemeral: true });
    const existing = await getProfile(guildId(interaction), interaction.user.id);
    if (existing?.verified) {
      throw new Error("You already have a verified Rotfile. Unlink it before creating a preview for another account.");
    }
    const username = interaction.options.getString("username", true).trim();
    const profile = await findRobloxProfile(username);
    if (!profile) throw new Error("That Roblox username escaped the database. Check the spelling.");
    await saveProfile(guildId(interaction), interaction.user.id, profile);
    await interaction.editReply({
      embeds: [new EmbedBuilder()
        .setColor(LIME)
        .setTitle("🧪 ROTFILE PREVIEW CREATED")
        .setThumbnail(profile.avatarUrl)
        .setDescription(`Connected **${profile.displayName}** (@${profile.username}).`)
        .addFields(
          { name: "Status", value: "⚠️ Unverified username link", inline: true },
          { name: "Next", value: "Run `/rotfile`, or `/link-roblox` to verify", inline: true },
        )
        .setFooter({ text: "Never give Rank Rascal your Roblox password. OAuth verification comes next." })],
    });
    return;
  }

  if (interaction.commandName === "rotfile") {
    const user = interaction.options.getUser("player") ?? interaction.user;
    const profile = await getVisibleProfile(interaction, user.id);
    const progress = user.id === interaction.user.id
      ? await recordVerifiedQuest(guildId(interaction), interaction.user.id, "rotfile_checkin")
      : null;
    const badgeLabel = profile.badgeCount >= 1000 ? `${profile.badgeCount}+` : String(profile.badgeCount);
    const embed = new EmbedBuilder()
      .setColor(PURPLE)
      .setAuthor({ name: `${user.username}'S ROTFILE`, iconURL: user.displayAvatarURL() })
      .setTitle(`${profile.displayName}  ·  @${profile.username}`)
      .setThumbnail(profile.avatarUrl)
      .addFields(
        { name: "Account specimen", value: accountAge(profile.created), inline: false },
        { name: "Badges detected", value: `${badgeLabel} tiny JPEGs`, inline: true },
        { name: "Rascal Rep", value: profile.rascalRep.toLocaleString(), inline: true },
        { name: "Cooked status", value: profileStatus(profile), inline: false },
      )
      .setFooter({ text: profile.verified ? "✅ Verified Roblox identity" : "⚠️ Unverified preview · identity ownership not confirmed" });
    addUnlockField(embed, progress?.newlyAwarded.map((badge) => badge.name) ?? []);
    await interaction.reply({ embeds: [embed] });
    return;
  }

  if (interaction.commandName === "dripcheck") {
    const user = interaction.options.getUser("player") ?? interaction.user;
    const profile = await getVisibleProfile(interaction, user.id);
    const progress = user.id === interaction.user.id
      ? await recordVerifiedQuest(guildId(interaction), interaction.user.id, "self_dripcheck")
      : null;
    const embed = new EmbedBuilder()
      .setColor(PINK)
      .setTitle("🚨 DRIP INSPECTION COMPLETE")
      .setDescription(`## ${dripVerdict(profile)}\nThe department has inspected **${profile.displayName}**. Society may continue.`)
      .setImage(profile.avatarUrl)
      .setFooter({ text: "Scientific accuracy: emotionally verified" });
    addUnlockField(embed, progress?.newlyAwarded.map((badge) => badge.name) ?? []);
    await interaction.reply({ embeds: [embed] });
    return;
  }

  if (interaction.commandName === "fraudcheck") {
    const opponent = interaction.options.getUser("opponent", true);
    if (opponent.id === interaction.user.id) throw new Error("Self-beef detected. Please locate an actual opponent.");
    const own = await getVisibleProfile(interaction, interaction.user.id);
    const theirs = await getVisibleProfile(interaction, opponent.id);
    const difference = Math.abs(own.badgeCount - theirs.badgeCount);
    const winner = own.badgeCount === theirs.badgeCount
      ? "Nobody. An unprecedented draw in tiny JPEG ownership."
      : own.badgeCount > theirs.badgeCount
        ? `${interaction.user} owns ${difference} more badges. Generational incident.`
        : `${opponent} owns ${difference} more badges. The allegations are developing.`;
    const progress = await recordVerifiedQuest(guildId(interaction), interaction.user.id, "friendly_rivalry");
    const embed = new EmbedBuilder()
      .setColor(LIME)
      .setTitle("🕵️ FRAUD CHECK INITIATED")
      .addFields(
        { name: own.displayName, value: `${own.badgeCount} badges`, inline: true },
        { name: "VS", value: "⚔️", inline: true },
        { name: theirs.displayName, value: `${theirs.badgeCount} badges`, inline: true },
        { name: "Highly official verdict", value: winner },
      )
      .setFooter({ text: "Compares public badge counts—not skill, worth, or financial decisions." });
    addUnlockField(embed, progress.newlyAwarded.map((badge) => badge.name));
    await interaction.reply({ embeds: [embed] });
    return;
  }

  if (interaction.commandName === "yapping-order") {
    const profiles = await listPublicProfiles(guildId(interaction));
    const lines = profiles.map((profile, index) =>
      `**${index + 1}. ${profile.displayName}** — ${profile.rascalRep} Rep · ${profile.badgeCount} badges`,
    );
    await interaction.reply({ embeds: [new EmbedBuilder()
      .setColor(PURPLE)
      .setTitle("📜 THE YAPPING ORDER")
      .setDescription(lines.join("\n") || "The leaderboard is empty. History has not begun.")
      .setFooter({ text: "Rascal Rep is social reputation—not an official Roblox skill ranking." })] });
    return;
  }

  if (interaction.commandName === "badges") {
    const user = interaction.options.getUser("player") ?? interaction.user;
    const profile = await getVisibleProfile(interaction, user.id);
    await evaluateAutomaticBadges(profile);
    const earned = new Map((await listEarnedBadges(guildId(interaction), user.id))
      .map((badge) => [badge.badgeId, badge] as const));
    const files = BADGES.map((badge) => new AttachmentBuilder(badgeAssetPath(badge), { name: badge.assetFile }));
    const embeds = BADGES.map((badge) => {
      const award = earned.get(badge.id);
      return new EmbedBuilder()
        .setColor(award ? badge.color : 0x4b506c)
        .setTitle(`${award ? "🏆" : "🔒"} ${badge.name}`)
        .setDescription(badge.description)
        .setThumbnail(`attachment://${badge.assetFile}`)
        .addFields(
          { name: "Criterion", value: badge.criterion },
          {
            name: "Status",
            value: award
              ? `Earned <t:${Math.floor(Date.parse(award.awardedAt) / 1000)}:R>`
              : "Locked",
            inline: true,
          },
        )
        .setFooter({ text: "Rank Rascal badges have no cash value." });
    });
    await interaction.reply({
      content: `## ${profile.displayName}'s badge shelf\n${earned.size}/3 badges collected`,
      embeds,
      files,
      ephemeral: user.id === interaction.user.id,
    });
    return;
  }

  if (interaction.commandName === "quests") {
    const profile = await getProfile(guildId(interaction), interaction.user.id);
    if (!profile?.verified) throw new Error("Verify your Roblox identity before starting badge quests.");
    await evaluateAutomaticBadges(profile);
    const today = utcPeriodKey();
    const completedToday = new Set(await listQuestCompletionsForPeriod(
      guildId(interaction),
      interaction.user.id,
      today,
    ));
    const total = await countQuestCompletions(guildId(interaction), interaction.user.id);
    const dripDays = await countDistinctQuestPeriods(
      guildId(interaction),
      interaction.user.id,
      "self_dripcheck",
    );
    const earnedIds = new Set((await listEarnedBadges(guildId(interaction), interaction.user.id))
      .map((badge) => badge.badgeId));
    const questLines = QUESTS.map((quest) =>
      `${completedToday.has(quest.id) ? "✅" : "⬜"} **${quest.name}** — ${quest.description}`,
    );
    const badgeLines = BADGES.map((badge) => {
      const status = earnedIds.has(badge.id) ? "🏆 Earned" : "🔒 Locked";
      if (badge.id === "quest_crusader") return `${status} **${badge.name}** — ${Math.min(total, 10)}/10 quests`;
      if (badge.id === "drip_monarch") return `${status} **${badge.name}** — ${Math.min(dripDays, 5)}/5 days`;
      return `${status} **${badge.name}** — ${getBadgeDefinition(badge.id).criterion}`;
    });
    await interaction.reply({
      embeds: [new EmbedBuilder()
        .setColor(PURPLE)
        .setTitle("🗺️ TODAY'S VERIFIED QUESTS")
        .setDescription(questLines.join("\n"))
        .addFields(
          { name: "Badge progress", value: badgeLines.join("\n") },
          { name: "Quest rules", value: "Each quest counts once per UTC day. Preview links do not earn progress." },
        )
        .setFooter({ text: "Progress rewards participation—not spending or appearance quality." })],
      ephemeral: true,
    });
    return;
  }

  if (interaction.commandName === "witness-protection") {
    const isPublic = interaction.options.getBoolean("public", true);
    if (!await setPrivacy(guildId(interaction), interaction.user.id, isPublic)) {
      throw new Error("Create a Rotfile before entering Witness Protection.");
    }
    await interaction.reply({
      content: isPublic
        ? "📢 You are public again. The Yapping Order may perceive you."
        : "🕶️ Witness Protection enabled. You are hidden from rankings and other players' commands.",
      ephemeral: true,
    });
    return;
  }

  if (interaction.commandName === "unlink-roblox") {
    const removed = await unlinkProfile(guildId(interaction), interaction.user.id);
    await interaction.reply({
      content: removed ? "🧹 Rotfile deleted. The Rascal remembers nothing." : "No Rotfile was linked.",
      ephemeral: true,
    });
    return;
  }

  if (interaction.commandName === "rascal-config") {
    if (!interaction.memberPermissions?.has(PermissionFlagsBits.ManageGuild)) {
      throw new Error("You need Manage Server permission to operate the Rascal machinery.");
    }
    const settings = await getGuildSettings(guildId(interaction));
    settings.announcementsEnabled = interaction.options.getBoolean("announcements") ?? settings.announcementsEnabled;
    settings.humorLevel = interaction.options.getInteger("humor-level") ?? settings.humorLevel;
    await saveGuildSettings(guildId(interaction), settings);
    await interaction.reply({
      content: `⚙️ Rascal calibrated: announcements **${settings.announcementsEnabled ? "on" : "off"}**, humor level **${settings.humorLevel}/3**.`,
      ephemeral: true,
    });
  }
}
