import { useGetNews, useGetPaginatedNews } from "queries/queryhooks/news";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BounceLoader, SyncLoader } from "react-spinners";
import sliceWord from "utils/sliceWord";

const Home = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  const { data: news } = useGetNews();
  const { data, isLoading, isError, error, isFetching, isPreviousData } = useGetPaginatedNews(
    page,
    limit
  );

  useEffect(() => {
    document.title = "Home | DEV.Blog";
  }, []);

  return (
    <div className="my-10 flex flex-col max-w-lg w-full mx-auto">
      {isLoading ? (
        <div className="h-screen w-full flex items-center justify-center">
          <SyncLoader color="#6B7280" size={20} />
        </div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <>
          <div className="flex flex-col space-y-3 ">
            {data
              ?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))
              ?.map((news) => (
                <Link to={`/news/${news?.id}`} key={news.id}>
                  <div className="bg-gray-100 rounded-md py-3 px-3 flex flex-col">
                    <h3 className="text-lg font-semibold capitalize">{news.title}</h3>
                    <p>{sliceWord(news.body, 50)}</p>
                    <p className="text-sm mt-5">Author: {news.author}</p>
                  </div>
                </Link>
              ))}
          </div>

          {/* Prev and Next Button */}
          <div className="mt-5 flex items-center space-x-5">
            <button
              onClick={() => setPage((old) => Math.max(old - 1, 0))}
              disabled={page === 1}
              className="custom-btn"
            >
              Prev
            </button>

            <button
              onClick={() => {
                if (!isPreviousData && data) {
                  setPage((old) => old + 1);
                }
              }}
              className="custom-btn"
              disabled={isPreviousData || page * limit >= news?.length}
            >
              Next
            </button>
            {isFetching && <BounceLoader size={15} />}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
