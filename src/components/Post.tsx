import Link from "next/link";
import dayjs from "dayjs";
import { getPostList } from "@/core/post";

export async function PostList() {
  const postsRaw = await getPostList();

  const posts: Record<string, PostFrontmatter[]> = {};

  postsRaw.forEach((item) => {
    if (item.date) {
      const year = dayjs(item.date).format("YYYY");
      const list = posts[year] ?? [];

      list.push(item);

      posts[year] = list;
    }
  });

  const group = Object.entries(posts);

  group.sort(([a], [b]) => Number(b ?? 0) - Number(a ?? 0));

  function getLocaleString(date: Date | string, lang: string) {
    return dayjs(date)
      .toDate()
      .toLocaleString(lang, { year: "numeric", month: "long", day: "numeric" });
  }

  return (
    <>
      <ul lang="blog">
        {group.map(([year, posts]) => {
          if (!year) return <></>;

          return (
            <div aria-label={year} key={year}>
              <div className="relative h-20 -z-10">
                <span className="absolute font-bold text-transparent -left-12 top-4 text-9xl text-stroke-hex-aaa opacity-10">
                  {year}
                </span>
              </div>
              {posts?.map((post) => {
                return (
                  <Link
                    href={`posts/${post.slug}`}
                    key={post.pid}
                    className=" opacity-60 hover:opacity-100"
                  >
                    <li className="flex gap-2 mt-2 mb-6">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-sm whitespace-nowrap"
                          style={{ width: "130px", display: "inline-block" }}
                        >
                          {getLocaleString(post.date, "en")}
                        </span>
                      </div>
                      <div className="text-lg leading-5">
                        <span>{post.title}</span>
                      </div>
                    </li>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </ul>
    </>
  );
}
