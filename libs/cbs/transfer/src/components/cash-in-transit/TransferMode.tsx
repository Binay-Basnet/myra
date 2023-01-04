import { useFormContext } from 'react-hook-form';

import { FormSection, GridItem } from '@myra-ui';

import { CashTransferMode, Roles, useGetSettingsUserListDataQuery } from '@coop/cbs/data-access';
import { FormInput, FormRadioGroup, FormSelect } from '@coop/shared/form';

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
  const destBranch = watch('destBranch');

  const { data: userListData } = useGetSettingsUserListDataQuery({
    filter: { branchId: destBranch, role: [Roles.Teller] },
    paginate: { after: '', first: -1 },
  });

  const tellerListData = userListData?.settings?.myraUser?.list?.edges;
  const tellerList = tellerListData?.map((item) => ({
    label: item?.node?.name as string,
    value: item?.node?.id as string,
  }));

  return (
    <FormSection templateColumns={2} subHeader="Transfer Mode">
      <GridItem colSpan={2}>
        <FormRadioGroup name="transferMode" options={transferModeList} />
      </GridItem>
      {transferMode === CashTransferMode.Collected && (
        <>
          <FormInput label="Collector Name" name="collectorName" />
          <FormSelect
            label="On behalf of Receiver Teller "
            name="destTellerID"
            options={tellerList}
          />
        </>
      )}
    </FormSection>
  );
};
