import { useState } from "react";

const useNewsOnchange = (initialTitle, initialAuthor, initialBody) => {
  const [data, setData] = useState({
    author: initialAuthor,
    body: initialBody,
    title: initialTitle,
  });

  const { title, author, body } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return { title, author, body, handleChange, setData };
};

export default useNewsOnchange;
