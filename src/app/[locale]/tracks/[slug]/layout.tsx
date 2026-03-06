import { getLocale } from "next-intl/server";
import { tracks, trackMeta } from "@/lib/tracks";
import { getLessons } from "@/lib/content";
import { TrackSidebar } from "@/components/track-sidebar";
import { notFound } from "next/navigation";

export default async function TrackLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const meta = trackMeta[locale]?.[slug];
  const track = tracks.find((t) => t.slug === slug);

  if (!meta || !track) notFound();

  const lessons = getLessons(locale, slug);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 flex gap-12">
      <TrackSidebar
        trackSlug={slug}
        trackTitle={meta.title}
        trackColor={track.color}
        lessons={lessons}
      />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
