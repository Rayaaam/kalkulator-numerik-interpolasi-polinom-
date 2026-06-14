"use client";

import { HeroSection } from "@/components/hero-section";
import { TeamSection } from "@/components/team-section";

interface HomeViewProps {
  onGetStarted: () => void;
}

export function HomeView({ onGetStarted }: HomeViewProps) {
  return (
    <div className="min-h-screen">
      <HeroSection onGetStarted={onGetStarted} />
      <TeamSection />
      
      {/* Footer accent */}
      <footer className="py-8 text-center">
        <p className="text-sm text-muted-foreground">
          © 2026 Kelompok 6C-Metnum
        </p>
      </footer>
    </div>
  );
}
