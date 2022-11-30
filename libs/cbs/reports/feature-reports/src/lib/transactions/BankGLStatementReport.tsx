import { useState } from 'react';
import { GridItem } from '@myra-ui';

import {
  BankGlDataEntry,
  BankGlStatementFilter,
  NatureOfBankTransaction,
  useGetBankGlStatementReportQuery,
  useGetBankListQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormAmountFilter, FormBranchSelect, FormRadioGroup, FormSelect } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

export const BankGLStatementReport = () => {
  const [filters, setFilters] = useState<BankGlStatementFilter | null>(null);

  const { data: bankListData } = useGetBankListQuery();
  const { data, isFetching } = useGetBankGlStatementReportQuery(
    {
      data: filters as BankGlStatementFilter,
    },
    { enabled: !!filters }
  );

  const bankGlReport = data?.report?.bankGLStatementReport?.data;

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
        <Report.Inputs
          defaultFilters={{
            filter: {
              natureOfTransactions: NatureOfBankTransaction.All,
            },
          }}
          setFilters={setFilters}
        >
          <GridItem colSpan={3}>
            <FormBranchSelect name="branchId" label="Branch" />
          </GridItem>
          <GridItem colSpan={1}>
            <ReportDateRange />
          </GridItem>{' '}
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization statementDate={filters?.period?.periodType} />
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
                header: 'Date',
                accessorFn: (row) => row?.date?.en,
              },
              {
                header: 'Particular',
                accessorKey: 'particular',
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
              name="filter.type"
              options={[
                { label: 'All', value: NatureOfBankTransaction.All },
                { label: 'Deposit', value: NatureOfBankTransaction.Deposit },
                { label: 'Withdraw', value: NatureOfBankTransaction.Withdraw },
              ]}
              direction="column"
            />
          </Report.Filter>
          <Report.Filter title="Balance Range">
            <FormAmountFilter name="amount" />
          </Report.Filter>
          <Report.Filter title="Bank">
            <FormSelect
              isMulti
              options={bankListData?.bank?.bank?.list?.map((bank) => ({
                label: bank?.name as string,
                value: bank?.id as string,
              }))}
              name="bank"
            />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};
