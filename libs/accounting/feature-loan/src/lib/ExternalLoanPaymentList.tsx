import { useMemo } from 'react';

import { Column, Table } from '@myra-ui/table';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import { useExternalLoanPaymentListQuery } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { amountConverter, getPaginationQuery } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface ExternalLoanPaymentListProps {}

export const ExternalLoanPaymentList = () => {
  const { data: loanPaymentData, isLoading: isLoanPaymentLoading } =
    useExternalLoanPaymentListQuery({
      pagination: getPaginationQuery(),
    });

  const rowData = useMemo(
    () => loanPaymentData?.accounting?.externalLoan?.payment?.list?.edges ?? [],
    [loanPaymentData]
  );

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Loan',
        accessorFn: (row) => row?.node?.loanName,
      },
      {
        accessorFn: (row) => amountConverter(row?.node?.amount ?? 0),
        header: 'Amount',
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Date',
        accessorFn: (row) => localizedDate(row?.node?.createdDate),
        // meta: {
        //   width: '30%',
        // },
      },
    ],
    []
  );

  return (
    <>
      <AccountingPageHeader heading="External Loan Payment" />

      <Table data={rowData} isLoading={isLoanPaymentLoading} columns={columns} />
    </>
  );
};
