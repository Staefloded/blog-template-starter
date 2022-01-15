import {
  useGetCommentsForNews,
  useGetImagesForNews,
  useGetSingleNews,
} from "queries/queryhooks/news";
import { useParams } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import Comments from "components/comments.component";

const News = () => {
  let params = useParams();

  const { data: news, status: newsStatus } = useGetSingleNews(params?.id);

  const { data: comments, status: commentStatus } = useGetCommentsForNews(params?.id);

  const { data: images, status: imageStatus } = useGetImagesForNews(params?.id);

  return (
    <div className="my-10">
      {newsStatus === "loading" || commentStatus === "loading" || imageStatus === "loading" ? (
        <div className="h-screen w-full flex items-center justify-center">
          <SyncLoader color="#6B7280" size={20} />
        </div>
      ) : (
        <>
          <article className="max-w-3xl w-full">
            <h1 className="text-3xl font-bold capitalize">{news?.title}</h1>
            <p className="text-sm font-medium text-gray-500">Written By: {news?.author}</p>

            <div className="mt-10 font-normal text-lg">{news?.body}</div>
          </article>

          <Comments comments={comments} />
        </>
      )}
    </div>
  );
};

export default News;
