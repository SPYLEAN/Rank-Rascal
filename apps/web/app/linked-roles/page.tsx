import { RazzMascot } from "@/components/RazzMascot";
import { ShieldAlert, Clock, Lock, Sparkles, CheckCircle2 } from "lucide-react";

export default function LinkedRolesPage() {
  const isEnabled = process.env.NEXT_PUBLIC_LINKED_ROLES_ENABLED === "true";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-reward-yellow/10 border border-reward-yellow/40 text-reward-yellow font-mono text-xs font-bold uppercase">
          <Clock className="w-4 h-4" />
          <span>Discord Role Connections</span>
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-cloud-white">
          Discord Linked Roles
        </h1>
        <p className="text-muted-text text-base leading-relaxed">
          Automatically sync verified Roblox badge milestones and Rascal Rep to special server Discord roles.
        </p>
      </div>

      {/* Feature Flag Check */}
      {!isEnabled ? (
        /* Disabled "Cooking" State */
        <div className="p-10 sm:p-14 rounded-3xl bg-panel-navy border-sticker-lime glow-lime text-center max-w-2xl mx-auto space-y-6">
          <RazzMascot pose="loading" size={180} className="mx-auto" />
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-reward-yellow/20 border border-reward-yellow/40 text-xs font-mono font-bold text-reward-yellow inline-block">
              FEATURE IN COOKING PHASE
            </span>
            <h2 className="font-display font-bold text-3xl text-cloud-white">
              Linked Roles Are Cooking 🍳
            </h2>
            <p className="text-xs text-muted-text font-mono max-w-lg mx-auto leading-relaxed">
              Discord Linked Roles integration is intentionally disabled behind <code className="text-toxic-lime">NEXT_PUBLIC_LINKED_ROLES_ENABLED=false</code> until Discord OAuth2 user token storage, <code className="text-toxic-lime">role_connections.write</code> metadata registration, and automated role connection updates are fully implemented and tested.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-midnight-bg border border-panel-navy-light text-xs font-mono text-cloud-white/80 space-y-2 text-left">
            <div className="font-bold text-toxic-lime flex items-center space-x-1.5">
              <ShieldAlert className="w-4 h-4 text-toxic-lime" />
              <span>Prerequisites for Live Release:</span>
            </div>
            <ul className="space-y-1 pl-5 list-disc text-muted-text text-[11px]">
              <li>Discord OAuth2 flow with <code className="text-cloud-white">role_connections.write</code> scope</li>
              <li>Secure encrypted token storage for refresh tokens</li>
              <li>Discord Developer Portal Application Role Connection Metadata registration</li>
              <li>Production endpoint for pushed metadata sync</li>
            </ul>
          </div>
        </div>
      ) : (
        /* Enabled State Placeholder (when feature flag is true) */
        <div className="p-8 rounded-3xl bg-panel-navy border-sticker text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-toxic-lime mx-auto" />
          <h2 className="font-display font-bold text-2xl text-cloud-white">
            Linked Roles Are Active
          </h2>
          <p className="text-xs text-muted-text font-mono">
            Connect your Discord role metadata to start earning synced guild roles.
          </p>
        </div>
      )}
    </div>
  );
}
