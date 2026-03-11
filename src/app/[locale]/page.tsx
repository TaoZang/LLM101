import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { tracks, trackMeta } from "@/lib/tracks";

export default async function HomePage() {
  const locale = await getLocale();
  const t = await getTranslations("home");
  const meta = trackMeta[locale] ?? trackMeta.zh;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <section className="py-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {t("hero")}
        </h1>
        <p className="text-lg text-stone-500 mb-8 max-w-2xl mx-auto leading-relaxed">
          {t("heroSub")}
        </p>
        <Link
          href="/tracks"
          className="focus-ring inline-block px-6 py-3 bg-stone-900 text-white rounded-lg text-sm font-medium hover:bg-stone-800 active:bg-stone-950 transition-colors"
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
              className="focus-ring block p-5 rounded-xl bg-white/70 border border-stone-200/60 hover:bg-white hover:border-stone-300 hover:shadow-sm transition-all"
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
