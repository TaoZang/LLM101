import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { tracks, trackMeta } from "@/lib/tracks";
import { getLessons } from "@/lib/content";
import { notFound } from "next/navigation";

export default async function TrackPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations("tracks");
  const tCommon = await getTranslations("common");
  const meta = trackMeta[locale]?.[slug];
  const track = tracks.find((t) => t.slug === slug);

  if (!meta || !track) notFound();

  const lessons = getLessons(locale, slug);

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/tracks"
          className="text-sm text-stone-400 hover:text-stone-600 transition-colors"
        >
          {tCommon("backToTrack")}
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: track.color }}
        />
        <h1 className="text-3xl font-bold">{meta.title}</h1>
      </div>
      <p className="text-stone-500 mb-10">{meta.description}</p>

      {lessons.length === 0 ? (
        <div className="text-center py-16 text-stone-400">
          {t("comingSoon")}
        </div>
      ) : (
        <ol className="space-y-3">
          {lessons.map((lesson, i) => (
            <li key={lesson.slug}>
              <Link
                href={`/tracks/${slug}/${lesson.slug}`}
                className="flex items-center gap-4 p-4 rounded-lg border border-stone-200 hover:border-stone-300 hover:shadow-sm transition-all bg-white"
              >
                <span className="text-sm text-stone-400 w-6 text-right">
                  {i + 1}
                </span>
                <span className="font-medium">{lesson.title}</span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
