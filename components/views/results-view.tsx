"use client";

import { BarChart3, Calculator, Table2, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Scatter,
  ComposedChart,
} from "recharts";

interface ResultsViewProps {
  onGoToInput: () => void;
  dataHasil?: any;
}

// Mock divided difference table data
const dividedDifferenceTable = [
  { i: 0, x: "0", y: "1.000", d1: "-0.450", d2: "0.025", d3: "-0.008" },
  { i: 1, x: "1", y: "0.550", d1: "-0.350", d2: "0.000", d3: "—" },
  { i: 2, x: "2", y: "0.200", d1: "-0.100", d2: "—", d3: "—" },
  { i: 3, x: "3", y: "0.100", d1: "—", d2: "—", d3: "—" },
];

// Custom tooltip for chart
function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ value: number; dataKey: string }> }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl bg-card/90 backdrop-blur-md border border-border px-4 py-3 shadow-xl">
        <p className="text-sm text-muted-foreground">
          x = <span className="text-foreground font-medium">{payload[0]?.value?.toFixed(2)}</span>
        </p>
        <p className="text-sm text-primary font-semibold">
          f(x) = {payload[1]?.value?.toFixed(4)}
        </p>
      </div>
    );
  }
  return null;
}

export function ResultsView({ onGoToInput, dataHasil }: ResultsViewProps) {
  
  const targetX = dataHasil?.targetX ?? 0;
  const predictedY = dataHasil?.resultY ?? 0;

  const points = dataHasil?.points ?? [];
  // Format nama metode biar cakep pas ditampilin
  let methodNama = "Metode Interpolasi";
  if (dataHasil?.method === "lagrange") methodNama = "Polinom Lagrange";
  else if (dataHasil?.method === "newton") methodNama = "Polinom Newton";
  else if (dataHasil?.method === "newton-gregory") methodNama = "Newton-Gregory (Maju)";
  else if (dataHasil?.method === "newton-gregory-mundur") methodNama = "Newton-Gregory (Mundur)";
  const method = methodNama;
  

  // Bikin rumus dinamis
  let polynomialEquation = "P(x) = ...";
  let simplifiedForm = "Simplified form: f(x) = ...";

  if (dataHasil?.method === "lagrange" && points.length > 0) {
    // Gabungin L0(x) dengan nilai Y asli, contoh: L0(x)(2.5) + L1(x)(4)
    const eqParts = points.map((p: any, i: number) => `L${i}(x)(${p.y})`);
    polynomialEquation = `P(x) = ${eqParts.join(" + ")}`;  
    // Bawahnya kita ganti jadi kesimpulan substitusi target X
    simplifiedForm = `Hasil Substitusi: P(${targetX}) = ${predictedY}`;
  }
  //logika buat Newton
  else if (dataHasil?.method === "newton" && dataHasil?.equationString) {
    polynomialEquation = dataHasil.equationString; // Ambil string rumus dari mesin Newton
    simplifiedForm = `Hasil Substitusi: P(${targetX}) = ${predictedY}`;
  }
  // Logika Newton-gregory-maju
  else if (dataHasil?.method === "newton-gregory" && dataHasil?.equationString) {
    polynomialEquation = dataHasil.equationString;
    // Tunjukin nilai s-nya di kesimpulan
    simplifiedForm = `Nilai s = ${dataHasil.sValue.toFixed(4)} | Hasil Substitusi: P(${targetX}) = ${predictedY}`;
  }
  // Logika Newton-gregory-mundur
  else if (dataHasil?.method === "newton-gregory-mundur" && dataHasil?.equationString) {
    polynomialEquation = dataHasil.equationString;
    simplifiedForm = `Nilai s = ${dataHasil.sValue.toFixed(4)} | Hasil Substitusi: P(${targetX}) = ${Number(predictedY).toFixed(4)}`;
  }

  // Ambil titik asli, jadikan format grafik
  const chartData = points.map((p: any) => ({
    x: p.x,
    y: p.y,
    dataPoint: p.y 
  }));

  // Masukin titik hasil prediksi biar nongol di kurva!
  if (dataHasil) {
    
    const titikUdahAda = chartData.find((p: any) => p.x === targetX);
    
    if (titikUdahAda) {
      
      titikUdahAda.predictedPoint = predictedY;
    } else {
      
      chartData.push({
        x: targetX,
        y: predictedY,
        predictedPoint: predictedY
      });
      chartData.sort((a: any, b: any) => a.x - b.x); 
    }
  }

  return (
    <div className="relative min-h-screen px-6 py-8">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-40 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-40 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Page header */}
        <div className="mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 backdrop-blur-md border border-border">
            <BarChart3 className="w-4 h-4 text-secondary" />
            <span className="text-sm text-muted-foreground">Analysis</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Calculation Results
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Analisis Interpolasi Menggunakan metode {method}.
          </p>
        </div>

        {/* Top Section - Summary Card */}
        <div className="rounded-3xl bg-card/60 backdrop-blur-xl border border-border p-8 relative overflow-hidden">
          {/* Glow effect behind the result */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/30 rounded-full blur-3xl" />
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                <Calculator className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Target X Value</p>
                <p className="text-2xl font-bold text-foreground">x = {targetX}</p>
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Predicted Y Value</p>
              <p className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-lg">
                {predictedY.toFixed(4)}
              </p>
              <p className="text-xs text-muted-foreground mt-2">f({targetX}) = {predictedY.toFixed(4)}</p>
            </div>
          </div>
        </div>

        {/* Middle Section - Two Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Card - Mathematical Equation */}
          <div className="flex-1 rounded-3xl bg-card/60 backdrop-blur-xl border border-border p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-secondary/20 border border-secondary/30 flex items-center justify-center">
                <span className="font-serif italic text-secondary font-medium">fx</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Polynomial Equation</h3>
                <p className="text-xs text-muted-foreground">{method}</p>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <div className="p-4 rounded-2xl border border-border bg-background/50 mb-4 overflow-x-auto">
                <code className="text-secondary font-mono whitespace-nowrap">
                  {polynomialEquation}
                </code>
              </div>
              <div className="p-4 rounded-2xl border border-border bg-background/50 mb-4 overflow-x-auto">
                <code className="text-secondary font-mono whitespace-nowrap">
                  {simplifiedForm}
                </code>
              </div>
              <p className="text-xs text-muted-foreground">
                
              </p>
            </div>
          </div>

          {/* Right Card - Process Table */}
          <div className="rounded-3xl bg-card/60 backdrop-blur-xl border border-border p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-5 border-b border-border/50 pb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                <Table2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  {method === "Polinom Lagrange" ? "Algorithm Steps" : "Tabel Selisih Terbagi"}
                </h3>
                <p className="text-xs text-muted-foreground">Langkah perhitungan</p>
              </div>
            </div>

            {method === "Polinom Lagrange" ? (
              <div className="rounded-2xl border border-border bg-background/50 p-5 space-y-3 overflow-x-auto">
                <p className="text-sm font-medium text-muted-foreground mb-2">Fungsi Basis Lagrange:</p>
                {dataHasil?.langkahLi?.map((langkah: string, index: number) => (
                  <code key={index} className="block text-sm md:text-base text-primary whitespace-nowrap bg-secondary/10 p-2 rounded-lg mt-2">
                    {langkah}
                  </code>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-border bg-background/50">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/30 border-b border-border/50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">i</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">x_i</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">f[x_i] (Orde 0)</th>
                      {/* Pakai ternary operator buat nentuin simbol otomatis */}
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {method?.toLowerCase().includes("mundur") ? "∇" : "Δ"}¹ (Orde 1)
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {method?.toLowerCase().includes("mundur") ? "∇" : "Δ"}² (Orde 2)
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {method?.toLowerCase().includes("mundur") ? "∇" : "Δ"}³ (Orde 3)
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {method?.toLowerCase().includes("mundur") ? "∇" : "Δ"}⁴ (Orde 4)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {/* Tambahin dataHasil?. di depannya biar nggak error undefined */}
                    {dataHasil?.dividedDifferenceTable?.map((row: any) => (
                      <tr key={row.i} className="hover:bg-muted/20 transition-colors">
                        <td className="px-4 py-3 font-mono text-muted-foreground">{row.i}</td>
                        <td className="px-4 py-3 font-mono text-foreground">{row.x}</td>
                        <td className="px-4 py-3 font-mono text-primary font-medium">{row.y}</td>
                        <td className="px-4 py-3 font-mono text-muted-foreground">{row.d1}</td>
                        <td className="px-4 py-3 font-mono text-muted-foreground">{row.d2}</td>
                        <td className="px-4 py-3 font-mono text-muted-foreground">{row.d3}</td>
                        <td className="px-4 py-3 font-mono text-muted-foreground">{row.d4}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        {/* Bottom Section - Chart Area */}
        <div className="rounded-3xl bg-card/60 backdrop-blur-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Interpolation Curve</h3>
              <p className="text-xs text-muted-foreground">Data points and polynomial fit</p>
            </div>
          </div>

          <div className="h-80 md:h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="oklch(0.75 0.15 195)" />
                    <stop offset="50%" stopColor="oklch(0.65 0.13 195)" />
                    <stop offset="100%" stopColor="oklch(0.55 0.12 290)" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="oklch(0.35 0.02 260 / 0.3)" 
                  vertical={false}
                />
                <XAxis 
                  dataKey="x" 
                  stroke="oklch(0.65 0.02 260)"
                  tick={{ fill: 'oklch(0.65 0.02 260)', fontSize: 12 }}
                  axisLine={{ stroke: 'oklch(0.35 0.02 260 / 0.5)' }}
                  label={{ value: 'X', position: 'insideBottomRight', offset: -5, fill: 'oklch(0.65 0.02 260)' }}
                />
                <YAxis 
                  stroke="oklch(0.65 0.02 260)"
                  tick={{ fill: 'oklch(0.65 0.02 260)', fontSize: 12 }}
                  axisLine={{ stroke: 'oklch(0.35 0.02 260 / 0.5)' }}
                  label={{ value: 'f(x)', angle: -90, position: 'insideLeft', fill: 'oklch(0.65 0.02 260)' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="y"
                  stroke="url(#lineGradient)"
                  strokeWidth={3}
                  dot={false}
                  filter="url(#glow)"
                />
                <Scatter
                  dataKey="dataPoint"
                  fill="oklch(0.75 0.15 195)"
                  stroke="oklch(0.95 0.01 260)"
                  strokeWidth={2}
                  r={8}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Chart legend */}
          <div className="flex items-center justify-center gap-8 mt-4 pt-4 border-t border-border/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 rounded-full bg-gradient-to-r from-primary to-secondary" />
              <span className="text-xs text-muted-foreground">Interpolated Curve</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary border-2 border-foreground" />
              <span className="text-xs text-muted-foreground">Data Points</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
