import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { tracks, trackMeta } from "@/lib/tracks";

export default async function HomePage() {
  const locale = await getLocale();
  const t = await getTranslations("home");
  const meta = trackMeta[locale] ?? trackMeta.zh;

  return (
    <div>
      <section className="py-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">{t("hero")}</h1>
        <p className="text-lg text-stone-500 mb-8 max-w-2xl mx-auto">
          {t("heroSub")}
        </p>
        <Link
          href="/tracks"
          className="inline-block px-6 py-3 bg-stone-900 text-white rounded-lg text-sm font-medium hover:bg-stone-800 transition-colors"
        >
          {t("startLearning")}
        </Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {tracks.map((track) => {
          const m = meta[track.slug];
          if (!m) return null;
          return (
            <Link
              key={track.slug}
              href={`/tracks/${track.slug}`}
              className="block p-6 rounded-xl border border-stone-200 hover:border-stone-300 hover:shadow-sm transition-all bg-white"
            >
              <div
                className="w-2 h-2 rounded-full mb-3"
                style={{ backgroundColor: track.color }}
              />
              <h3 className="font-semibold mb-1">{m.title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                {m.description}
              </p>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
