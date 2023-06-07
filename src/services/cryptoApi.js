import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "X-RapidAPI-Key": process.env.REACT_APP_CRYPTO_API_KEY,
  "X-RapidAPI-Host": process.env.REACT_APP_CRYPTO_API_HOST,
};

const baseUrl = process.env.REACT_APP_CRYPTO_API_URL;

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => ({
        url: "/coins",
        headers: cryptoApiHeaders,
      }),
    }),
    getCryptoDetails: builder.query({
      query: (id) => ({
        url: `/coin/${id}`,
        headers: cryptoApiHeaders,
      }),
    }),
    getCryptoHistory: builder.query({
      query: ({ id, timePeriod }) => ({
        url: `/coin/${id}/history/?timePeriod=${timePeriod}`,
        headers: cryptoApiHeaders,
      }),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
