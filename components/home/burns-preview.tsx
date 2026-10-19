import Link from "next/link";
import { ClipboardList, ListTodo, Users, ChartColumnIncreasing } from "lucide-react";
import { burnsBrothersPreview } from "@/content/site";

const icons = [ClipboardList, ListTodo, Users, ChartColumnIncreasing] as const;

/**
 * Editorial product preview for The Burns Brothers Task Manager —
 * Planning, Tasks, Team, Progress (verified product areas, not a fake screenshot).
 */
export function BurnsPreview() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[28rem] lg:max-w-none">
      {/* Soft overlapping ellipses */}
      <div
        aria-hidden
        className="absolute inset-[8%] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, color-mix(in srgb, var(--color-accent) 22%, transparent), transparent 62%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-[18%] rounded-full border border-line/40 opacity-60"
      />
      <div
        aria-hidden
        className="absolute inset-[28%] rounded-full border border-line-soft opacity-80"
        style={{
          background:
            "radial-gradient(circle at 60% 55%, color-mix(in srgb, var(--color-line) 18%, transparent), transparent 70%)",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
        <ul className="relative z-10 w-full max-w-[15.5rem] space-y-2.5">
          {burnsBrothersPreview.map((item, i) => {
            const Icon = icons[i];
            return (
              <li key={item.label}>
                <Link
                  href="/work/burns-brothers-task-manager"
                  className="group flex items-center gap-3 rounded-2xl border border-line-soft/80 bg-surface-raised/75 px-3.5 py-3 shadow-[0_8px_30px_-12px_rgba(36,28,23,0.18)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-xl border border-line-soft bg-ink/60 text-accent">
                    <Icon className="size-3.5" strokeWidth={1.5} aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-light tracking-wide text-paper">{item.label}</span>
                    <span className="block truncate text-[0.7rem] font-light text-muted">{item.detail}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="absolute bottom-2 left-0 right-0 text-center label text-subtle">
        The Burns Brothers Task Manager
      </p>
    </div>
  );
}
