import { UseQueryOptions } from 'react-query';

import {
  GetPreDefinedFieldsQuery,
  PredefinedElementFilter,
  useGetPreDefinedFieldsQuery,
} from '@coop/shared/data-access';

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
  } else {
    return {
      data: null,
      isLoading,
      error,
    };
  }
};
