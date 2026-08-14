import { Activity, CheckCircle2, Server, ShieldCheck, Zap } from "lucide-react";

export default function StatusPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-toxic-lime/10 border border-toxic-lime/40 text-toxic-lime font-mono text-xs font-bold uppercase">
          <Activity className="w-4 h-4" />
          <span>System Operational Status</span>
        </div>
        <h1 className="font-display font-extrabold text-4xl text-cloud-white">
          Rank Rascal System Status
        </h1>
        <p className="text-muted-text text-sm font-mono">
          All Core Gateway Services & OAuth Systems Operational
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-panel-navy border-sticker space-y-4 text-xs font-mono">
        <div className="flex items-center justify-between p-4 rounded-xl bg-midnight-bg border border-panel-navy-light">
          <div className="flex items-center space-x-3">
            <Server className="w-5 h-5 text-toxic-lime" />
            <div>
              <h3 className="font-bold text-cloud-white">Discord Gateway Worker</h3>
              <p className="text-muted-text text-[11px]">Always-on Node Gateway Connection</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-toxic-lime/20 text-toxic-lime font-bold border border-toxic-lime/40">
            OPERATIONAL
          </span>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl bg-midnight-bg border border-panel-navy-light">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-5 h-5 text-toxic-lime" />
            <div>
              <h3 className="font-bold text-cloud-white">Roblox OAuth 2.0 PKCE Auth Server</h3>
              <p className="text-muted-text text-[11px]">Expiring state verifiers & token exchange</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-toxic-lime/20 text-toxic-lime font-bold border border-toxic-lime/40">
            OPERATIONAL
          </span>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl bg-midnight-bg border border-panel-navy-light">
          <div className="flex items-center space-x-3">
            <Zap className="w-5 h-5 text-toxic-lime" />
            <div>
              <h3 className="font-bold text-cloud-white">Vercel Web Application</h3>
              <p className="text-muted-text text-[11px]">App Router frontend & documentation</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-toxic-lime/20 text-toxic-lime font-bold border border-toxic-lime/40">
            OPERATIONAL
          </span>
        </div>
      </div>
    </div>
  );
}
