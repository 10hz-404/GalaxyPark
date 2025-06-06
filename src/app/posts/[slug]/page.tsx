import type { Metadata } from "next";
import { WrapperPost } from "@/components/WrapperPost";
import { getPostBySlug, getSlugs } from "@/core/post";
import dayjs from "dayjs";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

// dynamic metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPostBySlug(slug);
  const { title } = post ?? {};
  const rawTitle = "Galaxy Park";

  const metadata: Metadata = {
    title: rawTitle,
    keywords: [],
    description: post?.description,
  };

  if (title) {
    metadata.title = `${title} - ${rawTitle}`;
    metadata.openGraph = { title: metadata.title };
  }

  return metadata;
}

export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ slug }));
}

async function getPost(slug: string) {
  try {
    return await import(`@/../pages/posts/${slug}.md`);
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

export default async function PostPage(props: Props) {
  const { slug } = await props.params;
  const postModule = await getPost(slug);

  if (!postModule) return notFound();

  const { default: MarkdownView, frontmatter } = postModule;

  function getLocaleString(date: Date | string, lang: string) {
    return dayjs(date).toDate().toLocaleString(lang, { dateStyle: "medium" });
  }

  return (
    <div lang="zh-CN" className="mx-auto xl:max-w-4xl">
      <div className="mb-8 prose">
        <h1 className="text-4xl">{frontmatter.title}</h1>
        <p className="opacity-50">{getLocaleString(frontmatter.date, "en")}</p>
      </div>
      <WrapperPost
        content={<MarkdownView />}
        frontmatter={frontmatter}
      ></WrapperPost>
    </div>
  );
}
