import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  MemberClassificationReportData,
  PeriodInput,
  ReportEntry,
  ReportPeriodType,
  useGetMemberClassificationReportQuery,
} from '@coop/cbs/data-access';
import {
  MemberClassificationInputs,
  ReportHeader,
  ReportOrganization,
  ReportOrganizationHeader,
} from '@coop/cbs/reports/components';
import { Report } from '@coop/cbs/reports/list';
import { Column, Table } from '@coop/shared/table';
import { Box, Divider, Loader } from '@coop/shared/ui';

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
  period: PeriodInput;
};

export const MemberClassificationReport = () => {
  const methods = useForm();
  const [hasShownFilter, setHasShownFilter] = useState(false);
  const [filter, setFilter] = useState<MemberClassificationFilter | null>(null);

  const { data: memberClassificationData, isLoading } = useGetMemberClassificationReportQuery(
    { data: { period: filter?.period } },
    { enabled: !!filter }
  );

  const memberClassification = memberClassificationData?.report?.memberClassificationReport
    ?.data as MemberClassificationReportData;

  return (
    <FormProvider {...methods}>
      <Box bg="white" minH="calc(100vh - 110px)" w="100%" display="flex" flexDir="column">
        <ReportHeader
          hasSave={false}
          paths={[
            { label: 'All Reports', link: '/reports/cbs/members' },
            { label: 'Member Reports', link: '/reports/cbs/members' },
            {
              label: 'New Report',
              link: '/reports/cbs/members/new',
            },
          ]}
        />

        <MemberClassificationInputs
          hasShownFilter={hasShownFilter}
          setFilter={setFilter}
          setHasShownFilter={setHasShownFilter}
        />

        <Box display="flex" minH="calc(100vh - 260.5px)" w="100%" overflowX="auto">
          <Box w="100%">
            {(() => {
              if (isLoading) {
                return (
                  <Box
                    h="200px"
                    w="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Loader />
                  </Box>
                );
              }

              if (memberClassification) {
                return (
                  <Box display="flex" flexDir="column" w="100%">
                    <ReportOrganizationHeader reportType={Report.MEMBER_CLASSIFICATION_REPORT} />
                    <ReportOrganization statementDate={ReportPeriodType.Lifetime} />
                    <Box px="s32" pb="s32">
                      <Divider />
                    </Box>

                    <Box px="s32" display="flex" flexDir="column" gap="s16">
                      {filter?.classificationBy.includes('All')
                        ? ClassifyAll.map((c) => (
                            <MemberClassificationTable
                              type={c}
                              data={
                                memberClassification[
                                  classificationKeys[
                                    c as keyof typeof classificationKeys
                                  ] as keyof MemberClassificationReportData
                                ] as ReportEntry[]
                              }
                            />
                          ))
                        : filter?.classificationBy.map((classifyBy) =>
                            classifyBy === 'Address Wise' ? null : (
                              <MemberClassificationTable
                                type={classifyBy}
                                data={memberClassification.gender as ReportEntry[]}
                              />
                            )
                          )}

                      {(filter?.classificationBy.includes('Address Wise') ||
                        filter?.classificationBy.includes('All')) && (
                        <>
                          <MemberClassificationTable
                            type="Province Wise"
                            data={memberClassification.address?.province as ReportEntry[]}
                          />
                          <MemberClassificationTable
                            type="District Wise"
                            data={memberClassification.address?.district as ReportEntry[]}
                          />
                        </>
                      )}
                    </Box>
                  </Box>
                );
              }

              return null;
            })()}
          </Box>
        </Box>
      </Box>
    </FormProvider>
  );
};

export const MemberClassificationTable = ({
  data,
  type,
}: {
  data: ReportEntry[] | undefined | null;
  type: string;
}) => {
  const columns = React.useMemo<Column<ReportEntry>[]>(
    () => [
      {
        header: `${type}`,
        accessorKey: 'entryName',
        footer: () => <Box textAlign="right">Total</Box>,
        meta: {
          width: '70%',
        },
      },
      {
        header: 'In Number',
        accessorKey: 'inNumber',
        cell: (props) => props.getValue() ?? 0,
        footer: () => (
          <Box textAlign="right">
            {data?.reduce((acc, curr) => acc + Number(curr?.inNumber ?? 0), 0)}
          </Box>
        ),

        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'In Percentage',
        cell: (props) => `${props.getValue()} %`,
        accessorKey: 'inPercent',
        footer: () => <Box textAlign="right">100 %</Box>,

        meta: {
          isNumeric: true,
        },
      },
    ],
    [type]
  );

  if (!data || data.length === 0) return null;

  return (
    <Table<ReportEntry>
      isStatic
      showFooter
      size="report"
      variant="report"
      columns={columns}
      data={data ?? []}
    />
  );
};
