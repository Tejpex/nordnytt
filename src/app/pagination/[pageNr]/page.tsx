import { getTopStories } from "@/services/hn";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Home({ params }: { params: { pageNr: number } }) {
  const page: number = Number(params.pageNr) 

  if (page < 1 || page > 50)
    return notFound();

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
      <div className="flex justify-between mb-5 gap-3">
        {page === 1 && <p></p>}
        {page > 1 && (
          <Link href={`/pagination/${page - 1}`} className="justify-self-start">
            ‹‹ Sida {page - 1}
          </Link>
        )}
        <p className="justify-self-center">Sida {page} av 50</p>
        {page < 50 && (
          <Link href={`/pagination/${page + 1}`} className="justify-self-end">
            Sida {page + 1} ››
          </Link>
        )}
        {page === 50 && <p></p>}
      </div>
    </main>
  )
}
