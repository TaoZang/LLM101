"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export function Header() {
  const t = useTranslations("nav");
  const tSite = useTranslations("site");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale() {
    const next = locale === "zh" ? "en" : "zh";
    router.replace(pathname, { locale: next });
  }

  return (
    <header className="border-b border-stone-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <nav className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg tracking-tight">
          {tSite("title")}
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link
            href="/tracks"
            className="text-stone-600 hover:text-stone-900 transition-colors"
          >
            {t("tracks")}
          </Link>
          <button
            onClick={switchLocale}
            className="text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
          >
            {locale === "zh" ? "EN" : "中文"}
          </button>
        </div>
      </nav>
    </header>
  );
}
