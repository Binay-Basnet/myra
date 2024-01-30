import { useState } from 'react';

import { GridItem } from '@myra-ui';

import {
  ComparatorType,
  MinorFilter,
  MinorInformation,
  MinorTypeFilter,
  useGetMinorListReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate, RouteToDetailsPage } from '@coop/cbs/utils';
import { FormBranchSelect, FormSelect } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type MinorListReportFilter = Omit<MinorFilter, 'branchId'> & {
  branchId: {
    label: string;
    value: string;
  }[];
};

export const MinorListReport = () => {
  const { t } = useTranslation();

  const [filters, setFilters] = useState<MinorListReportFilter | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((b) => b.value)
      : null;

  const { data, isFetching } = useGetMinorListReportQuery(
    {
      data: {
        orConditions:
          branchIds?.map((b) => ({
            andConditions: [
              {
                column: 'branchId',
                comparator: ComparatorType.EqualTo,
                value: b,
              },
              {
                column: 'said',
                comparator:
                  filters?.minorType === 'WITH_SAVING_ACCOUNT'
                    ? ComparatorType.HasValue
                    : ComparatorType.HasNoValue,
                value:
                  filters?.minorType === 'WITH_SAVING_ACCOUNT'
                    ? ComparatorType.HasValue
                    : ComparatorType.HasNoValue,
              },
            ],
          })) || [],
      },
    },
    { enabled: !!filters }
  );
  const minorReport = data?.report?.memberReport?.minorReport?.data;

  return (
    <Report
      defaultFilters={{}}
      data={minorReport as MinorInformation[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.MINOR_LIST_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: t['reportsSidebarMemberReports'], link: '/cbs/reports/cbs-reports/members' },
            {
              label: t['reportsMinorListReport'],
              link: '/cbs/reports/cbs-reports/members/minor-list/new',
            },
          ]}
        />
        <Report.Inputs hideDate>
          <GridItem colSpan={3}>
            <FormBranchSelect
              showUserBranchesOnly
              isMulti
              name="branchId"
              label={t['reportsMinorListReport']}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <FormSelect
              name="minorType"
              label={t['reportsMemberMinorListReportMinorType']}
              options={[
                {
                  label: t['reportsMemberMinorListReportMinorTypeAllMinor'],
                  value: MinorTypeFilter.AllMinors,
                },
                {
                  label: t['reportsMemberMinorListReportMinorTypeMinorWithSavingAccount'],
                  value: MinorTypeFilter.WithSavingAccount,
                },
              ]}
            />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<MinorInformation & { index: number }>
            columns={[
              {
                header: t['sn'],
                accessorKey: 'index',
                meta: {
                  width: '60px',
                },
              },
              {
                header: t['reportsMemberMinorListReportMemberId'],
                accessorKey: 'memberId',
                cell: (props) => (
                  <RouteToDetailsPage
                    id={props?.row?.original?.memberId as string}
                    type="member"
                    label={props?.row?.original?.memberId as string}
                  />
                ),
              },

              {
                header: t['reportsMemberMinorListReportMemberName'],
                accessorFn: (row) => row?.memberName?.local,
                meta: {
                  width: '40%',
                },
              },
              {
                header: t['reportsMemberMinorListReportServiceCenterName'],
                accessorFn: (row) => row?.serviceCentreName,
                meta: {
                  width: '40%',
                },
              },
              {
                header: t['reportsMemberMinorListReportMinorName'],
                accessorFn: (row) => row?.minorName,
              },
              {
                header: t['reportsMemberMinorListReportRelationship'],
                accessorFn: (row) => row?.relationshipName,
              },

              {
                header: t['reportsMemberMinorListReportDateOfBirth'],
                accessorFn: (row) => row?.dateOfBirth,
                cell: (props) => localizedDate(props.row.original.dateOfBirth),
                meta: {
                  skipExcelFormatting: true,
                },
              },
            ]}
            hasSNo
          />
        </Report.Content>
      </Report.Body>
    </Report>
  );
};
