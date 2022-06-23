import { GetIndividualKymOptionQuery } from '@coop/shared/data-access';

export const getFieldOption = (data?: GetIndividualKymOptionQuery) => {
  return data?.members?.individual?.options?.list?.data?.[0]?.options?.map(
    (option) => ({
      label: option.name.local,
      value: option.id,
    })
  );
};
