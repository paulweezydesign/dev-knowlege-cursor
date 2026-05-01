import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar";
import { initials } from "@/lib/format";
import { personById } from "@/lib/data";
import { cn } from "@/lib/utils";

interface TeamAvatarsProps {
  ids: string[];
  size?: "default" | "sm" | "lg";
  max?: number;
  className?: string;
}

export function TeamAvatars({
  ids,
  size = "sm",
  max = 4,
  className,
}: TeamAvatarsProps) {
  const visible = ids.slice(0, max);
  const overflow = ids.length - visible.length;

  return (
    <AvatarGroup data-size={size} className={cn(className)}>
      {visible.map((id) => {
        const person = personById(id);
        return (
          <Avatar key={id} size={size} title={person.name}>
            <AvatarFallback
              className={cn(
                "bg-gradient-to-br text-white",
                person.avatarColor ?? "from-zinc-400 to-zinc-600"
              )}
            >
              {initials(person.name)}
            </AvatarFallback>
          </Avatar>
        );
      })}
      {overflow > 0 && <AvatarGroupCount>+{overflow}</AvatarGroupCount>}
    </AvatarGroup>
  );
}
