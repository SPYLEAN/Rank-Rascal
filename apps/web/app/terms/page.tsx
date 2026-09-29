import type { Metadata } from "next";
import Link from "next/link";
import { SimplePage } from "@/components/SimplePage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for using the Rascal Realms website, community forms and the paused Rank Rascal bot.",
};

// Version 1.3 (2026-09-29): Founding QA candidate pool wording and the Ask Razz section.
export default function TermsPage() {
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;
  const hasSupportEmail = Boolean(process.env.NEXT_PUBLIC_SUPPORT_EMAIL);

  return (
    <SimplePage kicker="Terms of service agreement" title="Rank Rascal Terms of Service" meta="Effective Date: September 29, 2026 | Version 1.3">
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

      <h2>5. Founding QA Candidate Pool</h2>
      <p>
        A valid game review may add the reviewer to the Founding QA candidate pool and generate a personalized badge, certificate and QA ID. The badge and certificate record an early review contribution. Joining the candidate pool does not guarantee testing access, an invitation to a playable build, a particular build or date, employment, a staff role or compensation. If playtesting opens, candidates may be invited in small groups depending on build readiness, age and platform requirements, testing needs, safety capacity and applicable Roblox rules.
      </p>

      <h2>6. Concepts, Development Targets &amp; Availability</h2>
      <p>
        Concept art, roadmaps and development targets describe intent, not guaranteed final features or release dates. Final game content may change through implementation, testing, platform review and safety work. Legacy bot humor and verdicts are entertainment only and should not be treated as medical, professional, or factual statements.
      </p>

      <h2>7. Ask Razz</h2>
      <p>
        Ask Razz is a scripted guide. It answers from a fixed set of answers written by the Rascal Labs team, and your questions are processed in your browser rather than sent to us or to any AI provider. Its answers describe pre-production plans that may change; they are not promises of features, dates, access or rewards. If Ask Razz cannot find an answer, it will say the topic has not been announced or decided yet.
      </p>

      <h2>8. Service Availability &amp; Termination</h2>
      <p>We may pause, change or discontinue website, community, playtest or legacy bot features. The Rank Rascal Discord bot is currently paused and installation is closed.</p>

      <h2>9. Third-Party Platform Disclaimers &amp; Trademarks</h2>
      <p>Roblox is a trademark of Roblox Corporation. Discord is a trademark of Discord Inc.</p>
      <p className="doc-note">
        <strong>Mandatory Platform Disclaimer:</strong> Rank Rascal is an independent product and is not affiliated with, endorsed by or sponsored by Discord, Roblox, Epic Games or Riot Games.
      </p>

      <h2>10. Limitation of Liability &amp; Contact Information</h2>
      <p>Rank Rascal is provided &quot;as is&quot; without warranties of any kind. For questions or legal notices, contact:</p>
      <p>Email: {supportEmail ? <a href={`mailto:${supportEmail}`}>{supportEmail}</a> : "not available yet"}</p>
    </SimplePage>
  );
}
