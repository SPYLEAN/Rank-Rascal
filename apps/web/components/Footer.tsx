import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ShieldCheck, Heart, AlertTriangle } from "lucide-react";

export const Footer: React.FC = () => {
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;

  return (
    <footer className="bg-panel-navy/80 border-t border-panel-navy-light mt-20 text-muted-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/brand/logo-lockup.png"
                alt="Rank Rascal"
                width={160}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-muted-text/80 leading-relaxed">
              Play games. Flex achievements. Collect chaos. Turn public Roblox milestones into certified server lore.
            </p>
            <div className="flex items-center space-x-2 text-xs text-toxic-lime font-mono">
              <ShieldCheck className="w-4 h-4 text-toxic-lime" />
              <span>Safe & Opt-in 13+ Platform</span>
            </div>
          </div>

          {/* Column 2: Product & Features */}
          <div>
            <h3 className="font-display font-semibold text-cloud-white text-sm tracking-wider uppercase mb-4">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/commands" className="hover:text-toxic-lime transition-colors">
                  Command Directory
                </Link>
              </li>
              <li>
                <Link href="/games" className="hover:text-toxic-lime transition-colors">
                  Supported Games & Roadmap
                </Link>
              </li>
              <li>
                <Link href="/rewards" className="hover:text-toxic-lime transition-colors">
                  Rewards & Rotfiles
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-toxic-lime transition-colors">
                  Dashboard Shell
                </Link>
              </li>
              <li>
                <Link href="/verify" className="hover:text-toxic-lime transition-colors">
                  Roblox Verification Guide
                </Link>
              </li>
              <li>
                <Link href="/linked-roles" className="hover:text-toxic-lime transition-colors">
                  Linked Roles (Cooking)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Trust & Legal */}
          <div>
            <h3 className="font-display font-semibold text-cloud-white text-sm tracking-wider uppercase mb-4">
              Trust & Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/safety" className="hover:text-toxic-lime transition-colors">
                  Safety & Teen Protection
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-toxic-lime transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-toxic-lime transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-toxic-lime transition-colors">
                  Support & Help Center
                </Link>
              </li>
              <li>
                <Link href="/status" className="hover:text-toxic-lime transition-colors">
                  System Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Environmental Notice */}
          <div>
            <h3 className="font-display font-semibold text-cloud-white text-sm tracking-wider uppercase mb-4">
              Contact & Support
            </h3>
            {supportEmail ? (
              <p className="text-xs text-cloud-white/90">
                Contact our support team at:{" "}
                <a
                  href={`mailto:${supportEmail}`}
                  className="text-toxic-lime hover:underline font-mono"
                >
                  {supportEmail}
                </a>
              </p>
            ) : (
              <div className="bg-alert-red/10 border border-alert-red/40 rounded-xl p-3 text-xs text-cloud-white space-y-1">
                <div className="flex items-center space-x-1.5 text-alert-red font-semibold">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>Deployment Warning</span>
                </div>
                <p className="text-cloud-white/80">
                  <code className="font-mono text-toxic-lime">NEXT_PUBLIC_SUPPORT_EMAIL</code> is unset in this build environment.
                </p>
              </div>
            )}
            <p className="mt-4 text-xs text-muted-text/70">
              For security or data deletion requests, follow the steps on our{" "}
              <Link href="/privacy" className="underline hover:text-toxic-lime">
                Privacy Page
              </Link>.
            </p>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-10 pt-8 border-t border-panel-navy-light text-center space-y-3">
          <p className="text-xs text-muted-text/80 max-w-3xl mx-auto leading-relaxed">
            Rank Rascal is an independent product and is not affiliated with, endorsed by or sponsored by Discord, Roblox, Epic Games or Riot Games.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-muted-text/70 font-mono">
            <span>&copy; {new Date().getFullYear()} Rank Rascal. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center">
              Built with <Heart className="w-3.5 h-3.5 text-hot-pink fill-hot-pink mx-1 inline" /> by{" "}
              <a
                href="https://spylean-portfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-toxic-lime font-bold hover:underline ml-1 inline-flex items-center space-x-1"
              >
                <span>SPYLEAN</span>
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
