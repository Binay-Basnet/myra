import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, DetailsCard, Table } from '@myra-ui';

import { useGetMemberKymDetailsBioQuery } from '@coop/cbs/data-access';
import { amountConverter } from '@coop/shared/utils';

export const EquityLiabilities = () => {
  const router = useRouter();
  const memberBioData = useGetMemberKymDetailsBioQuery({
    id: router.query['id'] as string,
  });

  const bioDataCoopUnion =
    memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.__typename === 'CoopUnionBio'
      ? memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.equityLiabilities
      : null;

  const data = [
    {
      label: 'Share and Capital',
      current: bioDataCoopUnion?.shareCapitalCurrent,
      target: bioDataCoopUnion?.shareCapitalTarget,
    },
    {
      label: 'Reserve and surplus',

      current: bioDataCoopUnion?.reserveAndSurplusCurrent,
      target: bioDataCoopUnion?.reserveAndSurplusTarget,
    },
    {
      label: 'Saving/Deposit',
      current: bioDataCoopUnion?.savingDepositCurrent,
      target: bioDataCoopUnion?.savingDepositTarget,
    },
    {
      label: 'Loan Account (External Loan)',

      current: bioDataCoopUnion?.loanAccountCurrent,
      target: bioDataCoopUnion?.loanAccountTarget,
    },
    {
      label: 'Current Liabilities and payable',

      current: bioDataCoopUnion?.liabilitiesPayableCurrent,
      target: bioDataCoopUnion?.liabilitiesPayableTarget,
    },
    {
      label: 'Non-current liabilities',

      current: bioDataCoopUnion?.nonCurrentLiabilitiesCurrent,
      target: bioDataCoopUnion?.nonCurrentLiabilitiesTarget,
    },
  ];

  const columns = useMemo<Column<typeof data[0]>[]>(
    () => [
      {
        header: 'Equity and Liabilities',
        accessorKey: 'label',
      },
      {
        header: 'Current',
        accessorKey: 'current',
        cell: (props) => amountConverter(props.getValue() as string),

        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Target For next fiscal year',
        accessorKey: 'target',
        cell: (props) => amountConverter(props.getValue() as string),

        meta: {
          isNumeric: true,
        },
      },
    ],
    []
  );

  return (
    <DetailsCard title="Economic Details - Equity and Liabilities" hasTable>
      <Table isStatic data={data} columns={columns} />
    </DetailsCard>
  );
};
