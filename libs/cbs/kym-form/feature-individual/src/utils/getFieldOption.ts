import { GetIndividualKymOptionQuery } from '@coop/shared/data-access';

export const getFieldOption = (
  data?: GetIndividualKymOptionQuery,
  labelFormatter?: (label: string) => string
) => {
  return data?.members?.individual?.options?.list?.data?.[0]?.options?.map(
    (option) => ({
      label: labelFormatter
        ? labelFormatter(option.name.local)
        : option.name.local,
      value: option.id,
    })
  );
};
