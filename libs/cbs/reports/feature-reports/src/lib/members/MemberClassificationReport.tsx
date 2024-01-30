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
import { useTranslation } from '@coop/shared/utils';

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

export const MemberClassificationReport = () => {
  const { t } = useTranslation();

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
  // const genderWiseReport = memberData?.gender;

  const options = [
    {
      label: t['reportsMemberMemberClassificationReportClassifyByGenderWise'],
      value: 'gender',
    },
    { label: t['reportsMemberMemberClassificationReportClassifyByAgeWise'], value: 'age' },
    {
      label: t['reportsMemberMemberClassificationReportClassifyByOccupationWise'],
      value: 'occupation',
    },
    {
      label: t['reportsMemberMemberClassificationReportClassifyByEducationLevelWise'],
      value: 'education',
    },
    {
      label: t['reportsMemberMemberClassificationReportClassifyByIncomeLevelWise'],
      value: 'income',
    },
    {
      label: t['reportsMemberMemberClassificationReportClassifyByProvinceWise'],
      value: 'province',
    },
    {
      label: t['reportsMemberMemberClassificationReportClassifyByDistrictWise'],
      value: 'district',
    },
    {
      label: t['reportsMemberMemberClassificationReportClassifyByMemberCategoryWise'],
      value: 'memberCategory',
    },
  ];

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
            { label: 'Members Reports', link: '/cbs/reports/cbs-reports/members' },
            {
              label: 'Member Classification Report',
              link: '/cbs/reports/cbs-reports/members/classification/new',
            },
          ]}
        />

        <Report.Inputs>
          <GridItem colSpan={1}>
            <FormSelect
              name="classifyBy"
              label={t['reportsMemberMemberClassificationReportClassifyBy']}
              isMulti
              options={options}
            />
          </GridItem>

          <GridItem colSpan={1}>
            <FormBranchSelect showUserBranchesOnly name="branch" label="Select Branch" />
          </GridItem>

          <GridItem colSpan={2}>
            <ReportDateRange label={t['reportsMemberMemberClassificationReportDatePeriod']} />
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
  const { t } = useTranslation();

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
          header: t['sn'],
          accessorKey: 'index',
          footer: () => (
            <Box textAlign="right">{t['reportsMemberMemberClassificationReportTotalMember']}</Box>
          ),
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
          header: t['reportsMemberMemberClassificationReportInNumber'],
          accessorKey: 'inNumber',
          footer: String(newData?.reduce((acc, curr) => acc + (curr.inNumber || 0), 0)),
          meta: {
            isNumeric: true,
          },
        },
        {
          header: t['reportsMemberMemberClassificationReportInPercent'],
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
