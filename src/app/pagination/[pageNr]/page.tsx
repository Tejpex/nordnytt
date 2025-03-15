import { getTopStories } from "@/services/hn";
import Link from "next/link";

export default async function Home({ params }: { params: { pageNr: number } }) {
  const page: number = Number(params.pageNr) 
  const topstories = await getTopStories(page)

  return (
    <main>
      {topstories.map((story, index) => {
        const url = story.url ? new URL(story.url) : null

        return (
          <div className="leading-none mb-4" key={story.id}>
            <a
              title={story.title}
              href={story.url || `/${story.id}`}
              target={url?.host ? "_blank" : ""}
              className="pb-1 whitespace-nowrap text-ellipsis overflow-hidden block font-bold visited:text-slate-500"
            >
              {index + 1 + 10 * (page - 1)}. {story.title}
            </a>
            <div className="text-xs text-slate-700">
              {url?.host ? `${url?.host} - ` : ""}{" "}
              <Link href={`/${story.id}`}>
                {story.score} poäng - {story.descendants || "Inga"} kommentarer
                - {Math.floor(Date.now() / 1000 - story.time)} sekunder sedan
              </Link>
            </div>
          </div>
        )
      })}
      <div className="flex justify-center mb-5 gap-3">
        {page > 1 && (
          <Link href={`/pagination/${page - 1}`}>
            Sida {page - 1}
          </Link>
        )}
        <Link href={`/pagination/${page + 1}`}>
          Sida {page + 1}
        </Link>
      </div>
    </main>
  )
}
