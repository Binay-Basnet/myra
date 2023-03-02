import { FormSection, GridItem } from '@myra-ui';

import { InvestmentType, useGetInvestmentEntriesListDataQuery } from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

export const FixDeposit = () => {
  const { data: investmentData } = useGetInvestmentEntriesListDataQuery({
    pagination: getPaginationQuery(),
    filter: { type: InvestmentType.FixedDeposit },
  });

  const investmentList = investmentData?.accounting?.investment?.listEntry?.edges;

  const fixedDepositList =
    investmentList &&
    investmentList?.map((item) => ({
      label: item?.node?.name as string,
      value: item?.node?.id as string,
    }));

  // const { data: userListQueryData } = useGetSettingsUserListDataQuery(
  //   {
  //     paginate: getPaginationQuery(),
  //   },
  //   { staleTime: 0 }
  // );

  // const userList = userListQueryData?.settings?.myraUser?.list?.edges;

  // const representativeList =
  //   userList &&
  //   userList?.map((item) => ({
  //     label: item?.node?.name as string,
  //     value: item?.node?.id as string,
  //   }));

  return (
    <FormSection>
      <GridItem colSpan={3}>
        <FormSelect name="fixDeposit" label="Fix Deposit" options={fixedDepositList ?? []} />
      </GridItem>
      <GridItem colSpan={2}>
        <FormInput name="nameOfRepresentative" type="text" label="Name of Representative" />
        {/* <FormSelect
          name="nameOfRepresentative"
          label="Name of Representative"
          options={representativeList ?? []}
        /> */}
      </GridItem>
      <GridItem colSpan={1}>
        <FormInput name="position" type="text" label="Position" />
      </GridItem>
    </FormSection>
  );
};
