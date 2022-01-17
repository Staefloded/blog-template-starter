import useCommentOnchange from "hooks/useCommentOnchange";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "utils/axiosInstance";
import CommentsForm from "./comment-form.component";
import Comment from "./comment.component";

const Comments = ({ comments }) => {
  let params = useParams();

  const { name, avatar, comment, handleChange, setData } = useCommentOnchange("", "", "");

  const queryClient = useQueryClient();

  const {
    mutate: addComment,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(
    (comment) =>
      api.post(`/news/${params?.id}/comments`, comment, {
        headers: {
          accept: "*/*",
        },
      }),
    {
      onError: (error) => {
        toast.error(error.response.data);
      },
      onSuccess: () => {
        queryClient.refetchQueries(["getCommentsForNews"]);
        toast.success("Comment added successfully");

        setData({
          name: "",
          avatar: "",
          comment: "",
        });
      },
    }
  );

  const onSubmit = (e) => {
    e.preventDefault();
    addComment({ name, avatar, comment });
  };

  return (
    <div className="mt-20 max-w-sm w-full">
      <CommentsForm
        handleChange={handleChange}
        onSubmit={onSubmit}
        name={name}
        avatar={avatar}
        comment={comment}
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
      />

      <h2 className="text-2xl font-bold">Comments ({comments?.length})</h2>
      {comments?.length === 0 ? (
        <p className="text-lg mt-4 font-medium">No comments yet</p>
      ) : (
        <ul className="mt-10">
          {comments
            ?.sort((a, b) => b.id - a.id)
            ?.map((comment) => (
              <Comment key={comment.id} data={comment} />
            ))}
        </ul>
      )}
    </div>
  );
};

export default Comments;
