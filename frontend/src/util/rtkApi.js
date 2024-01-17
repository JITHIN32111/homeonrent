import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import axios from 'axios';

export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (state) => ({
        url: '/auth/register',
        method: 'POST',
        body: state,
      }),
    }),
    
  }),
});
