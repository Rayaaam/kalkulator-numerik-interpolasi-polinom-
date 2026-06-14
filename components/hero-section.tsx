"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface HeroSectionProps {
  onGetStarted?: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 -z-10">
        {/* Cyan blob */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/30 rounded-full blur-3xl opacity-60 animate-pulse" />
        {/* Purple blob */}
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/40 rounded-full blur-3xl opacity-50 animate-pulse" style={{ animationDelay: "1s" }} />
        {/* Center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 rounded-full blur-3xl opacity-40" />
      </div>

      {/* Content */}
      <div className="text-center max-w-3xl mx-auto space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 backdrop-blur-md border border-border">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Academic Project</span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground text-balance">
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Interpolation
          </span>
          <br />
          Calculator
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground font-light">
          Numerical Methods Final Project
        </p>

        {/* CTA Button */}
        <div className="pt-4">
          <Button
            size="lg"
            onClick={onGetStarted}
            className="relative px-8 py-6 text-lg font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
          >
            <span className="relative z-10">Get Started</span>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-primary blur-md opacity-50 -z-10" />
          </Button>
        </div>
      </div>

      {/* Floating particles decoration */}
      <div className="absolute bottom-20 left-1/4 w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDuration: "3s" }} />
      <div className="absolute top-32 right-1/3 w-1.5 h-1.5 rounded-full bg-secondary/60 animate-bounce" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }} />
      <div className="absolute bottom-32 right-1/4 w-1 h-1 rounded-full bg-accent/60 animate-bounce" style={{ animationDuration: "4s", animationDelay: "1s" }} />
    </section>
  );
}
