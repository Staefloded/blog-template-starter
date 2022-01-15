import { useState } from "react";

const useCommentOnchange = (initialName, initialAvatar, initialComment) => {
  const [data, setData] = useState({
    name: initialName,
    avatar: initialAvatar,
    comment: initialComment,
  });

  const { name, avatar, comment } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return { name, avatar, comment, handleChange, setData };
};

export default useCommentOnchange;
