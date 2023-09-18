import { useState } from 'react';

import { GridItem } from '@myra-ui';

import {
  EbankingReportFilter,
  EbankingReportResult,
  useGetMBankingExpiryReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate, RouteToDetailsPage } from '@coop/cbs/utils';
import { FormBranchSelect } from '@coop/shared/form';

export const MBExpiryReport = () => {
  const [filters, setFilters] = useState<EbankingReportFilter | null>(null);

  const { data, isFetching } = useGetMBankingExpiryReportQuery(
    {
      data: filters as EbankingReportFilter,
    },
    { enabled: !!filters }
  );
  const mobileBankingReport = data?.report?.mobileBankingReport?.mbankingRegistrationReport?.data;

  return (
    <Report
      defaultFilters={null}
      data={mobileBankingReport as EbankingReportResult[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.MB_EXPIRY_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Mobile Banking Reports', link: '/cbs/reports/cbs-reports/mobile-banking' },
            {
              label: 'Mobile Banking Expiry Report',
              link: '/cbs/reports/cbs-reports/mobile-banking/expiry/new',
            },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect showUserBranchesOnly name="branchId" label="Service Center" />
          </GridItem>
          <GridItem colSpan={1}>
            <ReportDateRange label="Date Period" />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<EbankingReportResult & { index: number }>
            columns={[
              {
                header: 'S.No.',
                accessorKey: 'index',
                meta: {
                  width: '60px',
                },
              },
              {
                header: 'Member ID',
                accessorKey: 'memberId',
                cell: (props) => (
                  <RouteToDetailsPage
                    id={props?.row?.original?.memberId as string}
                    type="member"
                    label={props?.row?.original?.memberCode as string}
                  />
                ),
              },
              {
                header: 'Member Name',
                accessorFn: (row) => row?.memberName,
                meta: {
                  width: '40%',
                },
              },
              {
                header: 'Mobile No',
                accessorFn: (row) => row?.mobileNo,
              },
              {
                header: 'Registered Service Center (Code)',
                accessorFn: (row) => row?.branchCode,
              },
              {
                header: 'Expiry Date',
                accessorFn: (row) => localizedDate(row?.expDate),
                meta: {
                  skipExcelFormatting: true,
                },
              },
            ]}
          />
        </Report.Content>
      </Report.Body>
    </Report>
  );
};
