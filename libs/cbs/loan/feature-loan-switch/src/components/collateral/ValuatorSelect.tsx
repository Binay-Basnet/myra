import { GridItem } from '@myra-ui';

import { useGetValuatorListQuery } from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';

export const ValuatorSelect = () => {
  const { data: valuatorData } = useGetValuatorListQuery({
    paginate: {
      after: '',
      first: 10,
    },
  });

  return (
    <GridItem colSpan={2}>
      <FormSelect
        name="valuatorId"
        label="Valuator"
        options={valuatorData?.settings.general?.valuator?.list?.edges?.map((valuator) => ({
          label: valuator.node?.valuatorName as string,
          value: valuator.node?.id as string,
        }))}
      />
    </GridItem>
  );
};
