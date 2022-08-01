import { GetInstitutionKymOptionsQuery } from '@coop/shared/data-access';

export const getOption = (
  data?: GetInstitutionKymOptionsQuery,
  labelFormatter?: (label: string) => string
) => {
  return data?.form?.options?.predefined?.data?.reduce((newArr, option) => {
    if (option?.name.local && option?.id) {
      newArr.push({
        label: labelFormatter
          ? labelFormatter(option.name.local)
          : option.name.local,
        value: option.id,
      });
    }

    return newArr;
  }, [] as { label: string; value: string }[]);
};
