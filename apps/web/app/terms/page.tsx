import type { Metadata } from "next";
import Link from "next/link";
import { SimplePage } from "@/components/SimplePage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for using the Rascal Realms website, community forms and the paused Rank Rascal bot.",
};

// Terms wording is unchanged; only the presentation moved to the shared SimplePage layout.
export default function TermsPage() {
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;
  const hasSupportEmail = Boolean(process.env.NEXT_PUBLIC_SUPPORT_EMAIL);

  return (
    <SimplePage kicker="Terms of service agreement" title="Rank Rascal Terms of Service" meta="Effective Date: September 27, 2026 | Version 1.2">
      {!hasSupportEmail && (
        <p className="doc-note">
          <strong>Support mailbox not open yet.</strong> Use the <Link href="/support">project support page</Link> for the current contact path.
        </p>
      )}

      <h2>The Rascal Rules summary</h2>
      <ul>
        <li>Explore and critique without bullying</li>
        <li>Share ideas, not sensitive information</li>
        <li>No impersonation, exploits or cheating</li>
        <li>Label speculation and unconfirmed concepts</li>
        <li>Submissions are human-reviewed</li>
        <li>Community forms are for ages 13+</li>
      </ul>

      <h2>1. Acceptance &amp; Age Requirements</h2>
      <p>
        By using rankrascal.lol, submitting feedback, applying to the Founders Guild, or using any Rank Rascal service, you agree to these Terms. Rank Rascal community services are intended for users aged <strong>13 and older</strong>. If you are under 13, you may not submit the website forms.
      </p>

      <h2>2. Community Feedback &amp; Guild Applications</h2>
      <p>
        You keep ownership of ideas and material you submit. You grant Rank Rascal permission to review and use feedback to improve the project. We may quote a comment publicly only when you select the public-quotation option, and we may edit that quote for length or clarity without changing its meaning. A Founders Guild application does not promise acceptance, employment, compensation, ownership, early access or a staff position. We will not require unpaid custom production work solely as an application test; any real work begins only after scope, credit, ownership and compensation are agreed.
      </p>

      <h2>3. Acceptable Use &amp; Conduct Rules</h2>
      <p>Users must engage respectfully. You expressly agree NOT to:</p>
      <ul>
        <li>Use Rank Rascal to bully, dog-pile, humiliate, harass, or attack targeted community members</li>
        <li>Impersonate other players or cheat/manipulate OAuth verifications</li>
        <li>Attempt to bypass security boundaries or extract secret tokens</li>
        <li>Engage in illegal activity or real-money wagering</li>
      </ul>

      <h2>4. Non-Monetary Value of Digital Achievements</h2>
      <p>
        Badges, certificates, QA IDs, Rascal Rep, Rotfiles and Flex Cards provided by Rank Rascal are digital recognition items. They possess <strong>zero monetary value</strong>, cannot be converted into currency, sold or traded, and do not create employment, ownership or payment rights.
      </p>

      <h2>5. Founding QA Scout Roster</h2>
      <p>
        A valid game review places the reviewer on the Founding QA Scout roster and may generate a personalized badge, certificate and QA ID. Roster status records an early review contribution. Invitations to playable builds are sent in cohorts and depend on build readiness, age and platform requirements, testing needs, safety capacity and applicable Roblox rules. Roster status does not guarantee a particular build, date, staff role or compensation.
      </p>

      <h2>6. Concepts, Development Targets &amp; Availability</h2>
      <p>
        Concept art, roadmaps and development targets describe intent, not guaranteed final features or release dates. Final game content may change through implementation, testing, platform review and safety work. Legacy bot humor and verdicts are entertainment only and should not be treated as medical, professional, or factual statements.
      </p>

      <h2>7. Service Availability &amp; Termination</h2>
      <p>We may pause, change or discontinue website, community, playtest or legacy bot features. The Rank Rascal Discord bot is currently paused and installation is closed.</p>

      <h2>8. Third-Party Platform Disclaimers &amp; Trademarks</h2>
      <p>Roblox is a trademark of Roblox Corporation. Discord is a trademark of Discord Inc.</p>
      <p className="doc-note">
        <strong>Mandatory Platform Disclaimer:</strong> Rank Rascal is an independent product and is not affiliated with, endorsed by or sponsored by Discord, Roblox, Epic Games or Riot Games.
      </p>

      <h2>9. Limitation of Liability &amp; Contact Information</h2>
      <p>Rank Rascal is provided &quot;as is&quot; without warranties of any kind. For questions or legal notices, contact:</p>
      <p>Email: {supportEmail ? <a href={`mailto:${supportEmail}`}>{supportEmail}</a> : "not available yet"}</p>
    </SimplePage>
  );
}
