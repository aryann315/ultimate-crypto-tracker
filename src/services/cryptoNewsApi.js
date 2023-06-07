import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsApiHeaders = {
  "X-BingApis-SDK": process.env.REACT_APP_NEWS_ANSWER,
  "X-RapidAPI-Key": process.env.REACT_APP_NEWS_API_KEY,
  "X-RapidAPI-Host": process.env.REACT_APP_NEWS_API_HOST,
};

const baseUrl = process.env.REACT_APP_NEWS_API_URL;

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({newsCategory}) => ({
        url: `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day`,
        headers: cryptoNewsApiHeaders,
      }),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
