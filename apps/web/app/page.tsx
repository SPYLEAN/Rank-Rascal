import { AnchorFallback } from "@/components/AnchorFallback";
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
import { MobileJourney } from "@/components/MobileJourney";

// Re-render at most every five minutes so scheduled announcements reach "Latest from the realm"
// without a redeploy, while the page itself stays cached.
export const revalidate = 300;

/**
 * Tablet and desktop: one continuous journey through Stickerwood:
 *  01 cinematic hero → 02 understand the game in Stickerwood → 03 why the world lies → 04 choose your hero →
 *  05 investigate a Fraud → 06 explore the realm (+ quests) → 07 meet King Wrongway →
 *  08 what lies beyond → 09 from Rascal Labs (concept archive preview) → 10 follow development →
 *  11 join Rascal Labs.
 * Warm light carries it; darkness builds toward King Wrongway and lifts again at the end.
 *
 * Phones (below 640 px): the same hero, then four chapters in about four screens:
 *  01 enter Crownfall → 02 what players do → 03 the world and heroes → 04 help build the realm.
 * The desktop chapters are not rendered visibly there (display: none, so their images never load);
 * their full content lives on /game, /labs and /community.
 */
export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <CinematicHero />
      <div className="hidden sm:block">
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
      <MobileJourney />
      <AnchorFallback />
    </div>
  );
}
