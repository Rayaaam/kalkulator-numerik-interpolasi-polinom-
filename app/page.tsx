"use client";

import { useState } from "react";
import { Navigation, type NavItem } from "@/components/navigation";
import { HomeView } from "@/components/views/home-view";
import { InputView } from "@/components/views/input-view";
import { ResultsView } from "@/components/views/results-view";
// Import fungsi matematika dari folder lib
import { hitungLagrange, hitungNewton, hitungNewtonGregory, hitungNewtonGregoryMundur, type Point } from "@/lib/interpolations";

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavItem>("home");

  // State baru buat nampung hasil hitungan dan dikirim ke ResultsView
  const [hasilHitung, setHasilHitung] = useState<any>(null);

  const handleGetStarted = () => {
    setActiveTab("input");
  };

  // Fungsi ini sekarang nerima data (titik, targetX, dan metode) dari InputView
  const handleCalculate = (
    points: Point[],
    targetX: number,
    method: string,
  ) => {
    // Cek kalau usernya milih metode Lagrange
    if (method === "lagrange") {
      const hasil = hitungLagrange(points, targetX);
      setHasilHitung({
        ...hasil,
        method: method,
        points: points,
        
      });
    } 
    // Cek kalau usernya milih metode Newton
    else if (method === "newton") { 
      const hasil = hitungNewton(points, targetX);
      setHasilHitung({
        ...hasil,
        method: method,
        points: points,
        
      });
    }
    // Cek kalau usernya milih metode Newton-gregory
    else if (method === "newton-gregory") { 
      const hasil = hitungNewtonGregory(points, targetX);
      setHasilHitung({
        ...hasil,
        method: method,
        points: points,
      });
    }
    // Cek kalau usernya milih metode Newton-gregory mundur
    else if (method === "newton-gregory-mundur") { 
      const hasil = hitungNewtonGregoryMundur(points, targetX);
      setHasilHitung({
        ...hasil,
        method: method,
        points: points,
      });
    }

    // Pindah ke tab Results setelah beres ngitung
    setActiveTab("results");
  };

  const handleGoToInput = () => {
    setActiveTab("input");
  };

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "home" && <HomeView onGetStarted={handleGetStarted} />}
      {/* Kita passing fungsi handleCalculate yang udah di-upgrade ke InputView */}
      {activeTab === "input" && <InputView onCalculate={handleCalculate} />}
      {/* Kita lempar data hasilHitung ke ResultsView biar bisa digambar grafiknya */}
      {activeTab === "results" && (
        <ResultsView onGoToInput={handleGoToInput} dataHasil={hasilHitung} />
      )}
    </main>
  );
}
