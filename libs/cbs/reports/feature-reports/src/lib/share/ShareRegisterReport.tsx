import { useState } from 'react';

import { GridItem } from '@myra-ui';

import {
  SharePurchaseRegisterReport,
  SharePurchaseRegisterReportFilter,
  ShareTransactionType,
  useGetShareRegisterReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { RouteToDetailsPage } from '@coop/cbs/utils';
import { FormBranchSelect, FormRadioGroup } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

type ShareRegisterReportFilters = Omit<SharePurchaseRegisterReportFilter, 'branchId'> & {
  branchId: {
    label: string;
    value: string;
  }[];
};

export const ShareRegisterReport = () => {
  const [filters, setFilters] = useState<ShareRegisterReportFilters | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;

  const { data, isFetching } = useGetShareRegisterReportQuery(
    {
      data: { ...filters, branchId: branchIds } as SharePurchaseRegisterReportFilter,
    },
    { enabled: !!filters }
  );

  const shareRegisterData = data?.report?.shareReport?.sharePurchaseRegisterReport?.data;

  return (
    <Report
      defaultFilters={{
        filter: {
          type: ShareTransactionType.All,
        },
      }}
      data={shareRegisterData as SharePurchaseRegisterReport[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.SHARE_REGISTER}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Share Reports', link: '/cbs/reports/cbs-reports/share' },
            { label: 'Share Register', link: '/cbs/reports/cbs-reports/share/register/new' },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect showUserBranchesOnly isMulti name="branchId" label="Service Center" />
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
          <Report.Table<SharePurchaseRegisterReport>
            hasSNo={false}
            columns={[
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
                meta: {
                  skipExcelFormatting: true,
                },
              },
              {
                header: 'Name',
                accessorKey: 'name',
              },
              {
                header: 'Particular',
                accessorKey: 'particular',
              },
              {
                header: 'Service Center',
                accessorKey: 'branchName',
              },
              {
                header: 'Share Information',
                columns: [
                  {
                    header: 'Per Share Amount(100)',
                    accessorKey: 'perShareAmount',
                    meta: {
                      isNumeric: true,
                    },
                  },
                  {
                    header: 'Kitta Number From ',
                    accessorKey: 'kittaNumFrom',
                    meta: {
                      isNumeric: true,
                    },
                  },

                  {
                    header: 'Kitta Number To ',
                    accessorKey: 'kittaNumTo',
                    meta: {
                      isNumeric: true,
                    },
                  },
                  {
                    header: 'Total Kitta ',
                    accessorKey: 'totalKitta',
                    meta: {
                      isNumeric: true,
                    },
                  },
                  {
                    header: 'Total Amount ',
                    accessorKey: 'totalAmount',
                    cell: (props) => amountConverter(props.getValue() as string),
                    meta: {
                      isNumeric: true,
                    },
                  },
                ],
              },
            ]}
          />
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="Type of Share Transaction">
            <FormRadioGroup
              name="filter.type"
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
