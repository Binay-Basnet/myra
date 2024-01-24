import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

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
import { amountConverter, useIsCbs } from '@coop/shared/utils';

type Filters = Omit<BankGlStatementFilter, 'filter' | 'branchId' | 'bankAccounts'> & {
  branchId: { label: string; value: string }[];
  bankAccounts: { label: string; value: string }[];
  filter: {
    amount?: MinMaxFilter;
    bank?: { label: string; value: string }[];
    natureOfTransactions: NatureOfBankTransaction;
    includeZero?: 'include' | 'exclude';
  };
};

export const BankGLStatementReport = () => {
  const [filters, setFilters] = useState<Filters | null>(null);

  const { isCbs } = useIsCbs();

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;
  const bankAccountsIds =
    filters?.bankAccounts && filters?.bankAccounts.length !== 0
      ? filters?.bankAccounts?.map((t) => t.value)
      : null;

  const { data, isFetching } = useGetBankGlStatementReportQuery(
    {
      data: {
        branchId: branchIds,
        period: filters?.period as LocalizedDateFilter,
        bankAccounts: bankAccountsIds,
        filter: {
          amount:
            filters?.filter?.amount?.max && filters?.filter?.amount?.min
              ? filters?.filter?.amount
              : null,
          natureOfTransactions: filters?.filter?.natureOfTransactions,
          includeZero: filters?.filter?.includeZero === 'include',
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
            {
              label: 'Transaction Reports',
              link: isCbs
                ? '/cbs/reports/cbs-reports/transactions'
                : '/accounting/reports/accounting-reports/transactions',
            },
            {
              label: 'Bank GL Statement',
              link: isCbs
                ? '/cbs/reports/cbs-reports/transactions/bank-gl-statement/new'
                : '/accounting/reports/accounting-reports/transactions/bank-gl-statement/new',
            },
          ]}
        />
        <Report.Inputs>
          <BankGlStatementInputs />
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
                meta: {
                  skipExcelFormatting: true,
                },
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
          <Report.Filter title="Zero Balance">
            <FormRadioGroup
              name="filter.includeZero"
              options={[
                { label: 'Include', value: 'include' },
                { label: 'Exclude', value: 'exclude' },
              ]}
              direction="column"
            />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};

const BankGlStatementInputs = () => {
  const [triggerQuery, setTriggerQuery] = useState(false);
  const methods = useFormContext<Filters>();
  const { watch } = methods;
  const branchIds = watch('branchId');
  const branchesArray = branchIds && branchIds.length !== 0 ? branchIds?.map((t) => t.value) : null;
  const { data: bankListData } = useGetBankAccountListQuery(
    {
      pagination: { after: '', first: -1 },
      filter: {
        orConditions: [
          {
            andConditions: [
              {
                column: 'branchId',
                comparator: 'IN',
                value: branchesArray,
              },
            ],
          },
        ],
      },
    },
    { enabled: triggerQuery }
  );
  useEffect(() => {
    if (branchIds?.length) {
      setTriggerQuery(true);
    }
  }, [branchIds]);
  return (
    <>
      <GridItem colSpan={1}>
        <FormBranchSelect showUserBranchesOnly name="branchId" label="Service Center" isMulti />
      </GridItem>
      <GridItem colSpan={2}>
        <FormSelect
          name="bankAccounts"
          label="Select Bank Accounts"
          isMulti
          options={
            branchIds
              ? bankListData?.accounting?.bankAccounts?.list?.edges?.map((bank) => ({
                  label: bank?.node?.displayName as string,
                  value: bank?.node?.id as string,
                }))
              : undefined
          }
        />
      </GridItem>
      <GridItem colSpan={1}>
        <ReportDateRange />
      </GridItem>{' '}
    </>
  );
};
