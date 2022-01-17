import {
  useGetCommentsForNews,
  useGetImagesForNews,
  useGetSingleNews,
} from "queries/queryhooks/news";
import { Link, useParams } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import Comments from "components/comments.component";
import { useEffect } from "react";
import Slider from "components/slider.compnent";

const News = () => {
  let params = useParams();

  const { data: news, status: newsStatus } = useGetSingleNews(params?.id);

  const { data: comments, status: commentStatus } = useGetCommentsForNews(params?.id);

  const { data: images, status: imageStatus } = useGetImagesForNews(params?.id);

  useEffect(() => {
    document.title = `${newsStatus === "loading" ? "Loading..." : news?.title} | News`;
  }, [news, newsStatus]);

  return (
    <div className="my-10">
      {newsStatus === "loading" || commentStatus === "loading" || imageStatus === "loading" ? (
        <div className="h-screen w-full flex items-center justify-center">
          <SyncLoader color="#6B7280" size={20} />
        </div>
      ) : (
        <>
          <article className="max-w-3xl w-full">
            <Link
              className="bg-gray-100 px-5 py-3 rounded-md inline-block mb-3"
              to={`/news/edit/${params?.id}`}
            >
              Edit News
            </Link>
            <h1 className="text-3xl font-bold capitalize">{news?.title}</h1>
            <p className="text-sm font-medium text-gray-500">Written By: {news?.author}</p>

            <Slider images={images} />

            <div className="mt-10 font-normal text-lg">{news?.body}</div>
          </article>

          <Comments comments={comments} />
        </>
      )}
    </div>
  );
};

export default News;
