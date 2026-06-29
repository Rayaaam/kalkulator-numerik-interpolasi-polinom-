"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator, Sparkles, Settings } from "lucide-react";

interface ConfigSidebarProps {
  onCalculate?: (targetX: number, method: string) => void;
}

const interpolationMethods = [
  { value: "lagrange", label: "Lagrange Polynom" },
  { value: "newton", label: "Newton Polynom" },
  { value: "newton-gregory", label: "Newton-Gregory Maju" },
  { value: "newton-gregory-mundur", label: "Newton-Gregory Mundur" },
];

export function ConfigSidebar({ onCalculate }: ConfigSidebarProps) {
  const [targetX, setTargetX] = useState("");
  const [method, setMethod] = useState("lagrange");

  const handleCalculate = () => {
    if (targetX && method) {
      onCalculate?.(parseFloat(targetX), method);
    }
  };

  return (
    <div className="rounded-3xl bg-card/60 backdrop-blur-xl border border-border p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-secondary/20 border border-secondary/30">
          <Settings className="w-5 h-5 text-secondary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Configuration</h3>
          <p className="text-xs text-muted-foreground">Set Paramater Prediksi</p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Target X Input */}
      <div className="space-y-3">
        <Label htmlFor="target-x" className="text-foreground">
          Target X <span className="text-muted-foreground">(Value to predict)</span>
        </Label>
        <Input
          id="target-x"
          type="number"
          step="any"
          placeholder="Masukkan Nilai x..."
          value={targetX}
          onChange={(e) => setTargetX(e.target.value)}
          className="rounded-xl bg-muted/50 border-border focus:border-primary focus:ring-primary/20 h-12"
        />
      </div>

      {/* Method Select */}
      <div className="space-y-3">
        <Label className="text-foreground">Interpolation Method</Label>
        <Select value={method} onValueChange={setMethod}>
          <SelectTrigger className="w-full rounded-xl bg-muted/50 border-border h-12">
            <SelectValue placeholder="Select method" />
          </SelectTrigger>
          <SelectContent className="rounded-xl bg-card/95 backdrop-blur-xl border-border">
            {interpolationMethods.map((m) => (
              <SelectItem
                key={m.value}
                value={m.value}
                className="rounded-lg focus:bg-primary/20 focus:text-primary"
              >
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Info card */}
      <div className="rounded-2xl bg-primary/10 border border-primary/20 p-4">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <p className="text-sm text-muted-foreground">
            Masukkan setidaknya 2 titik data untuk melakukan perhitungan interpolasi.
          </p>
        </div>
      </div>

      {/* Calculate Button */}
      <Button
        onClick={handleCalculate}
        disabled={!targetX || !method}
        className="w-full h-14 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50 disabled:shadow-none text-base font-semibold"
      >
        <Calculator className="w-5 h-5 mr-2" />
        Hitung Prediksi
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-primary blur-md opacity-30 -z-10" />
      </Button>
    </div>
  );
}
