import { TeamCard } from "./team-card";
import { Users } from "lucide-react";

// 1. Tambahin properti imageUrl di sini
const teamMembers = [
  {
    name: "Muhammad Aufa Al achdan",
    npm: "2403010063",
    imageUrl: "/image/aufa.jpeg",
  },
  {
    name: "Muhammad Raya Ramadhan",
    npm: "2403010065",
    imageUrl: "/image/rayai.png",
  },
  {
    name: "Irfan Nurpadilah Akbar",
    npm: "2403010069",
    imageUrl: "/image/irfan.jpeg",
  },
];

export function TeamSection() {
  return (
    <section className="relative px-6 py-20">
      {/* Background gradient accent */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 backdrop-blur-md border border-border">
            <Users className="w-4 h-4 text-secondary" />
            <span className="text-sm text-muted-foreground">Tim Kami</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Developers
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Sistem ini dibuat untuk memenuhi Tugas Akhir Mata Kuliah Metode
            Numerik
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <TeamCard
              key={member.npm}
              name={member.name}
              npm={member.npm}
              index={index}
              imageUrl={
                member.imageUrl
              } /* 2. Lempar prop imageUrl-nya ke Card di sini bro! */
            />
          ))}
        </div>
      </div>
    </section>
  );
}
