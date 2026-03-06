"use client";

import { useState, useEffect } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import type { LessonMeta } from "@/lib/content";

interface TrackSidebarProps {
  trackSlug: string;
  trackTitle: string;
  trackColor: string;
  lessons: LessonMeta[];
}

function SidebarContent({
  trackSlug,
  trackTitle,
  trackColor,
  lessons,
  onNavigate,
}: TrackSidebarProps & { onNavigate?: () => void }) {
  const pathname = usePathname();

  const isTrackHome =
    pathname === `/tracks/${trackSlug}` ||
    pathname === `/tracks/${trackSlug}/`;

  return (
    <nav className="space-y-1">
      <Link
        href={`/tracks/${trackSlug}`}
        onClick={onNavigate}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
          isTrackHome
            ? "text-stone-900"
            : "text-stone-500 hover:text-stone-900"
        }`}
      >
        <div
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: trackColor }}
        />
        {trackTitle}
      </Link>

      <div className="pl-4 pt-2 space-y-0.5">
        {lessons.map((lesson, i) => {
          const href = `/tracks/${trackSlug}/${lesson.slug}`;
          const isActive = pathname === href;

          return (
            <Link
              key={lesson.slug}
              href={href}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-3 py-1.5 rounded-md text-sm transition-colors ${
                isActive
                  ? "text-stone-900 font-medium"
                  : "text-stone-400 hover:text-stone-700"
              }`}
            >
              <span className="w-4 text-right text-xs shrink-0">{i + 1}</span>
              <span className="leading-snug">{lesson.title}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function TrackSidebar(props: TrackSidebarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (drawerOpen) {
      requestAnimationFrame(() => setMounted(true));
      document.body.style.overflow = "hidden";
    } else {
      setMounted(false);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  function close() {
    setMounted(false);
    setTimeout(() => setDrawerOpen(false), 200);
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="w-64 shrink-0 hidden lg:block">
        <div className="sticky top-20">
          <SidebarContent {...props} />
        </div>
      </aside>

      {/* Mobile drawer trigger */}
      <div className="lg:hidden fixed top-16 left-0 z-40">
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-1.5 m-2 px-3 py-1.5 text-sm text-stone-500 bg-white/70 backdrop-blur-sm rounded-lg hover:text-stone-700 hover:bg-white/90 transition-all cursor-pointer"
          aria-label="Open navigation"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="15" y2="12" />
            <line x1="3" y1="18" x2="18" y2="18" />
          </svg>
          <span>{props.trackTitle}</span>
        </button>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div
          className={`lg:hidden fixed inset-0 z-50 transition-colors duration-200 ${
            mounted ? "bg-black/20" : "bg-black/0"
          }`}
          onClick={close}
        >
          <div
            className={`absolute left-0 top-0 h-full w-72 bg-stone-50 shadow-xl p-6 pt-4 overflow-y-auto transition-transform duration-200 ease-out ${
              mounted ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-4">
              <button
                onClick={close}
                className="text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                aria-label="Close navigation"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <SidebarContent {...props} onNavigate={close} />
          </div>
        </div>
      )}
    </>
  );
}
