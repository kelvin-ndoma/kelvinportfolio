"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { isActivePath } from "./nav-links";

type Item = { readonly href: string; readonly label: string };

export function MobileNav({ items }: { items: readonly Item[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const links = [...items, { href: "/resume", label: "Resume" }];

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="inline-flex size-10 items-center justify-center text-paper md:hidden"
        aria-label="Open menu"
      >
        <Menu className="size-5" strokeWidth={1.25} aria-hidden />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-paper/10 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-0 z-[70] flex flex-col bg-ink px-6 pb-10 outline-none">
          <div className="flex h-[4.5rem] items-center justify-between">
            <Dialog.Title className="label text-accent">{site.wordmark}</Dialog.Title>
            <Dialog.Close className="inline-flex size-10 items-center justify-center text-paper" aria-label="Close menu">
              <X className="size-5" strokeWidth={1.25} aria-hidden />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
          <nav aria-label="Mobile" className="mt-10 flex-1">
            <ul className="space-y-2">
              {links.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block py-3 font-display text-4xl font-light tracking-tight",
                        active ? "text-accent" : "text-paper",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <a href={`mailto:${site.email}`} className="label text-accent">
            {site.email}
          </a>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
