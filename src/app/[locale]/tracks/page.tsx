import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { tracks, trackMeta } from "@/lib/tracks";
import { getLessons } from "@/lib/content";

export default async function TracksPage() {
  const locale = await getLocale();
  const t = await getTranslations("tracks");
  const meta = trackMeta[locale] ?? trackMeta.zh;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">{t("title")}</h1>
      <div className="space-y-1">
        {tracks.map((track) => {
          const m = meta[track.slug];
          if (!m) return null;
          const lessons = getLessons(locale, track.slug);
          return (
            <Link
              key={track.slug}
              href={`/tracks/${track.slug}`}
              className="focus-ring flex items-start gap-4 py-5 px-4 -mx-4 rounded-lg hover:bg-white/70 transition-colors"
            >
              <div
                className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0"
                style={{ backgroundColor: track.color }}
              />
              <div className="min-w-0">
                <h2 className="font-semibold text-lg mb-1">{m.title}</h2>
                <p className="text-sm text-stone-500 mb-2 leading-relaxed">
                  {m.description}
                </p>
                <span className="text-xs text-stone-400">
                  {lessons.length > 0
                    ? `${lessons.length} ${t("lessons")}`
                    : t("comingSoon")}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
