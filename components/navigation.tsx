"use client";

import { Calculator, Home, Database, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = "home" | "input" | "results";

interface NavigationProps {
  activeTab: NavItem;
  onTabChange: (tab: NavItem) => void;
}

const navItems: { id: NavItem; label: string; icon: React.ElementType }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "input", label: "Input Data", icon: Database },
  { id: "results", label: "Results", icon: BarChart3 },
];

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Glassmorphism nav bar */}
      <nav className="mx-4 mt-4 rounded-2xl bg-card/60 backdrop-blur-xl border border-border">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/20 border border-primary/30">
              <Calculator className="w-5 h-5 text-primary" />
            </div>
            <span className="font-semibold text-foreground hidden sm:block">
              Interpolation Calculator
            </span>
          </div>

          {/* Nav links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-primary/20 text-primary border border-primary/30 shadow-lg shadow-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:block">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}

export type { NavItem };
