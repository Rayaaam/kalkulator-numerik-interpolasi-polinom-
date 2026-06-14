import { User } from "lucide-react";
import Image from "next/image"; // <-- Import Image dari Next.js

interface TeamCardProps {
  name: string;
  npm: string;
  index: number;
  imageUrl?: string; 
}

export function TeamCard({ name, npm, index, imageUrl }: TeamCardProps) {
  return (
    <div 
      className="group relative p-6 rounded-3xl bg-card/50 backdrop-blur-xl border border-border hover:border-primary/50 transition-all duration-500 hover:bg-card/70 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Subtle glow on hover */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative flex flex-col items-center gap-4">
        {/* Avatar Area */}
        <div className="relative">
          {/* Tambahin overflow-hidden dan relative biar fotonya ngikutin buletan */}
          <div className="w-20 h-20 rounded-full bg-muted/80 flex items-center justify-center border border-border group-hover:border-primary/30 transition-colors duration-300 overflow-hidden relative">
            {imageUrl ? (
              <Image 
                src={imageUrl} 
                alt={`Foto ${name}`} 
                fill
                unoptimized
                className="object-cover" 
              />
            ) : (
              <User className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
            )}
          </div>
          {/* Avatar ring glow */}
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        </div>

        {/* Name */}
        <h3 className="text-lg font-semibold text-foreground text-center">
          {name}
        </h3>

        {/* NPM Badge */}
        <div className="px-3 py-1.5 rounded-full bg-muted/60 backdrop-blur-sm border border-border">
          <span className="text-xs text-muted-foreground font-mono tracking-wide">
            NPM: {npm}
          </span>
        </div>
      </div>
    </div>
  );
}