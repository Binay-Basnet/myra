import { useMemo, useState } from 'react';

import { GridItem } from '@myra-ui';

import {
  MrTransactionFilter,
  MrTransactionReport,
  MrTransactionReportFilter,
  useGetAgentListDataQuery,
  useGetMrTransactionReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { RouteToDetailsPage } from '@coop/cbs/utils';
import { FormRadioGroup, FormSelect } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

type MRReportFilters = Omit<MrTransactionReportFilter, 'userId'> & {
  userId: {
    label: string;
    value: string;
  }[];
};
const transactionOptions = [
  { label: 'Deposit', value: MrTransactionFilter.Deposit },
  { label: 'Withdraw', value: MrTransactionFilter.Withdraw },
];

export const MarketRepresentativeTransactionReport = () => {
  const [filters, setFilters] = useState<MRReportFilters | null>(null);

  const userIds =
    filters?.userId && filters?.userId.length !== 0 ? filters?.userId?.map((t) => t.value) : null;

  const { data: agentList } = useGetAgentListDataQuery({
    pagination: {
      after: '',
      first: -1,
    },
    currentBranchOnly: true,
  });

  const agentData = useMemo(() => agentList?.agent?.listAgent?.edges ?? [], [agentList]);

  const agentOptions = agentData.map((item) => ({
    label: item?.node?.agentName as string,
    value: item?.node?.id as string,
  }));

  const { data, isFetching } = useGetMrTransactionReportQuery(
    {
      data: {
        ...filters,
        userId: userIds,
      } as MrTransactionReportFilter,
    },
    { enabled: !!filters }
  );

  const mrReport = data?.report?.transactionReport?.financial?.mrTransactionReport?.data;

  return (
    <Report
      defaultFilters={{}}
      data={mrReport as MrTransactionReport[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.TRANSACTION_MRTRANSACTION_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            {
              label: 'Transaction Reports',
              link: '/reports/cbs/transactions',
            },
            {
              label: 'Market Representative Transaction Report',
              link: '/reports/cbs/transactions/mr-transaction/new',
            },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={2}>
            <FormSelect
              isMulti
              name="userId"
              label="Select Market Representative"
              options={agentOptions}
            />
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
          <Report.Table<MrTransactionReport & { index: number }>
            columns={[
              {
                header: 'S.No',
                accessorKey: 'index',
                meta: {
                  isNumeric: true,
                },
              },

              {
                header: 'Member Name',
                accessorKey: 'memberName',
              },
              {
                header: 'Member Id',
                accessorKey: 'memberCode',
                cell: (props) => (
                  <RouteToDetailsPage
                    id={props?.row?.original?.memberId as string}
                    type="member"
                    label={props?.row?.original?.memberCode as string}
                  />
                ),
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
                header: 'Account Name',
                accessorKey: 'accountName',
              },

              {
                header: 'Type of Transaction',
                accessorKey: 'typeOfTransaction',
              },
              {
                header: 'Market Representative Name',
                accessorKey: 'mrName',
              },
              {
                header: 'Amount',
                accessorKey: 'amount',
                accessorFn: (props) => amountConverter(props?.amount || '0'),
              },
            ]}
          />
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="Transaction Type">
            <FormRadioGroup
              name="filter.transactionType"
              options={transactionOptions}
              direction="column"
            />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};
