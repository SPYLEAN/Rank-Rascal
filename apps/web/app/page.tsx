import { CinematicHero } from "@/components/CinematicHero";
import { EnterStickerwood } from "@/components/EnterStickerwood";
import { FractureStory } from "@/components/FractureStory";
import { HeroSelector } from "@/components/HeroSelector";
import { FraudInvestigation } from "@/components/FraudInvestigation";
import { WorldAtlas } from "@/components/WorldAtlas";
import { QuestJournal } from "@/components/QuestJournal";
import { KingWrongwayReveal } from "@/components/KingWrongwayReveal";
import { FutureRealmsTeaser } from "@/components/FutureRealmsTeaser";
import { BuildArchive } from "@/components/BuildArchive";
import { JoinRascalLabs } from "@/components/JoinRascalLabs";

/**
 * The homepage is one continuous journey through Stickerwood:
 *  01 cinematic hero → 02 enter Stickerwood → 03 why the world lies → 04 choose your hero →
 *  05 investigate a Fraud → 06 explore the realm (+ quests) → 07 meet King Wrongway →
 *  08 what lies beyond → 09 follow development → 10 join Rascal Labs.
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
      <BuildArchive />
      <JoinRascalLabs />
    </div>
  );
}
