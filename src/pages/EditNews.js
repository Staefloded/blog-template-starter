import NewsForm from "components/news-form.component";
import useNewsOnchange from "hooks/useNewsOnchange";
import { useGetSingleNews } from "queries/queryhooks/news";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Link, useParams } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { toast } from "react-toastify";
import api from "utils/axiosInstance";

const EditNews = () => {
  const params = useParams();

  const { data: news, status: newsStatus } = useGetSingleNews(params?.id);

  const { title, author, body, handleChange, setData } = useNewsOnchange(
    news?.title,
    news?.author,
    news?.body
  );

  const queryClient = useQueryClient();

  const {
    mutate: editNews,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(
    (news) =>
      api.put(`/news/${params?.id}`, news, {
        headers: {
          accept: "*/*",
        },
      }),
    {
      onError: (error) => {
        toast.error(error.response.data);
      },
      onSuccess: () => {
        queryClient.refetchQueries(["singleNews", params?.id]);
        toast.success("News Updated Successfully");
      },
    }
  );

  useEffect(() => {
    if (newsStatus === "success") {
      setData({
        title: news.title ?? "",
        author: news?.author ?? "",
        body: news?.body ?? "",
      });
    }
  }, [news, newsStatus, setData]);

  const onSubmit = (e) => {
    e.preventDefault();
    editNews({ title, author, body });
  };

  return (
    <>
      {newsStatus === "loading" ? (
        <div className="h-screen w-full flex items-center justify-center">
          <SyncLoader color="#6B7280" size={20} />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-start mt-10">
          <div className="flex-1 md:flex-[0.6]">
            <h2 className="text-2xl">
              Edit <strong>{news?.title}</strong>
            </h2>

            <NewsForm
              onSubmit={onSubmit}
              title={title}
              author={author}
              body={body}
              handleChange={handleChange}
              isLoading={isLoading}
              isError={isError}
              isSuccess={isSuccess}
              actionStatus="Editting..."
              action="Edit"
            />
          </div>

          <div className="flex-1 md:flex-[0.4]">
            <h2 className="font-bold text-2xl">Preview</h2>

            <Link
              to={`/news/${news.id}`}
              className="text-3xl mt-5 font-semibold capitalize hover:underline"
            >
              {news?.title}
            </Link>
            <p className="text-sm font-medium text-gray-500">Written By: {news?.author}</p>

            <div className="mt-10 font-normal text-lg">{news?.body}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditNews;
