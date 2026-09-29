import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SimplePage } from "@/components/SimplePage";

export const metadata: Metadata = {
  title: "Community Safety",
  description: "The safety and participation rules for the Rascal Realms pre-launch community.",
};

const rules = [
  "Critique the work, never the person behind it.",
  "No harassment, dog-piling, hate speech, threats, or sexual content.",
  "Do not share private information—yours or anyone else’s.",
  "No scams, impersonation, cheating tools, gambling, or exploit promotion.",
  "Keep story speculation clearly separate from confirmed game information.",
  "Report harmful behavior; do not turn moderation into public spectacle.",
];

const boundaries = [
  {
    title: "Pre-launch, not a promise machine",
    body: "Concepts, names, balance ideas, dates, and visuals can change. Devlogs distinguish confirmed work from exploration so feedback stays grounded.",
  },
  {
    title: "Feedback is reviewed privately",
    body: "Website submissions go to a private team inbox. Nothing is published as a quote unless the sender explicitly opts in, and opting in never guarantees publication.",
  },
  {
    title: "Founders Guild is 13+",
    body: "The website feedback and Guild interest forms are for people aged 13 or older. Joining the interest list is not employment, payment, access, or a launch guarantee.",
  },
  {
    title: "No sensitive information",
    body: "Never submit passwords, precise locations, financial information, government identifiers, or private account credentials. We will never ask for them through a community form.",
  },
  {
    title: "Roblox rules still apply",
    body: "Any eventual play experience and community activity must follow Roblox’s platform rules in addition to our own. Exploits and bypasses are not part of testing.",
  },
  {
    title: "Razz is a fictional guide",
    body: "Razz is a character—not a person, therapist, authority, or source of medical advice. On this site his typed answers can come from AI and can be wrong. Don’t share personal details with him. If someone may be in danger, contact a trusted adult or local emergency support.",
  },
];

export default function SafetyPage() {
  return (
    <SimplePage
      kicker="Community safety"
      title="Build the mystery. Protect the people."
      lede="Rascal Realms can hold tension, suspicion, secrets, and difficult choices without turning its real community cruel. The fiction gets sharp; participation stays respectful."
    >
      <div className="not-prose grid items-center gap-8 sm:grid-cols-[10rem_1fr]">
        <Image
          src="/brand/website-art/razz-rulebook.png"
          alt="Razz reading the community rulebook"
          width={400}
          height={533}
          className="mx-auto h-auto w-40"
          style={{ height: "auto" }}
        />
        <div>
          <h2 className="!mt-0">The Rascal Rules</h2>
          <ul>
            {rules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>
      </div>

      <h2>Participation boundaries</h2>
      {boundaries.map((boundary) => (
        <div key={boundary.title}>
          <h3 className="mt-6 font-display text-lg font-bold text-cloud-white">{boundary.title}</h3>
          <p className="!mt-1">{boundary.body}</p>
        </div>
      ))}

      <h2>Need help with a submission or safety concern?</h2>
      <p>
        Send only the details needed to understand the issue. For immediate danger, contact local emergency services or a trusted person who can help in the real world.
      </p>
      <p>
        <Link href="/support">Contact project support</Link>
      </p>
    </SimplePage>
  );
}
