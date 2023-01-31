import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, GridItem } from '@myra-ui';

import {
  GetMemberClassificationReportQuery,
  MemberClassificationFilter,
  ReportEntry,
  useGetMemberClassificationReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormBranchSelect, FormSelect } from '@coop/shared/form';

// type ClassifyBy =
//   | 'All'
//   | 'Gender Wise'
//   | 'Age Wise'
//   | 'Occupation Wise'
//   | 'Education Level Wise'
//   | 'Income Level Wise'
//   | 'Address Wise'
//   | 'Member Category Wise';

// const ClassifyAll = [
//   'Gender Wise',
//   'Age Wise',
//   'Occupation Wise',
//   'Member Category Wise',
//   'Education Level Wise',
//   'Income Level Wise',
// ];

// const classificationKeys = {
//   'Gender Wise': 'gender',
//   'Age Wise': 'age',
//   'Occupation Wise': 'occupation',
//   'Member Category Wise': 'memberCategory',
//   'Education Level Wise': 'education',
//   'Income Level Wise': 'income',
// };

// type MemberClassificationFilter = {
//   classificationBy: ClassifyBy[];
//   period: LocalizedDateFilter;
// };

const options = [
  {
    label: 'Gender Wise',
    value: 'gender',
  },
  { label: 'Age Wise', value: 'age' },
  { label: 'Occupation Wise', value: 'occupation' },
  { label: 'Education Level Wise', value: 'education' },
  { label: 'Income Level Wise', value: 'income' },
  { label: 'Province Wise', value: 'province' },
  { label: 'District Wise', value: 'district' },
  { label: 'Member Category Wise', value: 'memberCategory' },
];

export const MemberClassificationReport = () => {
  const [filters, setFilters] = useState<MemberClassificationFilter | null>(null);

  const { data, isFetching } = useGetMemberClassificationReportQuery(
    {
      data: {
        period: filters?.period,
        branch: filters?.branch,
      } as MemberClassificationFilter,
    },
    { enabled: !!filters }
  );
  const memberData = data?.report?.memberReport?.memberClassificationReport?.data;
  const genderWiseReport = memberData?.gender;

  return (
    <Report
      defaultFilters={{}}
      data={
        (memberData?.gender ||
          memberData?.age ||
          memberData?.memberCategory ||
          memberData?.income ||
          memberData?.address ||
          memberData?.education ||
          memberData?.occupation) as ReportEntry[]
      }
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
          <GridItem colSpan={1}>
            <FormSelect name="classifyBy" label="Classify By" isMulti options={options} />
          </GridItem>

          <GridItem colSpan={1}>
            <FormBranchSelect name="branch" label="Select Branch" />
          </GridItem>

          <GridItem colSpan={2}>
            <ReportDateRange label="Date Period" />
          </GridItem>
        </Report.Inputs>
      </Report.Header>
      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />

          <MemberClassificationTables data={data} />
        </Report.Content>
      </Report.Body>
    </Report>
  );
};

interface IMemberClassificationTableProps {
  data: GetMemberClassificationReportQuery | undefined;
}

const MemberClassificationTables = ({ data }: IMemberClassificationTableProps) => {
  const memberData = data?.report?.memberReport?.memberClassificationReport?.data;

  const gender = memberData?.gender || [];
  const age = memberData?.age || [] || [];
  const occupation = memberData?.occupation || [];
  const education = memberData?.education || [];
  const income = memberData?.income || [];
  const memberCategory = memberData?.memberCategory || [];
  const province = memberData?.address?.province || [];
  const district = memberData?.address?.district || [];

  const report = {
    gender,
    age,
    occupation,
    education,
    income,
    memberCategory,
    province,
    district,
  };

  const { watch } = useFormContext();
  const classifyBy = watch('classifyBy') as { label: string; value: string }[];

  return (
    <Box>
      {classifyBy?.map((classify) => (
        <MemberTable data={report[classify.value as keyof typeof report]} header={classify.label} />
      ))}
    </Box>
  );
};

interface IMemberTableProps {
  data: ({
    entryName?: string | null | undefined;
    inNumber?: number | null | undefined;
    inPercent?: string | null | undefined;
  } | null)[];
  header: string;
}

export const MemberTable = ({ data, header }: IMemberTableProps) => {
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
          footer: () => <Box textAlign="right"> Total Member</Box>,
          meta: {
            Footer: {
              colspan: 2,
            },
          },
        },
        {
          header: () => header,
          accessorKey: 'entryName',
          meta: {
            width: '80%',
            Footer: {
              display: 'none',
            },
          },
        },
        {
          header: 'In Number',
          accessorKey: 'inNumber',
          footer: String(newData?.reduce((acc, curr) => acc + (curr.inNumber || 0), 0)),
          meta: {
            isNumeric: true,
          },
        },
        {
          header: 'In Percent',
          accessorFn: (row) => row?.inPercent,
          footer: '100',
          meta: {
            isNumeric: true,
          },
        },
      ]}
      tableTitle={header}
    />
  );
};
