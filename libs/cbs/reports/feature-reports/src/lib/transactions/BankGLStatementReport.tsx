import { useState } from 'react';

import { GridItem } from '@myra-ui';

import {
  BankGlDataEntry,
  BankGlStatementFilter,
  LocalizedDateFilter,
  MinMaxFilter,
  NatureOfBankTransaction,
  useGetBankAccountListQuery,
  useGetBankGlStatementReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate } from '@coop/cbs/utils';
import { FormAmountFilter, FormBranchSelect, FormRadioGroup, FormSelect } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

type Filters = Omit<BankGlStatementFilter, 'filter' | 'branchId'> & {
  branchId: { label: string; value: string }[];
  filter: {
    amount?: MinMaxFilter;
    bank?: { label: string; value: string }[];
    natureOfTransactions: NatureOfBankTransaction;
  };
};

export const BankGLStatementReport = () => {
  const [filters, setFilters] = useState<Filters | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;

  const bankIds =
    filters?.filter?.bank && filters?.filter?.bank.length !== 0
      ? filters?.filter?.bank?.map((t) => t.value)
      : [];
  const { data: bankListData } = useGetBankAccountListQuery({
    pagination: { after: '', first: -1 },
  });
  const { data, isFetching } = useGetBankGlStatementReportQuery(
    {
      data: {
        branchId: branchIds,
        period: filters?.period as LocalizedDateFilter,
        filter: {
          bank: bankIds,
          amount:
            filters?.filter?.amount?.max && filters?.filter?.amount?.min
              ? filters?.filter?.amount
              : null,
          natureOfTransactions: filters?.filter?.natureOfTransactions,
        },
      },
    },
    { enabled: !!filters }
  );

  const bankGlReport = data?.report?.transactionReport?.financial?.bankGLStatementReport?.data;

  return (
    <Report
      defaultFilters={{
        filter: {
          natureOfTransactions: NatureOfBankTransaction.All,
        },
      }}
      data={bankGlReport as BankGlDataEntry[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.TRANSACTION_BANK_GL_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Transaction Reports', link: '/reports/cbs/transactions' },
            {
              label: 'Bank GL Statement',
              link: '/reports/cbs/transactions/bank-gl-statement/new',
            },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect name="branchId" label="Service Center" />
          </GridItem>
          <GridItem colSpan={1}>
            <ReportDateRange />
          </GridItem>{' '}
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<BankGlDataEntry & { index: number }>
            columns={[
              {
                header: 'S.No.',
                accessorKey: 'index',
                meta: {
                  width: '60px',
                },
              },
              {
                header: 'Service Center',
                accessorKey: 'branchName',
              },
              {
                header: 'Date',
                accessorFn: (row) => localizedDate(row?.date),
              },
              {
                header: 'Particular',
                accessorKey: 'particular',
              },
              {
                header: 'Bank',
                accessorFn: (row) => row?.name?.local,
              },
              {
                header: 'Cheque No',
                accessorKey: 'chequeNo',
              },

              {
                header: 'Deposit Amount',
                accessorKey: 'depositAmount',
                cell: (props) => amountConverter(props.getValue() as string),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Withdraw Amount',
                accessorKey: 'withdrawAmount',
                cell: (props) => amountConverter(props.getValue() as string),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Balance',
                accessorKey: 'balance',
                cell: (props) => amountConverter(props.getValue() as string),
                meta: {
                  isNumeric: true,
                },
              },
            ]}
          />
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="Type of Transaction">
            <FormRadioGroup
              name="filter.natureOfTransactions"
              options={[
                { label: 'All', value: NatureOfBankTransaction.All },
                { label: 'Deposit', value: NatureOfBankTransaction.Deposit },
                { label: 'Withdraw', value: NatureOfBankTransaction.Withdraw },
              ]}
              direction="column"
            />
          </Report.Filter>
          <Report.Filter title="Balance Range">
            <FormAmountFilter name="filter.amount" />
          </Report.Filter>
          <Report.Filter title="Bank">
            <FormSelect
              isMulti
              options={bankListData?.accounting?.bankAccounts?.list?.edges?.map((bank) => ({
                label: bank?.node?.bankName as string,
                value: bank?.node?.id as string,
              }))}
              name="filter.bank"
            />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};
