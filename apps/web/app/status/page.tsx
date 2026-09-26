import { Activity, Database, Globe, Server, ShieldCheck } from "lucide-react";

// Live monitoring is not connected yet, so this page deliberately reports no
// service as operational. Wire it to reviewed health endpoints before changing that.
const SERVICES = [
  { name: "Website", detail: "Next.js site on Vercel", icon: Globe },
  { name: "Discord Bot", detail: "Always-on Gateway worker", icon: Server },
  { name: "Roblox Verification", detail: "OAuth callback on the worker", icon: ShieldCheck },
  { name: "Database", detail: "Managed PostgreSQL", icon: Database },
];

export default function StatusPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-reward-yellow/10 border border-reward-yellow/40 text-reward-yellow font-mono text-xs font-bold uppercase">
          <Activity className="w-4 h-4" />
          <span>Static preview · not live</span>
        </div>
        <h1 className="font-display font-extrabold text-4xl text-cloud-white">
          Rank Rascal System Status
        </h1>
        <p className="text-muted-text text-sm font-mono">
          Live monitoring is not connected yet. Nothing on this page reflects real service health.
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-panel-navy border-sticker space-y-4 text-xs font-mono">
        {SERVICES.map(({ name, detail, icon: Icon }) => (
          <div
            key={name}
            className="flex items-center justify-between p-4 rounded-xl bg-midnight-bg border border-panel-navy-light"
          >
            <div className="flex items-center space-x-3">
              <Icon className="w-5 h-5 text-muted-text" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-cloud-white">{name}</h3>
                <p className="text-muted-text text-[11px]">{detail}</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-panel-navy-light text-muted-text font-bold border border-panel-navy-light">
              NOT MONITORED YET
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
