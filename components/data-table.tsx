"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Plus } from "lucide-react";

interface DataPoint {
  id: number;
  x: number;
  y: number;
}

interface DataTableProps {
  data: DataPoint[];

  onEdit?: (id: number, field: "x" | "y", value: string) => void;
  onDelete?: (id: number) => void;
  onAddNew?: () => void;
}

export function DataTable({
  data,
  onEdit,
  onDelete,
  onAddNew,
}: DataTableProps) {
  return (
    <div className="space-y-4">
      {/* Table card */}
      <div className="rounded-2xl bg-card/60 backdrop-blur-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-semibold">
                No
              </TableHead>
              <TableHead className="text-muted-foreground font-semibold">
                X Value
              </TableHead>
              <TableHead className="text-muted-foreground font-semibold">
                Y Value
              </TableHead>
              <TableHead className="text-muted-foreground font-semibold text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((point, index) => (
              <TableRow key={point.id} className="border-border">
                <TableCell className="text-foreground font-medium">
                  {index + 1}
                </TableCell>

                {/* 2. Span X ganti jadi tag <input> biar bisa diketik */}
                <TableCell className="text-foreground">
                  <input
                    type="number"
                    value={point.x}
                    onChange={(e) => onEdit?.(point.id, "x", e.target.value)}
                    className="w-24 px-3 py-1 rounded-lg bg-primary/10 text-primary font-mono outline-none focus:ring-2 focus:ring-primary/50 transition-all bg-transparent"
                  />
                </TableCell>

                {/* 3. Span Y ganti jadi tag <input> juga */}
                <TableCell className="text-foreground">
                  <input
                    type="number"
                    value={point.y}
                    onChange={(e) => onEdit?.(point.id, "y", e.target.value)}
                    className="w-24 px-3 py-1 rounded-lg bg-secondary/20 text-secondary font-mono outline-none focus:ring-2 focus:ring-secondary/50 transition-all bg-transparent"
                  />
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    {/* Tombol Delete  */}
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => onDelete?.(point.id)}
                      className="rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add new button */}
      <Button
        variant="outline"
        onClick={onAddNew}
        className="w-full rounded-2xl py-6 border-dashed border-2 border-border bg-card/30 backdrop-blur-md hover:bg-card/60 hover:border-primary/50 transition-all duration-300 group"
      >
        <Plus className="w-5 h-5 mr-2 text-muted-foreground group-hover:text-primary transition-colors" />
        <span className="text-muted-foreground group-hover:text-foreground transition-colors">
          Tambah Titik Data Baru
        </span>
      </Button>
    </div>
  );
}
