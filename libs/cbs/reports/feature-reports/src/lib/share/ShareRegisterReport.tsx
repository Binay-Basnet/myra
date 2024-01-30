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
import { amountConverter, useTranslation } from '@coop/shared/utils';

type ShareRegisterReportFilters = Omit<SharePurchaseRegisterReportFilter, 'branchId'> & {
  branchId: {
    label: string;
    value: string;
  }[];
};

export const ShareRegisterReport = () => {
  const { t } = useTranslation();

  const [filters, setFilters] = useState<ShareRegisterReportFilters | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((b) => b.value)
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
            { label: 'reportsSidebarShareReports', link: '/cbs/reports/cbs-reports/share' },
            { label: 'reportsShareRegister', link: '/cbs/reports/cbs-reports/share/register/new' },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect
              showUserBranchesOnly
              isMulti
              name="branchId"
              label={t['serviceCenter']}
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
          <Report.Table<SharePurchaseRegisterReport>
            hasSNo={false}
            columns={[
              {
                header: t['reportsShareRegisterMemberId'],
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
                header: t['reportsShareRegisterName'],
                accessorKey: 'name',
              },
              {
                header: t['reportsShareRegisterParticular'],
                accessorKey: 'particular',
              },
              {
                header: t['reportsShareRegisterServiceCenter'],
                accessorKey: 'branchName',
              },
              {
                header: t['reportsShareRegisterShareInformation'],
                columns: [
                  {
                    header: t['reportsShareRegisterPerShareAmount'],
                    accessorKey: 'perShareAmount',
                    meta: {
                      isNumeric: true,
                    },
                  },
                  {
                    header: t['reportsShareRegisterKittaNumberFrom'],
                    accessorKey: 'kittaNumFrom',
                    meta: {
                      isNumeric: true,
                    },
                  },

                  {
                    header: t['reportsShareRegisterKittaNumberTo'],
                    accessorKey: 'kittaNumTo',
                    meta: {
                      isNumeric: true,
                    },
                  },
                  {
                    header: t['reportsShareRegisterTotalKitta'],
                    accessorKey: 'totalKitta',
                    meta: {
                      isNumeric: true,
                    },
                  },
                  {
                    header: t['reportsShareRegisterTotalAmount'],
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
          <Report.Filter title={t['reportsShareRegisterReportTypeOfShareTransaction']}>
            <FormRadioGroup
              name="filter.type"
              options={[
                {
                  label: t['reportsShareRegisterReportTypeOfShareTransactionAll'],
                  value: ShareTransactionType.All,
                },
                {
                  label: t['reportsShareRegisterReportTypeOfShareTransactionIssue'],
                  value: ShareTransactionType.Issue,
                },
                {
                  label: t['reportsShareRegisterReportTypeOfShareTransactionReturn'],
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
