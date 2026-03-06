import { getTranslations } from "next-intl/server";

export default async function GlossaryPage() {
  const tNav = await getTranslations("nav");
  const t = await getTranslations("tracks");

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">{tNav("glossary")}</h1>
      <div className="text-center py-16 text-stone-400">{t("comingSoon")}</div>
    </div>
  );
}
