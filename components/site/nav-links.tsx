"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

type Item = { readonly href: string; readonly label: string };

export function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLinks({ items }: { items: readonly Item[] }) {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-8">
      {items.map((item) => {
        const active = isActivePath(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative text-sm font-light tracking-wide text-muted transition-colors hover:text-paper",
                "after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300",
                active && "text-paper after:scale-x-100",
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
