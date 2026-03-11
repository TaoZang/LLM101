import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export interface LessonMeta {
  slug: string;
  title: string;
  order: number;
  tags?: string[];
  prerequisites?: string[];
}

export interface Lesson extends LessonMeta {
  content: string;
}

export function getLessons(locale: string, trackSlug: string): LessonMeta[] {
  const dir = path.join(contentDir, locale, "tracks", trackSlug);

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data } = matter(raw);
      return {
        slug: file.replace(/\.mdx$/, "").replace(/^\d+-/, ""),
        title: data.title ?? file,
        order: data.order ?? 0,
        tags: data.tags,
        prerequisites: data.prerequisites,
      };
    })
    .sort((a, b) => a.order - b.order);
}

export function getLesson(
  locale: string,
  trackSlug: string,
  lessonSlug: string
): Lesson | null {
  const dir = path.join(contentDir, locale, "tracks", trackSlug);

  if (!fs.existsSync(dir)) return null;

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  const file = files.find((f) => f.replace(/^\d+-/, "").replace(/\.mdx$/, "") === lessonSlug);

  if (!file) return null;

  const raw = fs.readFileSync(path.join(dir, file), "utf-8");
  const { data, content } = matter(raw);

  return {
    slug: lessonSlug,
    title: data.title ?? lessonSlug,
    order: data.order ?? 0,
    tags: data.tags,
    prerequisites: data.prerequisites,
    content,
  };
}
