import {
  useGetCommentsForNews,
  useGetImagesForNews,
  useGetSingleNews,
} from "queries/queryhooks/news";
import { useParams } from "react-router-dom";

const News = () => {
  let params = useParams();

  const { data: news, status: newsStatus } = useGetSingleNews(params?.id);

  const { data: comments, status: commentStatus } = useGetCommentsForNews(params?.id);

  const { data: images, status: imageStatus } = useGetImagesForNews(params?.id);

  console.log({ news, comments, images });

  return <div></div>;
};

export default News;
