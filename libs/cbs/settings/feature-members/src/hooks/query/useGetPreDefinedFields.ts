import { UseQueryOptions } from '@tanstack/react-query';

import {
  GetPreDefinedFieldsQuery,
  PredefinedElementFilter,
  useGetPreDefinedFieldsQuery,
} from '@coop/cbs/data-access';

export const useGetPreDefinedFields = (
  filter: PredefinedElementFilter,
  options?: UseQueryOptions<GetPreDefinedFieldsQuery>
) => {
  const { data, isLoading, error } = useGetPreDefinedFieldsQuery(
    {
      filter,
    },
    options
  );

  const preDefinedFields = data?.settings?.form?.predefined?.details?.data;

  if (preDefinedFields) {
    return {
      data: preDefinedFields,
      isLoading,
      error,
    };
  }
  return {
    data: null,
    isLoading,
    error,
  };
};
