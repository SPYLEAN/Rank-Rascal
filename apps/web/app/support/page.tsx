import type { Metadata } from "next";
import Link from "next/link";
import { SimplePage } from "@/components/SimplePage";

export const metadata: Metadata = {
  title: "Support",
  description: "How to reach the Rascal Labs team about game feedback, the Founders Guild, privacy, deletion or security.",
};

export default function SupportPage() {
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;

  return (
    <SimplePage
      kicker="Support"
      title="Need a human?"
      lede="Game feedback and Guild questions go through the community inbox. Privacy, deletion and security requests are handled separately."
    >
      <h2>Game feedback and the Founders Guild</h2>
      <p>Share ideas, report something confusing, or apply to help build the game. A person reads every submission.</p>
      <p>
        <Link href="/community#review">Review the game</Link> · <Link href="/community#guild">Apply to the Founders Guild</Link>
      </p>

      <h2>Privacy, deletion and security</h2>
      <p>Never include passwords or secret tokens. Send only enough information for the team to identify your request.</p>
      {supportEmail ? (
        <p>
          Email <a href={`mailto:${supportEmail}`}>{supportEmail}</a>.
        </p>
      ) : (
        <p className="doc-note">
          The support mailbox isn&apos;t open yet. Until it is, use the <Link href="/community#review">community form</Link> and start your message with
          &ldquo;Privacy request&rdquo;.
        </p>
      )}

      <h2>Safety</h2>
      <p>
        For community rules and how we handle concerns, read the <Link href="/safety">safety page</Link>. If someone is in immediate danger, contact local
        emergency services or a trusted adult.
      </p>

      <h2>The Rank Rascal Discord bot</h2>
      <p>The bot is paused and installation is closed. Preserved bot data remains covered by the <Link href="/privacy">privacy policy</Link> and deletion process.</p>
    </SimplePage>
  );
}
