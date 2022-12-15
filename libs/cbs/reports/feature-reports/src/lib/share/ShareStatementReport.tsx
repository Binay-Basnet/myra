import { useState } from 'react';

import { Box, GridItem } from '@myra-ui';

import {
  ShareStatement,
  ShareStatementReportSettings,
  ShareTransactionType,
  useGetShareStatementQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange, ReportMember } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate } from '@coop/cbs/utils';
import { FormMemberSelect, FormRadioGroup } from '@coop/shared/form';

export const ShareStatementReport = () => {
  const [filters, setFilters] = useState<ShareStatementReportSettings | null>(null);

  const { data, isFetching } = useGetShareStatementQuery(
    { data: filters as ShareStatementReportSettings },
    { enabled: !!filters }
  );

  const shareMember = data?.report?.shareReport?.shareStatementReport?.member;
  // const branch = useAppSelector((state) => state?.auth?.user?.branch);

  // const member = {
  //   'Name of member': shareMember?.name?.local as string,
  //   Address: formatAddress(shareMember?.address) as string,
  //   'Branch Name': branch?.name as string,
  //   'Membership No': shareMember?.code as string,
  //   'Membership Date': dayjs(shareMember?.dateJoined).format('YYYY-MM-DD') as string,
  // };

  const shareData = data?.report?.shareReport?.shareStatementReport?.statement;
  const shareReport = shareData && 'shareStatement' in shareData ? shareData.shareStatement : [];
  const shareReportTotal = shareData && 'shareStatement' in shareData ? shareData.totals : {};

  return (
    <Report
      defaultFilters={{ filter: ShareTransactionType.All }}
      data={shareReport as ShareStatement[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.SHARE_STATEMENT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Share Reports', link: '/reports/cbs/share' },
            { label: 'Share Statement', link: '/reports/cbs/share/statement/new' },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormMemberSelect name="memberId" label="Member Search" />
          </GridItem>
          <GridItem colSpan={1}>
            <ReportDateRange />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <ReportMember member={shareMember} />
          <Report.Table<ShareStatement & { index: number }>
            showFooter
            columns={[
              {
                header: 'S.No.',
                footer: () => <Box textAlign="right">Total Balance</Box>,
                accessorKey: 'index',
                meta: {
                  width: '60px',
                  Footer: {
                    colspan: 3,
                  },
                },
              },
              {
                header: 'Date',
                accessorKey: 'date',
                accessorFn: (row) => localizedDate(row?.date),
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Particular',
                accessorKey: 'particular',
                meta: {
                  width: '100%',
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'No of Share',
                footer: () => shareReportTotal?.totalShares,
                accessorKey: 'noOfShares',
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Return Amount (Dr.)',
                accessorKey: 'returnAmountDr',
                footer: () => shareReportTotal?.totalDr,
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Issue Amount (Cr.)',
                accessorKey: 'purchaseAmountCr',
                footer: () => shareReportTotal?.totalCr,

                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Balance Sheet',
                accessorKey: 'balanceSheet',
                footer: () => shareReportTotal?.totalBalanceSheet,

                meta: {
                  isNumeric: true,
                },
              },
            ]}
          />
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="Type of Share Transaction">
            <FormRadioGroup
              name="filter"
              options={[
                { label: 'All', value: ShareTransactionType.All },
                { label: 'Issue', value: ShareTransactionType.Issue },
                { label: 'Return', value: ShareTransactionType.Return },
              ]}
              direction="column"
            />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};
