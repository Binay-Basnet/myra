import { useState } from 'react';

import { GridItem } from '@myra-ui';

import {
  LocalizedDateFilter,
  ReportEntry,
  useGetMemberClassificationReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';

type ClassifyBy =
  | 'All'
  | 'Gender Wise'
  | 'Age Wise'
  | 'Occupation Wise'
  | 'Education Level Wise'
  | 'Income Level Wise'
  | 'Address Wise'
  | 'Member Category Wise';

const ClassifyAll = [
  'Gender Wise',
  'Age Wise',
  'Occupation Wise',
  'Member Category Wise',
  'Education Level Wise',
  'Income Level Wise',
];

const classificationKeys = {
  'Gender Wise': 'gender',
  'Age Wise': 'age',
  'Occupation Wise': 'occupation',
  'Member Category Wise': 'memberCategory',
  'Education Level Wise': 'education',
  'Income Level Wise': 'income',
};

type MemberClassificationFilter = {
  classificationBy: ClassifyBy[];
  period: LocalizedDateFilter;
};

export const MemberClassificationReport = () => {
  const [filters, setFilters] = useState<MemberClassificationFilter | null>(null);

  const { data, isFetching } = useGetMemberClassificationReportQuery(
    {
      data: filters as MemberClassificationFilter,
    },
    { enabled: !!filters }
  );
  const memberData = data?.report?.memberReport?.memberClassificationReport?.data;
  const genderWiseReport = memberData?.gender;
  const ageReport = memberData?.age;
  const occupationReport = memberData?.occupation;

  return (
    <Report
      defaultFilters={{}}
      data={genderWiseReport as ReportEntry[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.MEMBER_CLASSIFICATION_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Members Reports', link: '/reports/cbs/member-report' },
            {
              label: 'Member Classification Report',
              link: '/reports/cbs/members/classification/new',
            },
          ]}
        />

        <Report.Inputs>
          {/* <GridItem colSpan={3}>
            <FormBranchSelect name="branchId" label="Service Center" />
          </GridItem> */}

          <GridItem colSpan={1}>
            <GridItem colSpan={1}>
              <ReportDateRange label="Date Period" />
            </GridItem>
          </GridItem>
        </Report.Inputs>
      </Report.Header>
      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          {genderWiseReport && <MemberTable data={genderWiseReport} />}
        </Report.Content>
      </Report.Body>
    </Report>
  );
};

interface IMemberTableProps {
  data: ({
    entryName?: string | null | undefined;
    inNumber?: number | null | undefined;
    inPercent?: string | null | undefined;
  } | null)[];
  header?: string;
  footer?: {
    label: string;
    data1: string | number | undefined;
    data2: string | number | undefined;
  };
}

export const MemberTable = ({ data, header, footer }: IMemberTableProps) => {
  if (data?.length === 0) {
    return null;
  }
  const newData =
    data?.map((val, index) => ({
      index: Number(index) + 1,
      entryName: val?.entryName,
      inNumber: val?.inNumber,
      inPercent: val?.inPercent,
    })) || [];

  return (
    <Report.Table<ReportEntry & { index: number }>
      data={newData}
      showFooter
      columns={[
        {
          header: 'S.No.',
          accessorKey: 'index',
        },
        {
          header: 'Gender wise',
          accessorKey: 'entryName',
          meta: {
            width: '60px',
          },
        },
        {
          header: 'In Number',
          accessorKey: 'inNumber',
        },
        {
          header: 'In Percent',
          accessorFn: (row) => row?.inPercent,
        },
      ]}
    />
  );
};
