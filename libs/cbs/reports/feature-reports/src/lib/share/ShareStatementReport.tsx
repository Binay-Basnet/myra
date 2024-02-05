import { useState } from 'react';
import { useRouter } from 'next/router';

import { Box, GridItem, Text } from '@myra-ui';

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
import { amountConverter, quantityConverter, useTranslation } from '@coop/shared/utils';

export const ShareStatementReport = () => {
  const { t } = useTranslation();

  const [filters, setFilters] = useState<ShareStatementReportSettings | null>(null);
  const router = useRouter();
  const memberId = router.query?.['memberId'];

  const { data, isFetching } = useGetShareStatementQuery(
    { data: filters as ShareStatementReportSettings },
    { enabled: !!filters }
  );
  const shareMember = data?.report?.shareReport?.shareStatementReport?.member;

  // const branchIds =
  //   filters?.branchId && filters?.branchId.length !== 0
  //     ? filters?.branchId?.map((t) => t.value)
  //     : null;

  // console.log('test', branchIds);
  // const member = {
  //   'Name of member': shareMember?.name?.local as string,
  //   Address: formatAddress(shareMember?.address) as string,
  //   'Branch Name': branch?.name as string,
  //   'Membership No': shareMember?.code as string,
  //   'Membership Date': dayjs(shareMember?.dateJoined).format('YYYY-MM-DD') as string,
  // };

  const shareData = data?.report?.shareReport?.shareStatementReport?.statement;
  const openingBalance = shareData && 'shareStatement' in shareData ? shareData.openingBalance : [];
  const shareReport = shareData && 'shareStatement' in shareData ? shareData.shareStatement : [];
  const shareReportTotal = shareData && 'shareStatement' in shareData ? shareData.totals : {};

  return (
    <Report
      defaultFilters={{
        memberId: memberId as string,
        filter: ShareTransactionType.All,
      }}
      data={shareReport as ShareStatement[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.SHARE_STATEMENT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: t['reportsSidebarShareReports'], link: '/cbs/reports/cbs-reports/share' },
            {
              label: t['reportsShareStatement'],
              link: '/cbs/reports/cbs-reports/share/statement/new',
            },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormMemberSelect
              name="memberId"
              label={t['reportsShareStatementReportMemberSearch']}
            />
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
          <Box display="flex" justifyContent="end" px="s16">
            <Text fontSize="r1" fontWeight="500">
              {t['reportsShareStatementReportOpeningBalance']}:{' '}
              {amountConverter((openingBalance as number) || 0)}
            </Text>
          </Box>

          <Report.Table<ShareStatement & { index: number }>
            showFooter
            columns={[
              {
                header: t['sn'],
                footer: () => (
                  <Box textAlign="right">{t['reportsShareStatementReportTotalBalance']}</Box>
                ),
                accessorKey: 'index',
                meta: {
                  width: '60px',
                  Footer: {
                    colspan: 3,
                  },
                },
              },
              {
                header: t['reportsShareStatementReportDate'],
                accessorKey: 'date',
                accessorFn: (row) => localizedDate(row?.date),
                meta: {
                  Footer: {
                    display: 'none',
                  },
                  skipExcelFormatting: true,
                },
              },
              {
                header: t['reportsShareStatementReportParticular'],
                accessorKey: 'particular',
                cell: (row) => (
                  <Box whiteSpace="pre-line" w="200px" my="s4">
                    {row?.row?.original?.particular}
                  </Box>
                ),
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: t['reportsShareStatementReportNoOfShare'],
                footer: () => shareReportTotal?.totalShares,
                accessorKey: 'noOfShares',
                cell: (props) => quantityConverter(props.getValue() as string),

                meta: {
                  isNumeric: true,
                },
              },
              {
                header: t['reportsShareStatementReportReturnAmountDr'],
                accessorKey: 'returnAmountDr',
                cell: (props) => amountConverter(props.getValue() as string),

                footer: () => amountConverter(shareReportTotal?.totalDr as number),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: t['reportsShareStatementReportIssueAmountCr'],
                accessorKey: 'purchaseAmountCr',
                cell: (props) => amountConverter(props.getValue() as string),

                footer: () => amountConverter(shareReportTotal?.totalCr as number),

                meta: {
                  isNumeric: true,
                },
              },
              {
                header: t['reportsShareStatementReportBalanceSheet'],
                accessorKey: 'balanceSheet',
                cell: (props) => amountConverter(props.getValue() as string),

                footer: () => amountConverter(shareReportTotal?.totalBalanceSheet as number),

                meta: {
                  isNumeric: true,
                },
              },
            ]}
          />
          <Box display="flex" px="s16" justifyContent="end">
            <Text fontSize="r1" fontWeight="500">
              {t['reportsShareStatementReportClosingBalance']}:{' '}
              {amountConverter(shareReportTotal?.totalBalanceSheet || 0)}
            </Text>
          </Box>
        </Report.Content>
        <Report.Filters>
          <Report.Filter title={t['reportsShareStatementReportTypeOfShareTransaction']}>
            <FormRadioGroup
              name="filter"
              options={[
                {
                  label: t['reportsShareStatementReportTypeOfShareTransactionAll'],
                  value: ShareTransactionType.All,
                },
                {
                  label: t['reportsShareStatementReportTypeOfShareTransactionIssue'],
                  value: ShareTransactionType.Issue,
                },
                {
                  label: t['reportsShareStatementReportTypeOfShareTransactionReturn'],
                  value: ShareTransactionType.Return,
                },
              ]}
              direction="column"
            />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};
