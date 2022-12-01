import { useState } from 'react';
import { GridItem } from '@myra-ui';
import dayjs from 'dayjs';

import {
  EbankingReportFilter,
  EbankingReportResult,
  useGetMBankingExpiryReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormBranchSelect } from '@coop/shared/form';

export const MBExpiryReport = () => {
  const [filters, setFilters] = useState<EbankingReportFilter | null>(null);

  const { data, isFetching } = useGetMBankingExpiryReportQuery(
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
      isLoading={isFetching}
      report={ReportEnum.MB_EXPIRY_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Mobile Banking Reports', link: '/reports/cbs/mobile-banking' },
            {
              label: 'Mobile Banking Registration Report',
              link: '/reports/cbs/mobile-banking/expiry/new',
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
                accessorFn: (row) => row?.expDate,
                cell: (props) => dayjs(props.getValue() as string).format('YYYY-MM-DD'),
              },
            ]}
          />
        </Report.Content>
      </Report.Body>
    </Report>
  );
};
