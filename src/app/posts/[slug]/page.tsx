import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import { getPostBySlug, getSlugs } from "@/core/post";
import { WrapperPost } from "@/components/WrapperPost";

interface Props {
  params: {
    slug: string;
  };
}

/**
 * check ${str} is not blank
 * @param str strings that need to check
 * @returns checked result
 */
export function notBlank(str?: string) {
  return str && str.trim() !== "";
}

/**
 * append prefix to `str` string
 * @param str main string
 * @param prefix prefix content string
 * @returns prefix + str，if str is blank, return a undefined
 */
export function appendStrPrefix(str?: string, prefix = "") {
  return notBlank(str) ? prefix + str : undefined;
}

// dynamic metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; // 解构并等待 params
  const post = await getPostBySlug(slug);
  const { title } = post ?? {};
  const rawTitle = "Galaxy Park";
  const keywords = [
    "LinYao",
    "林耀",
    "GalaxyPark",
    "银河公园",
    "摄影",
    "photography",
    "艺术",
    "art",
    "博客",
    "Blog",
    "Software Development",
    "C#",
    ".NET",
  ];

  const metadata: Metadata = {
    title: rawTitle,
    keywords,
  };

  if (title) metadata.title = `${rawTitle} - ${title}`;

  return metadata;
}

export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params; // 解构并等待 params
  const postModule = await getPostBySlug(slug);

  if (!postModule) return notFound();

  const { default: MarkdownView, frontmatter } = postModule;

  function getLocaleString(date: Date | string, lang: string) {
    return dayjs(date).toDate().toLocaleString(lang, { dateStyle: "medium" });
  }

  return (
    <>
      <div lang="blog" className="container mx-auto">
        <div className="mb-8 prose">
          <h1 className="!text-4xl">{frontmatter.title}</h1>
          <p className="opacity-50">
            {getLocaleString(frontmatter.date, "en")}
            <span>{appendStrPrefix(frontmatter.duration, " · ")}</span>
          </p>
        </div>
        <WrapperPost
          content={<MarkdownView />}
          frontmatter={frontmatter}
        ></WrapperPost>
      </div>
    </>
  );
}
