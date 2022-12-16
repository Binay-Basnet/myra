import { useState } from 'react';
import dayjs from 'dayjs';

import { GridItem } from '@myra-ui';

import {
  EbankingReportFilter,
  EbankingReportResult,
  useGetMBankingRegistrationReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormBranchSelect } from '@coop/shared/form';

export const MBRegistrationReport = () => {
  const [filters, setFilters] = useState<EbankingReportFilter | null>(null);

  const { data, isFetching } = useGetMBankingRegistrationReportQuery(
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
        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect name="branchId" label="Branch" />
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
                header: 'Registered Service Center(Code)',
                accessorFn: (row) => row?.branchCode,
              },
              {
                header: 'Registered Date',
                accessorFn: (row) => row?.regDate?.local,
                cell: (props) => dayjs(props.getValue() as string).format('YYYY-MM-DD'),
              },
              {
                header: 'Expiry Date',
                accessorFn: (row) => row?.expDate?.local,
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
