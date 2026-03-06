import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getLesson, getLessons } from "@/lib/content";
import { trackMeta } from "@/lib/tracks";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string; lesson: string }>;
}) {
  const { locale, slug, lesson: lessonSlug } = await params;
  const lessonData = getLesson(locale, slug, lessonSlug);
  if (!lessonData) return {};
  return { title: lessonData.title };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lesson: string }>;
}) {
  const { slug, lesson: lessonSlug } = await params;
  const locale = await getLocale();
  const t = await getTranslations("common");
  const meta = trackMeta[locale]?.[slug];
  const lessonData = getLesson(locale, slug, lessonSlug);

  if (!lessonData || !meta) notFound();

  const lessons = getLessons(locale, slug);
  const currentIndex = lessons.findIndex((l) => l.slug === lessonSlug);
  const prev = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const next =
    currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  return (
    <div>
      <article className="prose">
        <h1>{lessonData.title}</h1>
        <MDXRemote source={lessonData.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </article>

      <nav className="flex justify-between mt-16 pt-8 border-t border-stone-200">
        {prev ? (
          <Link
            href={`/tracks/${slug}/${prev.slug}`}
            className="text-sm text-stone-500 hover:text-stone-900 transition-colors"
          >
            {t("prev")}: {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/tracks/${slug}/${next.slug}`}
            className="text-sm text-stone-500 hover:text-stone-900 transition-colors"
          >
            {t("next")}: {next.title}
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
