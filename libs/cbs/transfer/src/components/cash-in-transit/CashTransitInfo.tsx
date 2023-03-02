import { FormSection } from '@myra-ui';

import { useAppSelector, useGetBranchListQuery } from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

export const CashTransitInfo = () => {
  const user = useAppSelector((state) => state.auth?.user);
  const { data } = useGetBranchListQuery({
    paginate: {
      ...getPaginationQuery(),
      order: null,
    },
  });

  const branchListData = data?.settings?.general?.branch?.list?.edges?.filter(
    (item) => user?.currentBranch?.id !== item?.node?.id
  );

  const branchList = branchListData?.map((item) => ({
    label: `${item?.node?.name}[${item?.node?.branchCode}]` as string,
    value: item?.node?.id as string,
  }));

  return (
    <FormSection templateColumns={2}>
      <FormInput label="Sender Service Center" name="senderServiceCentre" isDisabled />
      <FormSelect
        label="Receiver Service Center"
        name="receiverServiceCentre"
        options={branchList}
      />
      <FormInput label="Sender Service Center Teller" name="senderTeller" isDisabled />
    </FormSection>
  );
};
