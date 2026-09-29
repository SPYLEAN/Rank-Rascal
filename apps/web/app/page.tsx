import { CinematicHero } from "@/components/CinematicHero";
import { EnterStickerwood } from "@/components/EnterStickerwood";
import { FractureStory } from "@/components/FractureStory";
import { HeroSelector } from "@/components/HeroSelector";
import { FraudInvestigation } from "@/components/FraudInvestigation";
import { WorldAtlas } from "@/components/WorldAtlas";
import { QuestJournal } from "@/components/QuestJournal";
import { KingWrongwayReveal } from "@/components/KingWrongwayReveal";
import { FutureRealmsTeaser } from "@/components/FutureRealmsTeaser";
import { FromRascalLabs } from "@/components/FromRascalLabs";
import { BuildArchive } from "@/components/BuildArchive";
import { JoinRascalLabs } from "@/components/JoinRascalLabs";

// Re-render at most every five minutes so scheduled announcements reach "Latest from the realm"
// without a redeploy, while the page itself stays cached.
export const revalidate = 300;

/**
 * The homepage is one continuous journey through Stickerwood:
 *  01 cinematic hero → 02 understand the game in Stickerwood → 03 why the world lies → 04 choose your hero →
 *  05 investigate a Fraud → 06 explore the realm (+ quests) → 07 meet King Wrongway →
 *  08 what lies beyond → 09 from Rascal Labs (concept archive preview) → 10 follow development →
 *  11 join Rascal Labs.
 * Warm light carries it; darkness builds toward King Wrongway and lifts again at the end.
 */
export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <CinematicHero />
      <EnterStickerwood />
      <FractureStory />
      <HeroSelector />
      <FraudInvestigation />
      <WorldAtlas />
      <QuestJournal />
      <KingWrongwayReveal />
      <FutureRealmsTeaser />
      <FromRascalLabs />
      <BuildArchive />
      <JoinRascalLabs />
    </div>
  );
}
