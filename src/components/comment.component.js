import useCommentOnchange from "hooks/useCommentOnchange";
import moment from "moment";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import api from "utils/axiosInstance";
import CommentsForm from "./comment-form.component";

const Comment = ({ data }) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState(false);

  const { name, avatar, comment, handleChange } = useCommentOnchange(
    data?.name,
    data?.avatar,
    data?.comment
  );

  //   delete comment
  const { mutate: deleteComment, status } = useMutation(
    () =>
      api.delete(`/news/${params?.id}/comments/${data?.id}`, {
        headers: {
          accept: "*/*",
        },
      }),
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: () => {
        queryClient.refetchQueries(["getCommentsForNews"]);
        console.log("success");
      },
    }
  );

  // edit comment
  const {
    mutate: editComment,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(
    (comment) =>
      api.put(`/news/${params?.id}/comments/${data?.id}`, comment, {
        headers: {
          accept: "*/*",
        },
      }),
    {
      onError: (error) => {
        // console.log(error);
      },
      onSuccess: () => {
        queryClient.refetchQueries(["getCommentsForNews"]);
        // console.log("success");
      },
    }
  );

  const onSubmit = (e) => {
    e.preventDefault();
    editComment({ name, avatar, comment });

    // setEdit(false);
  };

  return (
    <>
      <li className="mt-5 border-b-2 pb-3 flex flex-col">
        <div className="flex items-center space-x-3">
          <img
            src={data?.avatar}
            alt={data?.name}
            className="rounded-full w-[40px] h-[40px] object-cover"
          />
          <div>
            <p className="text-sm capitalize font-medium text-gray-500">{data?.name}</p>
            <small> {moment(data?.createdAt).fromNow()}</small>
          </div>
        </div>

        <p className="text-sm font-medium mt-3">{data.comment}</p>

        <div className="flex space-x-3 mt-3">
          <button className="text-xs text-gray-500" onClick={() => setEdit(true)}>
            Edit
          </button>

          <button onClick={() => deleteComment()} className="text-xs text-gray-500">
            {status === "loading" ? "Deleting..." : "Delete"}
          </button>
        </div>
      </li>

      {edit && (
        <CommentsForm
          handleChange={handleChange}
          onSubmit={onSubmit}
          name={name}
          avatar={avatar}
          comment={comment}
          isLoading={isLoading}
          isError={isError}
          isSuccess={isSuccess}
          edit={true}
          setEdit={setEdit}
        />
      )}
    </>
  );
};

export default Comment;
