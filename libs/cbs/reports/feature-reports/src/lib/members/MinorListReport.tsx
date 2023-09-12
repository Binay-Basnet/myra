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

type MinorListReportFilter = Omit<MinorFilter, 'branchId'> & {
  branchId: {
    label: string;
    value: string;
  }[];
};

export const MinorListReport = () => {
  const [filters, setFilters] = useState<MinorListReportFilter | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
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
            { label: 'Members Reports', link: '/cbs/reports/cbs-reports/members' },
            {
              label: 'Minor List Report',
              link: '/cbs/reports/cbs-reports/members/minor-list/new',
            },
          ]}
        />
        <Report.Inputs hideDate>
          <GridItem colSpan={3}>
            <FormBranchSelect showUserBranchesOnly isMulti name="branchId" label="Service Center" />
          </GridItem>
          <GridItem colSpan={1}>
            <FormSelect
              name="minorType"
              label="Minor Type"
              options={[
                {
                  label: 'All Minor',
                  value: MinorTypeFilter.AllMinors,
                },
                {
                  label: 'Minor with Saving Account',
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
                header: 'S.No.',
                accessorKey: 'index',
                meta: {
                  width: '60px',
                },
              },
              {
                header: 'Member Id',
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
                header: 'Member Name',
                accessorFn: (row) => row?.memberName?.local,
                meta: {
                  width: '40%',
                },
              },
              {
                header: 'Service Center Name',
                accessorFn: (row) => row?.serviceCentreName,
                meta: {
                  width: '40%',
                },
              },
              {
                header: 'Minor Name',
                accessorFn: (row) => row?.minorName,
              },
              {
                header: 'Relationship',
                accessorFn: (row) => row?.relationshipName,
              },

              {
                header: 'Date of Birth',
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
