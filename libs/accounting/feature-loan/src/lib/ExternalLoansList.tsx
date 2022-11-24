import { useMemo } from 'react';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import { ExternalLoanType } from '@coop/cbs/data-access';
import { Column, Table } from '@coop/shared/table';
import { TablePopover, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { useExternalLoan } from '../hooks/useExternalLoan';

/* eslint-disable-next-line */
export interface AccountingFeatureLoanProps {}

interface ILoanTypeProps {
  loanType: string;
  t: Record<string, string>;
}

const loanTypeSwitch = ({ loanType, t }: ILoanTypeProps) => {
  if (loanType === ExternalLoanType.Collateral) {
    return <Text>{t['collateral']} </Text>;
  }
  if (loanType === ExternalLoanType.LoanAgainstFd) {
    return <Text>{t['loanAgainstFd']}</Text>;
  }

  return '-';
};

export const ExternalLoansList = () => {
  const { t } = useTranslation();

  const { externalLoanList, isExternalLoanLoading } = useExternalLoan();

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
          props?.row?.original &&
          loanTypeSwitch({ loanType: props?.row?.original?.loanType ?? '', t }),
      },
      {
        header: 'Amount',
        accessorFn: (row) => row?.amount,
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
                  title: t['transDetailViewDetail'],
                },
              ]}
            />
          ),
        meta: {
          width: '50px',
        },
      },
    ],
    [t]
  );
  return (
    <>
      <AccountingPageHeader heading="Investments" />

      <Table isLoading={isExternalLoanLoading} data={rowData} columns={columns} />
    </>
  );
};
