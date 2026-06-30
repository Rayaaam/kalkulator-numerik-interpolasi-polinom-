// lib/interpolations.ts
// tipe data khusus buat nyimpen koordinat X dan Y
export type Point = {
  x: number;
  y: number;
};

// Fungsi utama Polinom Lagrange
export function hitungLagrange(points: Point[], targetX: number) {
  let resultY = 0;
  const langkahLi = []; // Buat nyimpen teks penjabaran L0, L1, dst buat UI

  for (let i = 0; i < points.length; i++) {
    let L_i = 1;
    let pembilang = [];
    let penyebut = [];

    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        // Rumus matematika L_i
        L_i *= (targetX - points[j].x) / (points[i].x - points[j].x);

        // Cuma buat nyimpen teks biar bisa ditampilin di layar
        pembilang.push(`(${targetX} - ${points[j].x})`);
        penyebut.push(`(${points[i].x} - ${points[j].x})`);
      }
    }

    // Tambahin hasil L_i * Y_i ke total akhir
    resultY += L_i * points[i].y;

    // Simpan string penjabaran ke array
    langkahLi.push(
      `L${i}(x) = ${pembilang.join("")} / ${penyebut.join("")} = ${L_i.toFixed(4)}`,
    );
  }

  // Balikin nilai target, hasil Y, dan langkah-langkahnya
  return {
    targetX,
    resultY,
    langkahLi,
  };
}
// Fungsi utama Polinom newton
export function hitungNewton(
  points: { x: number; y: number }[],
  targetX: number,
) {
  const n = points.length;

  // 1. Bikin matriks 2D buat nyimpen Tabel Selisih Terbagi (ST)
  const st: number[][] = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));

  // 2. Isi kolom pertama (Y / orde 0) dengan data titik asli
  for (let i = 0; i < n; i++) {
    st[i][0] = points[i].y;
  }

  // 3. Hitung Selisih Terbagi buat kolom-kolom berikutnya (Δ¹, Δ², Δ³)
  for (let j = 1; j < n; j++) {
    for (let i = 0; i < n - j; i++) {
      st[i][j] =
        (st[i + 1][j - 1] - st[i][j - 1]) / (points[i + j].x - points[i].x);
    }
  }

  // 4. Hitung hasil prediksi Y pakai rumus Newton
  let resultY = st[0][0]; // Ambil ujung atas kiri tabel (a0)
  let term = 1;
  let equationString = `P(x) = ${st[0][0].toFixed(4)}`;

  for (let i = 1; i < n; i++) {
    term *= targetX - points[i - 1].x;
    resultY += st[0][i] * term; // st[0][i] itu koefisien a1, a2, a3, dst.

    // Bikin string penjabaran rumus dinamis buat ditampilin di UI
    let termStr = "";
    for (let k = 0; k < i; k++) {
      termStr += `(x - ${points[k].x})`;
    }
    const koefisien = st[0][i];
    const sign = koefisien >= 0 ? "+" : "-";
    equationString += ` ${sign} ${Math.abs(koefisien).toFixed(4)}${termStr}`;
  }

  // 5. Format hasil tabel ST biar rapi pas dikirim ke UI
  const dividedDifferenceTable = points.map((p, i) => ({
    i: i,
    x: p.x,
    y: st[i][0].toFixed(4),
    // baris bawah yang kosong diganti tanda strip "—"
    d1: i + 1 < n ? st[i][1].toFixed(4) : "—",
    d2: i + 2 < n ? st[i][2].toFixed(4) : "—",
    d3: i + 3 < n ? st[i][3].toFixed(4) : "—",
  }));

  return {
    method: "newton",
    targetX,
    resultY,
    equationString,
    dividedDifferenceTable,
  };
}
// Newton Gregory
export function hitungNewtonGregory(
  points: { x: number; y: number }[],
  targetX: number,
) {
  const n = points.length;
  // Bikin matriks buat Tabel Selisih Maju
  const st: number[][] = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));

  // Hitung 'h' (jarak antar titik X). Asumsi jarak X selalu konstan.
  const h = n > 1 ? points[1].x - points[0].x : 1;

  for (let i = 0; i < n; i++) {
    st[i][0] = points[i].y;
  }

  // Tabel Selisih Maju (Tanpa pembagian X!)
  for (let j = 1; j < n; j++) {
    for (let i = 0; i < n - j; i++) {
      st[i][j] = st[i + 1][j - 1] - st[i][j - 1];
    }
  }

  // Hitung nilai s = (x - x0) / h
  const s = (targetX - points[0].x) / h;
  let resultY = st[0][0];
  let sTerm = 1;
  let fact = 1;

  let equationString = `P(x) = ${st[0][0].toFixed(4)}`;

  for (let i = 1; i < n; i++) {
    sTerm *= s - (i - 1);
    fact *= i;
    const termValue = (st[0][i] * sTerm) / fact;
    resultY += termValue;

    // Bikin string penjabaran rumus (pakai variabel s)
    let sEq = "s";
    for (let k = 1; k < i; k++) {
      sEq += `(s - ${k})`;
    }
    const koefisien = st[0][i] / fact;
    const sign = koefisien >= 0 ? "+" : "-";
    equationString += ` ${sign} ${Math.abs(koefisien).toFixed(4)}${sEq}`;
  }

  // data tabel buat UI
  const dividedDifferenceTable = points.map((p, i) => ({
    i: i,
    x: p.x,
    y: st[i][0].toFixed(4),
    d1: i + 1 < n ? st[i][1].toFixed(4) : "—",
    d2: i + 2 < n ? st[i][2].toFixed(4) : "—",
    d3: i + 3 < n ? st[i][3].toFixed(4) : "—",
  }));

  return {
    method: "newton-gregory",
    targetX,
    resultY,
    equationString,
    sValue: s, // kirim nilai 's' buat ditampilin di rumus
    dividedDifferenceTable,
  };
}
// Newton Gregory Mundur
export function hitungNewtonGregoryMundur(
  points: { x: number; y: number }[],
  targetX: number,
) {
  const n = points.length;
  // Bikin matriks buat Tabel Selisih Mundur
  const st: number[][] = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));
  const h = n > 1 ? points[1].x - points[0].x : 1;

  for (let i = 0; i < n; i++) {
    st[i][0] = points[i].y;
  }

  // Tabel Selisih Mundur (Ngitungnya dari bawah ke atas)
  for (let j = 1; j < n; j++) {
    for (let i = n - 1; i >= j; i--) {
      st[i][j] = st[i][j - 1] - st[i - 1][j - 1];
    }
  }

  // Target s patokannya dari X paling akhir (xn)
  const xn = points[n - 1].x;
  const s = (targetX - xn) / h;

  // Ambil nilai awalan dari ujung bawah kanan tabel (st[n-1][0])
  let resultY = st[n - 1][0];
  let sTerm = 1;
  let fact = 1;

  let equationString = `P(x) = ${st[n - 1][0].toFixed(4)}`;

  for (let i = 1; i < n; i++) {
    sTerm *= s + (i - 1); // Kalau mundur, ininya ditambah (+)
    fact *= i;
    const termValue = (st[n - 1][i] * sTerm) / fact;
    resultY += termValue;

    // string penjabaran rumus
    let sEq = "s";
    for (let k = 1; k < i; k++) {
      sEq += `(s + ${k})`; //  mundur jadi (s + k)
    }
    const koefisien = st[n - 1][i] / fact;
    const sign = koefisien >= 0 ? "+" : "-";
    equationString += ` ${sign} ${Math.abs(koefisien).toFixed(4)}${sEq}`;
  }

  // hasil data tabel UI (segitiga siku-siku kebalikan)
  const dividedDifferenceTable = points.map((p, i) => {
    let rowData: any = {
      i: i - (n - 1),
      x: p.x,
      y: st[i][0].toFixed(4),
    };

    // Looping dinamis bikin d1, d2, d3, d4, dst sesuai jumlah data (n)
    for (let col = 1; col < n; col++) {
      rowData[`d${col}`] = i >= col ? st[i][col].toFixed(4) : "-";
    }

    return rowData;
  });

  return {
    method: "newton-gregory-mundur",
    targetX,
    resultY,
    equationString,
    sValue: s,
    dividedDifferenceTable,
  };
}
