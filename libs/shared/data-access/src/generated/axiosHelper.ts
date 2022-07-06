import axios, { AxiosResponse } from 'axios';

export const useAxios = <TData, TVariables>(
  query: string
): ((variables?: TVariables) => Promise<TData>) => {
  // it is safe to call React Hooks here.
  // const { url, headers } = React.useContext(FetchParamsContext)
  const url = process.env['NX_SCHEMA_PATH'] ?? '';
  // return axios.post<TData>(url,data:{query,variables}).then((res) => res.data);

  return async (variables?: TVariables) => {
    return axios
      .post<{ data: TData }>(url, { query, variables })
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
