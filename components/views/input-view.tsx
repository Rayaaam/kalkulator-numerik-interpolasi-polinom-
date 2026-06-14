"use client";

import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { ConfigSidebar } from "@/components/config-sidebar";
import { Database } from "lucide-react";

import { type Point } from "@/lib/interpolations"; 

interface InputViewProps {
  
  onCalculate?: (points: Point[], targetX: number, method: string) => void;
}

const initialData = [
  { id: 1, x: 1.0, y: 2.5 },
  { id: 2, x: 2.0, y: 4.0 },
  { id: 3, x: 3.0, y: 5.2 },
  { id: 4, x: 4.0, y: 7.8 },
];

export function InputView({ onCalculate }: InputViewProps) {
  const [data, setData] = useState(initialData);

  const handleEdit = (id: number, field: "x" | "y", value: string) => {
    // Ubah inputan string jadi angka
    const numValue = value === "" ? 0 : parseFloat(value);
    
    setData(
      data.map((point) => 
        point.id === id ? { ...point, [field]: numValue } : point
      )
    );
  };

  const handleDelete = (id: number) => {
    setData(data.filter((point) => point.id !== id));
  };

  const handleAddNew = () => {
    // Cari ID paling gede biar pas nambah baris nggak ada ID yang kembar
    const nextId = data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1;
    
    // Tambahin baris baru dengan nilai default X=0, Y=0
    setData([...data, { id: nextId, x: 0, y: 0 }]);
  };

  const handleCalculate = (targetX: number, method: string) => {
    console.log("Calculate:", { targetX, method, data });
    onCalculate?.(data, targetX, method);
  };

  return (
    <div className="relative min-h-screen px-6 py-8">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-20 -right-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Page header */}
        <div className="mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 backdrop-blur-md border border-border">
            <Database className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Data Management
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Input Data Points
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Tambahkan titik data (pasangan X, Y) untuk interpolasi. Semakin akurat data,
            semakin baik prediksinya.
          </p>
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Data Table (2/3 width) */}
          <div className="lg:col-span-2">
            <DataTable
              data={data}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAddNew={handleAddNew}
            />
          </div>

          {/* Right: Configuration Sidebar (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <ConfigSidebar onCalculate={handleCalculate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
