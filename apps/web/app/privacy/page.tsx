import type { Metadata } from "next";
import Link from "next/link";
import { SimplePage } from "@/components/SimplePage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Rascal Labs collects, uses, stores and deletes information for the Rascal Realms website and the paused Rank Rascal bot.",
};

// Version 1.3 (2026-09-29): Founding QA candidate pool wording and the local-only Ask Razz section.
export default function PrivacyPage() {
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;
  const hasSupportEmail = Boolean(process.env.NEXT_PUBLIC_SUPPORT_EMAIL);

  return (
    <SimplePage kicker="Privacy & data protection policy" title="Rank Rascal Privacy Policy" meta="Effective Date: September 29, 2026 | Version 1.3">
      {!hasSupportEmail && (
        <p className="doc-note">
          <strong>Support mailbox not open yet.</strong> Use the <Link href="/support">project support page</Link> for the current privacy-request path.
        </p>
      )}

      <h2>1. Information We Collect</h2>
      <p>Rank Rascal collects the minimum information needed to operate the game website, review community submissions and preserve the paused Discord bot project:</p>
      <ul>
        <li><strong>Discord Account Data:</strong> Your Discord User ID, Guild (Server) ID, and channel context.</li>
        <li><strong>Roblox Identity Data:</strong> Verified Roblox User ID, Roblox username, display name, account creation timestamp, public avatar thumbnail URL, public badge count, and public profile visibility setting.</li>
        <li><strong>Rank Rascal Calculated Data:</strong> Rascal Rep score, Rotfile achievements, and server-specific preferences.</li>
        <li><strong>OAuth Processing Data:</strong> Short-lived, state-hashed authorization verifiers during PKCE verification.</li>
        <li><strong>Community Submissions:</strong> Display name, email address, review rating and focus, feedback text, Guild track, portfolio link, availability, time zone, consent choices and submission time when you use the website forms.</li>
        <li><strong>QA Recognition Data:</strong> A generated submission ID and the name printed on your personalized digital badge and certificate.</li>
      </ul>

      <h2>2. Token Retention Policy</h2>
      <p>
        We prioritize zero-token retention. After verifying your Roblox identity through PKCE OAuth 2.0, short-lived authorization tokens and access tokens are <strong>immediately discarded</strong>. We do <strong>not</strong> retain or store your Roblox OAuth access tokens, refresh tokens, or passwords.
      </p>

      <h2>3. Purpose of Processing</h2>
      <p>Collected data is processed strictly for:</p>
      <ul>
        <li>Reviewing game feedback and responding when contact information is provided</li>
        <li>Adding reviewers to the Founding QA candidate pool and sending their personalized badge and certificate. Joining the candidate pool does not guarantee testing access, an invitation, employment or compensation.</li>
        <li>Evaluating voluntary Founders Guild and future playtesting participation</li>
        <li>Moderating comments before any approved quotation is published</li>
        <li>Preserving legacy bot privacy controls and account links while the bot project is paused</li>
      </ul>

      <h2>4. Community Submission Storage</h2>
      <p>
        Website submissions and confirmation emails are processed through our transactional email provider and delivered to a private Rank Rascal team mailbox. A private Discord webhook may also provide a moderator-only notification copy. Submissions are not published automatically. We retain them only as long as needed for review, Founding QA candidate pool administration, follow-up, moderation records or team selection. Do not submit passwords, precise addresses, private Roblox account data, payment information or other sensitive personal information.
      </p>

      <h2>5. Ask Razz</h2>
      <p>
        Ask Razz answers questions inside your browser from a fixed set of answers written by the Rascal Labs team (the Crownfall canon). Questions you type into Ask Razz, including quick questions and follow-ups, are processed locally on your device. They are not sent to our servers, are not stored by the website, and are not sent to Anthropic, OpenAI or any other AI provider. Ask Razz may remember one optional preference, whether Razz may interrupt, in your browser&apos;s local storage. Please do not type personal information into Ask Razz.
      </p>

      <h2>6. Deletion &amp; Legacy Bot Data</h2>
      <p>
        The Discord bot project is paused, but previously collected bot data remains subject to deletion. If the bot is available, <code>/unlink-roblox</code> purges the stored Roblox account link and associated profile data. You may also request deletion of bot or community-submission data through the support path listed below.
      </p>

      <h2>7. Public Profile Visibility &amp; Comment Permission</h2>
      <p>
        Legacy bot profiles retain their existing privacy setting while the bot is paused. Community comments are private by default. Checking the public-quotation box gives the team permission to quote that submission with the supplied display name, but does not guarantee publication. A human reviews every quotation first.
      </p>

      <h2>8. Age Requirement</h2>
      <p>Rank Rascal and its community forms are intended for users aged 13 and older. We do not knowingly collect data from children under 13.</p>

      <h2>9. Security Controls &amp; Third-Party Platforms</h2>
      <p>
        Rank Rascal uses HTTPS encrypted transport, input validation, rate controls and restricted server-side credentials. Transactional email is delivered through Resend; Discord may be used for private moderator notifications. Those providers process the minimum delivery data required for the service.
      </p>
      <p className="doc-note">
        <strong>Platform Disclaimer:</strong> Rank Rascal is an independent product and is not affiliated with, endorsed by or sponsored by Discord, Roblox, Epic Games or Riot Games.
      </p>

      <h2>10. User Rights &amp; Contact Information</h2>
      <p>For privacy inquiries, manual data export, or deletion requests, contact our privacy team:</p>
      <p>Email: {supportEmail ? <a href={`mailto:${supportEmail}`}>{supportEmail}</a> : "not available yet"}</p>
    </SimplePage>
  );
}
