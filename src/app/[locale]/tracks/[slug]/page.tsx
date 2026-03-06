import { getTranslations, getLocale } from "next-intl/server";
import { tracks, trackMeta } from "@/lib/tracks";
import { getLessons } from "@/lib/content";
import { notFound } from "next/navigation";
import { redirect } from "@/i18n/navigation";

export default async function TrackPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations("tracks");
  const meta = trackMeta[locale]?.[slug];
  const track = tracks.find((t) => t.slug === slug);

  if (!meta || !track) notFound();

  const lessons = getLessons(locale, slug);

  if (lessons.length > 0) {
    redirect({ href: `/tracks/${slug}/${lessons[0].slug}`, locale });
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: track.color }}
        />
        <h1 className="text-3xl font-bold">{meta.title}</h1>
      </div>
      <p className="text-stone-500 mb-10">{meta.description}</p>
      <div className="text-center py-16 text-stone-400">
        {t("comingSoon")}
      </div>
    </div>
  );
}
