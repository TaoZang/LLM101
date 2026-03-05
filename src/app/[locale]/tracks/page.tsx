import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { tracks, trackMeta } from "@/lib/tracks";
import { getLessons } from "@/lib/content";

export default async function TracksPage() {
  const locale = await getLocale();
  const t = await getTranslations("tracks");
  const meta = trackMeta[locale] ?? trackMeta.zh;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{t("title")}</h1>
      <div className="space-y-4">
        {tracks.map((track) => {
          const m = meta[track.slug];
          if (!m) return null;
          const lessons = getLessons(locale, track.slug);
          return (
            <Link
              key={track.slug}
              href={`/tracks/${track.slug}`}
              className="flex items-start gap-4 p-6 rounded-xl border border-stone-200 hover:border-stone-300 hover:shadow-sm transition-all bg-white"
            >
              <div
                className="w-3 h-3 rounded-full mt-1.5 shrink-0"
                style={{ backgroundColor: track.color }}
              />
              <div>
                <h2 className="font-semibold text-lg mb-1">{m.title}</h2>
                <p className="text-sm text-stone-500 mb-2">{m.description}</p>
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
