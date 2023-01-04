import { FormSection } from '@myra-ui';

import { useGetBranchListQuery } from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { getRouterQuery } from '@coop/shared/utils';

export const CashTransitInfo = () => {
  const { data } = useGetBranchListQuery({
    paginate: {
      ...getRouterQuery({ type: ['PAGINATION'] }),
      order: null,
    },
  });

  const branchListData = data?.settings?.general?.branch?.list?.edges;

  const branchList = branchListData?.map((item) => ({
    label: `${item?.node?.name}[${item?.node?.branchCode}]` as string,
    value: item?.node?.id as string,
  }));

  return (
    <FormSection templateColumns={2}>
      <FormInput label="Sender Service Center" name="srcBranch" isDisabled />
      <FormSelect label="Receiver Service Center" name="destBranch" options={branchList} />
      <FormInput label="Sender Service Center Teller" name="srcTellerID" isDisabled />
    </FormSection>
  );
};
