import NewsForm from "components/news-form.component";
import useNewsOnchange from "hooks/useNewsOnchange";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import api from "utils/axiosInstance";

const NewsLanding = () => {
  const queryClient = useQueryClient();

  const { title, author, body, handleChange, setData } = useNewsOnchange("", "", "");

  const {
    mutate: addNews,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(
    (news) =>
      api.post(`/news`, news, {
        headers: {
          accept: "*/*",
        },
      }),
    {
      onError: (error) => {
        toast.error(error.response.data);
      },
      onSuccess: () => {
        queryClient.refetchQueries(["allNews"]);
        toast.success("News Added Successfully");

        setData({
          title: "",
          auhtor: "",
          body: "",
        });
      },
    }
  );

  const onSubmit = (e) => {
    e.preventDefault();
    addNews({ title, author, body });
  };

  return (
    <div className="mt-10 max-w-md w-full m-auto">
      <h1 className="font-bold text-2xl mb-5">Add News</h1>
      <NewsForm
        onSubmit={onSubmit}
        title={title}
        author={author}
        body={body}
        handleChange={handleChange}
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
        actionStatus="Submitting..."
        action="Submit"
      />
    </div>
  );
};

export default NewsLanding;
