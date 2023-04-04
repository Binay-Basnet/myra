import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

import { TablePopover } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import { ExternalLoanType } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { amountConverter, useTranslation } from '@coop/shared/utils';

import { useExternalLoan } from '../hooks/useExternalLoan';

/* eslint-disable-next-line */
export interface AccountingFeatureLoanProps {}

const loanType: Record<ExternalLoanType, string> = {
  [ExternalLoanType.CooperativeSector]: 'Co-operative Sector',
  [ExternalLoanType.OtherSector]: 'Other Sector',
};

export const ExternalLoansList = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const { externalLoanList, isExternalLoanLoading, refetchExternalLoan } = useExternalLoan();

  const rowData = useMemo(() => externalLoanList ?? [], [externalLoanList]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Entry ID',
        accessorFn: (row) => row?.id,
      },
      {
        accessorFn: (row) => row?.organizationName,
        header: 'Name of Organization',

        meta: {
          width: '60%',
        },
      },
      {
        header: 'Type',
        accessorFn: (row) => row?.loanType,
        meta: {
          width: '30%',
        },
        cell: (props) =>
          props?.row?.original && loanType[props?.row?.original?.loanType as ExternalLoanType],
      },
      {
        header: 'Amount',
        accessorFn: (row) => amountConverter(row?.amount ?? 0),
        meta: {
          width: '30%',
        },
      },
      {
        header: 'Applied Date',
        accessorFn: (row) => row?.date,
        meta: {
          width: '30%',
        },
      },
      {
        id: '_actions',
        header: '',
        cell: (props) =>
          props?.row?.original && (
            <TablePopover
              node={props?.row?.original}
              items={[
                {
                  title: 'Edit',
                  onClick: (node) =>
                    router.push(`${ROUTES.ACCOUNTING_EXTERNAL_LOAN_EDIT}?id=${node?.id}`),
                },
                {
                  title: t['transDetailViewDetail'],
                },
              ]}
            />
          ),
        meta: {
          width: '3.125rem',
        },
      },
    ],
    [t]
  );

  useEffect(() => {
    refetchExternalLoan();
  }, [refetchExternalLoan]);

  return (
    <>
      <AccountingPageHeader heading="External Loan" />

      <Table isLoading={isExternalLoanLoading} data={rowData} columns={columns} />
    </>
  );
};
