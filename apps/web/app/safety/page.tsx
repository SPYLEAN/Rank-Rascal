import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Heart, PhoneCall, BookOpen, CheckCircle2 } from "lucide-react";

export default function SafetyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Hero section with Razz Rulebook */}
      <div className="p-8 sm:p-12 rounded-3xl bg-panel-navy border-sticker-purple glow-purple grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-4 flex justify-center">
          <Image
            src="/brand/website-art/razz-rulebook.png"
            alt="Razz carefully reads a giant rulebook."
            width={400}
            height={533}
            className="w-full h-auto max-w-xs object-contain rounded-2xl"
          />
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-royal-purple/20 border border-royal-purple/40 text-royal-purple font-mono text-xs font-bold uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>Teen Protection & Community Safety</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-cloud-white uppercase">
            Rank Rascal Safety & Community Policy
          </h1>
          <p className="text-muted-text text-sm sm:text-base leading-relaxed">
            Rank Rascal is built to create playful, high-energy Discord entertainment. We are strictly committed to keeping our bot safe, inclusive, and free from bullying or harassment.
          </p>

          {/* RASCAL RULES SUMMARY BOX */}
          <div className="p-5 rounded-2xl bg-midnight-bg border border-panel-navy-light space-y-3 font-mono text-xs text-cloud-white">
            <div className="flex items-center space-x-2 text-toxic-lime font-bold text-sm">
              <BookOpen className="w-4 h-4" />
              <span>THE RASCAL RULES</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-cloud-white/90">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-toxic-lime flex-shrink-0" />
                <span>Compete without bullying</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-toxic-lime flex-shrink-0" />
                <span>Flex achievements, not personal data</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-toxic-lime flex-shrink-0" />
                <span>No impersonation or cheating</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-toxic-lime flex-shrink-0" />
                <span>Rivalries must remain friendly and opt-in</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-toxic-lime flex-shrink-0" />
                <span>Report harmful behavior immediately</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-toxic-lime flex-shrink-0" />
                <span>Rank Rascal is for Discord users aged 13+</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Safety Boundaries */}
      <div className="p-8 sm:p-10 rounded-3xl bg-panel-navy border-sticker space-y-8">
        <h2 className="font-display font-bold text-2xl text-cloud-white flex items-center space-x-3">
          <ShieldCheck className="w-6 h-6 text-toxic-lime" />
          <span>Core Safety Boundaries & Content Rules</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
          <div className="p-5 rounded-2xl bg-midnight-bg border border-panel-navy-light space-y-2">
            <h3 className="font-bold text-cloud-white text-sm flex items-center space-x-2">
              <span className="text-toxic-lime">01.</span>
              <span>Discord 13+ Age Limit</span>
            </h3>
            <p className="text-muted-text leading-relaxed">
              Rank Rascal is strictly for Discord users aged 13 and older, complying with Discord Terms of Service and international COPPA regulations.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-midnight-bg border border-panel-navy-light space-y-2">
            <h3 className="font-bold text-cloud-white text-sm flex items-center space-x-2">
              <span className="text-toxic-lime">02.</span>
              <span>Zero Harassment or Dog-Piling</span>
            </h3>
            <p className="text-muted-text leading-relaxed">
              We strictly prohibit targeted harassment, dog-piling, appearance attacks, protected-class attacks, or personal humiliation.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-midnight-bg border border-panel-navy-light space-y-2">
            <h3 className="font-bold text-cloud-white text-sm flex items-center space-x-2">
              <span className="text-toxic-lime">03.</span>
              <span>Curated Meme Humor</span>
            </h3>
            <p className="text-muted-text leading-relaxed">
              All humor verdicts use hand-curated, safe meme templates. We do not use uncontrolled AI generation to construct personal insults.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-midnight-bg border border-panel-navy-light space-y-2">
            <h3 className="font-bold text-cloud-white text-sm flex items-center space-x-2">
              <span className="text-toxic-lime">04.</span>
              <span>No Sexual Roleplay or Exploitation</span>
            </h3>
            <p className="text-muted-text leading-relaxed">
              Any sexualized roleplay, inappropriate content involving minors, or exploitation is strictly forbidden and subject to instant bans and reporting.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-midnight-bg border border-panel-navy-light space-y-2">
            <h3 className="font-bold text-cloud-white text-sm flex items-center space-x-2">
              <span className="text-toxic-lime">05.</span>
              <span>No Dangerous Challenges or Gambling</span>
            </h3>
            <p className="text-muted-text leading-relaxed">
              Rank Rascal never encourages self-harm, dangerous offline challenges, real-money gambling, or wagering.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-midnight-bg border border-panel-navy-light space-y-2">
            <h3 className="font-bold text-cloud-white text-sm flex items-center space-x-2">
              <span className="text-toxic-lime">06.</span>
              <span>Opt-in Friendly Rivalry</span>
            </h3>
            <p className="text-muted-text leading-relaxed">
              Participation in server leaderboards and rivalry checks is opt-in. Enable <code className="text-toxic-lime">/witness-protection</code> anytime to hide your stats.
            </p>
          </div>
        </div>
      </div>

      {/* Mental Health & Mascot Disclaimer Box */}
      <div className="p-8 rounded-3xl bg-panel-navy border-sticker-lime glow-lime space-y-4">
        <div className="flex items-center space-x-3 text-hot-pink">
          <Heart className="w-6 h-6 fill-current" />
          <h2 className="font-display font-bold text-xl text-cloud-white">
            Mental Health & Mascot Boundary
          </h2>
        </div>
        <p className="text-xs text-muted-text leading-relaxed font-sans">
          Rank Rascal and Razz the mascot are non-sentient digital entertainment bots and are <strong>never a therapist or a replacement for trusted human support</strong>. We do not provide mental health diagnoses or medical advice.
        </p>
        <div className="p-4 rounded-2xl bg-midnight-bg border border-panel-navy-light text-xs font-mono text-cloud-white space-y-2">
          <div className="flex items-center space-x-2 text-reward-yellow font-bold">
            <PhoneCall className="w-4 h-4" />
            <span>Need Support or Facing a Crisis?</span>
          </div>
          <p className="text-muted-text text-[11px] leading-relaxed">
            If you or someone in your community is experiencing distress, self-harm thoughts, or danger, please reach out immediately to a trusted parent, school counselor, or professional helpline:
          </p>
          <ul className="list-disc pl-5 text-[11px] text-toxic-lime space-y-1">
            <li>National Suicide & Crisis Lifeline (US): Dial or text <strong>988</strong> (Available 24/7)</li>
            <li>The Trevor Project (LGBTQ youth): Call <strong>1-866-488-7386</strong> or text <strong>START to 678-678</strong></li>
            <li>Crisis Text Line: Text <strong>HOME to 741741</strong></li>
            <li>International Resources: Visit <a href="https://findahelpline.com" target="_blank" rel="noopener noreferrer" className="underline font-bold">findahelpline.com</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
