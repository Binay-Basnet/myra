import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const useAxios = <TData, TVariables>(
  query: string
): ((
  variables?: TVariables,
  config?: AxiosRequestConfig<TData>
) => Promise<TData>) => {
  // it is safe to call React Hooks here.
  // const { url, headers } = React.useContext(FetchParamsContext)
  const url = process.env['NX_SCHEMA_PATH'] ?? '';
  // return axios.post<TData>(url,data:{query,variables}).then((res) => res.data);

  return async (variables?: TVariables, config?: AxiosRequestConfig<TData>) => {
    return axios
      .post<{ data: TData }>(url, { query, variables }, config)
      .then((res: AxiosResponse<{ data: TData; errors?: any[] }>) => {
        // IF ERROR, THROW AN ERROR !!
        // if (res.data.errors) {
        //   res.data.errors.map((error) => {
        //     const updatedError = new Error('Unknown Server Error');
        //     updatedError.message =
        //       error?.message + '\n Path: ' + error?.path.toString();
        //     updatedError.stack = error?.path;
        //     throw updatedError;
        //   });
        // }
        return res.data.data;
      });
  };
};
// import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// import { useAuth } from '@coop/shared/data-access';

// const refreshToken = (url: string) => {
//   const refreshToken = localStorage.getItem('_refr');
//   return axios
//     .post(url, {
//       query: `mutation{
//   auth{
//     token(refreshToken:"${refreshToken}"){
//       refresh
//       access
//     }
//   }
// }`,
//     })
//     .then((res) => {
//       return res.data?.access;
//     })
//     .catch((err) => {
//       alert('redirect to login');
//     });
// };

// import { useAuth } from '@coop/shared/utils';
// export const useAxios = <TData, TVariables>(
//   query: string
// ): ((
//   variables?: TVariables,
//   config?: AxiosRequestConfig<TData>
// ) => Promise<TData>) => {
// it is safe to call React Hooks here.
// const { url, headers } = React.useContext(FetchParamsContext)
// const url = process.env['NX_SCHEMA_PATH'] ?? '';
// return axios.post<TData>(url,data:{query,variables}).then((res) => res.data);

// const auth = useAuth();

// const accessToken = auth?.auth?.accessToken;
// console.log('access', accessToken); // get this token from redux

// return async (variables?: TVariables, config?: AxiosRequestConfig<TData>) => {
//   const headers = {
//     Authoirzation: `Bearer ${accessToken}`,
//   };
//   if (config) {
//     if (config.headers) {
//       config.headers = { ...config.headers, ...headers };
//     } else {
//       config.headers = { ...headers };
//     }
//   } else {
//     config = {
//       headers,
//     };
//   }
//   return axios
//     .post<{ data: TData }>(url, { query, variables }, config)
//     .then((res: AxiosResponse<{ data: TData; errors?: any[] }>) => {
// IF access token is invalid
// if()
// refreshToken(url).then((res) => {
//   console.log('token', res.token);
//   const headers = {
//     Authoirzation: `Bearer ${res.token}`,
//   };
//   if (config) {
//     if (config.headers) {
//       config.headers = { ...config.headers, ...headers };
//     } else {
//       config.headers = { ...headers };
//     }
//   } else {
//     config = {
//       headers,
//     };
//   }

//   return axios
//     .post<{ data: TData }>(url, { query, variables }, config)
//     .then((res) => {
//       return res.data.data;
//     });
// });
//         return res.data.data;
//       });
//   };
// };

// // Add a request interceptor
// axios.interceptors.request.use(
//   function (config) {
//     // Do something before request is sent
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// axios.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data

//     console.log('data', response.data);
//     return response;
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );
