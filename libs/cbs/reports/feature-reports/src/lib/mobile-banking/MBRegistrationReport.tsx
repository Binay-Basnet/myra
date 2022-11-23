import { useState } from 'react';
import dayjs from 'dayjs';

import {
  EbankingReportFilter,
  EbankingReportResult,
  useGetMBankingRegistrationReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormBranchSelect } from '@coop/shared/form';
import { GridItem } from '@coop/shared/ui';

export const MBRegistrationReport = () => {
  const [filters, setFilters] = useState<EbankingReportFilter | null>(null);

  const { data, isInitialLoading } = useGetMBankingRegistrationReportQuery(
    {
      data: filters as EbankingReportFilter,
    },
    { enabled: !!filters }
  );
  const mobileBankingReport = data?.report?.mbankingRegistrationReport?.data;

  return (
    <Report
      defaultFilters={null}
      data={mobileBankingReport as EbankingReportResult[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isInitialLoading}
      report={ReportEnum.MB_REGISTRATION_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Mobile Banking Reports', link: '/reports/cbs/mobile-banking' },
            {
              label: 'Mobile Banking Registration Report',
              link: '/reports/cbs/mobile-banking/registration/new',
            },
          ]}
        />
        <Report.Inputs defaultFilters={null} setFilters={setFilters}>
          <GridItem colSpan={3}>
            <FormBranchSelect name="branchId" label="Branch" />
          </GridItem>
          <GridItem colSpan={1}>
            <ReportDateRange label="Branch Established Date" />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization statementDate={filters?.period?.periodType} />
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
              },
              {
                header: 'Member Name',
                accessorFn: (row) => row?.memberName,
              },
              {
                header: 'Mobile No',
                accessorFn: (row) => row?.mobileNo,
              },
              {
                header: 'Registered Branch (Code)',
                accessorFn: (row) => row?.branchCode,
              },
              {
                header: 'Registered Date',
                accessorFn: (row) => row?.regDate,
                cell: (props) => dayjs(props.getValue() as string).format('YYYY-MM-DD'),
              },
              {
                header: 'Expiry Date',
                accessorFn: (row) => row?.expDate,
                cell: (props) => dayjs(props.getValue() as string).format('YYYY-MM-DD'),
              },
              {
                header: 'Status',
                accessorFn: (row) => row?.status,
              },
              {
                header: 'Registered By',
                accessorFn: (row) => row?.registeredBy,
              },
            ]}
          />
        </Report.Content>
      </Report.Body>
    </Report>
  );
};
