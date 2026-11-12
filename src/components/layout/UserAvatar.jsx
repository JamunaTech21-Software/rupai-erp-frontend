import { useEffect, useState } from "react";

// First letters of the first two words of the name: "Md. Saadi" gives "MS", "Administrator" gives "A".
const initialsOf = (name) =>
  String(name ?? "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("") || "?";

// The user's photo, or a circle with their initials when there is none (or the photo cannot be loaded).
export default function UserAvatar({ user, className = "h-9 w-9" }) {
  const [broken, setBroken] = useState(false);
  useEffect(() => setBroken(false), [user?.photoUrl]);

  if (user?.photoUrl && !broken) {
    return (
      <img
        src={user.photoUrl}
        alt={user.name ?? "User"}
        onError={() => setBroken(true)}
        className={`${className} shrink-0 rounded-full object-cover ring-2 ring-primary/20`}
      />
    );
  }
  return (
    <span
      aria-label={user?.name ?? "User"}
      className={`${className} flex shrink-0 select-none items-center justify-center rounded-full bg-primary text-xs font-semibold text-white ring-2 ring-primary/20 sm:text-sm`}
    >
      {initialsOf(user?.name)}
    </span>
  );
}
