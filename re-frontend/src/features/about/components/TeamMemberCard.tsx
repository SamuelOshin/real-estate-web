import Image from "next/image";
import { Card } from "@/components/ui";

export interface TeamMember {
  name: string;
  role: string;
  certification: string;
  bio: string;
  tag: string;
  imageUrl?: string;
}

export interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <Card elevation="interactive" padding="none" className="overflow-hidden flex flex-col h-full">
      <div className="relative h-64 w-full overflow-hidden bg-surface-tint">
        {member.imageUrl ? (
          <Image
            src={member.imageUrl}
            alt={member.name}
            fill
            className="object-cover object-top transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-surface-tint text-primary font-display text-headline-lg">
            {member.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
        )}
        <div className="absolute bottom-3 left-3 bg-primary/90 backdrop-blur-md px-2.5 py-1 rounded text-white font-body text-label-caps tracking-wider uppercase shadow-sm">
          {member.certification}
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-display text-headline-sm text-primary">{member.name}</h3>
          <p className="font-body text-label-md text-secondary font-semibold mt-0.5">{member.role}</p>
          <p className="font-body text-body-sm text-text-muted mt-3 leading-relaxed">
            {member.bio}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-border flex items-center gap-1.5 text-text-muted font-body text-label-caps uppercase tracking-wider">
          <span className="material-symbols-outlined text-sm text-secondary">verified</span>
          <span>{member.tag}</span>
        </div>
      </div>
    </Card>
  );
}
