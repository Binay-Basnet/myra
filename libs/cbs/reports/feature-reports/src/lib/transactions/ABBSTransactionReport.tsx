import { useState } from 'react';

import { GridItem } from '@myra-ui';

import {
  AbbsTransactionFilter,
  AbbsTransactionReport,
  AbbsTransactionReportFilter,
  useGetAbbsTransactionReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate, localizedText, RouteToDetailsPage } from '@coop/cbs/utils';
import { FormBranchSelect, FormRadioGroup } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

type AbbsReportFilters = Omit<AbbsTransactionReportFilter, 'branchId'> & {
  branchId: {
    label: string;
    value: string;
  }[];
};
const transactionOptions = [
  { label: 'All', value: AbbsTransactionFilter.All },
  { label: '170.2.1 Payment Payable', value: AbbsTransactionFilter.PaymentPayable },

  { label: '170.2.2 Payment Receivable', value: AbbsTransactionFilter.PaymentReceivable },
];

export const ABBSTransactionReport = () => {
  const [filters, setFilters] = useState<AbbsReportFilters | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;

  const { data, isFetching } = useGetAbbsTransactionReportQuery(
    {
      data: {
        ...filters,
        branchId: branchIds,
      } as AbbsTransactionReportFilter,
    },
    { enabled: !!filters }
  );

  const abbsStatusReport = data?.report?.transactionReport?.financial?.abbsTransactionReport?.data;

  return (
    <Report
      defaultFilters={{}}
      data={abbsStatusReport as AbbsTransactionReport[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.TRANSACTION_ABBS_TRANSACTION_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            {
              label: 'Transaction Reports',
              link: '/reports/cbs/transactions',
            },
            {
              label: 'ABBS Transaction Report',
              link: '/reports/cbs/transactions/abbs-transaction/new',
            },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={2}>
            <FormBranchSelect isMulti name="branchId" label="Select Service Center" />
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
          <Report.Table<AbbsTransactionReport & { index: number }>
            columns={[
              {
                header: 'S.No',
                accessorKey: 'index',
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Date',
                accessorFn: (row) => localizedDate(row?.date),
              },
              {
                header: 'Member Name',
                accessorFn: (row) => localizedText(row?.memberName),
              },
              {
                header: 'Account Number',
                accessorKey: 'accountNo',
                cell: (props) => (
                  <RouteToDetailsPage
                    id={props?.row?.original?.accountNo as string}
                    type="savings"
                    label={props?.row?.original?.accountNo as string}
                  />
                ),
              },
              {
                header: 'Type of Transaction',
                accessorKey: 'typeOfTransaction',
              },
              {
                header: 'Member Branch',
                accessorKey: 'memberBranch',
              },
              {
                header: 'Transaction Branch',
                accessorKey: 'transactionBranch',
              },
              {
                header: '170.2.1 Payment Payable',
                accessorKey: 'paymentPayable',
                cell: (props) => amountConverter(props.getValue() as string),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: '170.2.2 Payment Receivable ',
                accessorKey: 'paymentReceivable',
                cell: (props) => amountConverter(props.getValue() as string),
                meta: {
                  isNumeric: true,
                },
              },
            ]}
          />
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="Transaction Type">
            <FormRadioGroup
              name="transactionType"
              options={transactionOptions}
              direction="column"
            />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};
