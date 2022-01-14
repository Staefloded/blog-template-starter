import { useQuery } from "react-query";
import {
  getAllNews,
  getCommentsForNews,
  getImagesForNews,
  getPaginatedNews,
  getSingleNews,
} from "queries/queryfn/news";

export function useGetNews() {
  return useQuery(["allNews"], () => getAllNews(), {
    useErrorBoundary: (error) => error.response?.status >= 500,
  });
}

export function useGetSingleNews(id) {
  return useQuery(["singleNews", id], () => getSingleNews(id), {
    useErrorBoundary: (error) => error.response?.status >= 500,
  });
}

export function useGetImagesForNews(id) {
  return useQuery(["getImagesForNews", id], () => getImagesForNews(id), {
    useErrorBoundary: (error) => error.response?.status >= 500,
  });
}

export function useGetCommentsForNews(id) {
  return useQuery(["getCommentsForNews", id], () => getCommentsForNews(id), {
    useErrorBoundary: (error) => error.response?.status >= 500,
  });
}

export function useGetPaginatedNews(page, limit) {
  return useQuery(["paginitedNews", page], () => getPaginatedNews(page, limit), {
    keepPreviousData: true,
  });
}
