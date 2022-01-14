import api from "utils/axiosInstance";

export const getAllNews = async () => {
  const { data } = await api.get("/news", {
    headers: {
      accept: "*/*",
    },
  });
  return data;
};

export const getSingleNews = async (id) => {
  const { data } = await api.get(`/news/${id}`, {
    headers: {
      accept: "*/*",
    },
  });
  return data;
};

export const getImagesForNews = async (id) => {
  const { data } = await api.get(`/news/${id}/images`, {
    headers: {
      accept: "*/*",
    },
  });
  return data;
};

export const getCommentsForNews = async (id) => {
  const { data } = await api.get(`/news/${id}/comments`, {
    headers: {
      accept: "*/*",
    },
  });
  return data;
};

export const getPaginatedNews = async (page = 1, limit) => {
  const { data } = await api.get(`/news?page=${page}&limit=${limit}`, {
    headers: {
      accept: "*/*",
    },
  });
  return data;
};
