import axios from 'axios';

export const useAxios = <TData, TVariables>(
  query: string
): ((variables?: TVariables) => Promise<TData>) => {
  // it is safe to call React Hooks here.
  // const { url, headers } = React.useContext(FetchParamsContext)
  const url = process.env['NX_SCHEMA_PATH'] ?? '';
  // return axios.post<TData>(url,data:{query,variables}).then((res) => res.data);

  return async (variables?: TVariables) =>
    axios.post<{ data: TData }>(url, { query, variables }).then((res) => res.data.data);
};
