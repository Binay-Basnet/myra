import { useFormContext } from 'react-hook-form';

import { FormSection, GridItem } from '@myra-ui';

import { CashTransferMode } from '@coop/cbs/data-access';
import { FormInput, FormRadioGroup } from '@coop/shared/form';

const transferModeList = [
  {
    label: 'Collected',
    value: CashTransferMode.Collected,
  },
  {
    label: 'Delivered',
    value: CashTransferMode.Deliver,
  },
];

export const TransferMode = () => {
  const method = useFormContext();
  const { watch } = method;

  const transferMode = watch('transferMode');

  return (
    <FormSection templateColumns={2} subHeader="Transfer Mode">
      <GridItem colSpan={2}>
        <FormRadioGroup name="transferMode" options={transferModeList} />
      </GridItem>
      {transferMode === CashTransferMode.Collected && (
        <FormInput label="Collector Name" name="collectorName" />
      )}
    </FormSection>
  );
};
