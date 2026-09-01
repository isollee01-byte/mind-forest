"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Home, Music2, Trees } from "lucide-react";

const LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/meditate", label: "Meditate", icon: Compass },
  { href: "/journey", label: "Journey", icon: Trees },
  { href: "/music", label: "Music", icon: Music2 },
];

export function AppNav() {
  const pathname = usePathname();

  if (pathname.startsWith("/meditate/play")) return null;

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 hidden md:block">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="pointer-events-auto font-medium tracking-wide text-white/90 transition duration-500 hover:text-white"
          >
            마음숲
          </Link>
          <nav className="pointer-events-auto glass flex gap-1 rounded-full px-2 py-1">
            {LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm transition duration-500 ${
                    active
                      ? "bg-white/15 text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <nav className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-2 md:hidden">
        <div className="glass mx-auto grid max-w-md grid-cols-4 rounded-2xl p-1">
          {LINKS.map((link) => {
            const Icon = link.icon;
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[11px] transition duration-500 ${
                  active ? "bg-white/14 text-white" : "text-white/65"
                }`}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
