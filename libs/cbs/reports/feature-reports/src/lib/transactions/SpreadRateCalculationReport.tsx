import { useMemo, useState } from 'react';

import { Box, Column, Divider, GridItem, Table, Text } from '@myra-ui';

import {
  LocalizedDateFilter,
  SpreadRateReportInput,
  useGetSpreadRateReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormBranchSelect } from '@coop/shared/form';
import { amountConverter, decimalAdjust } from '@coop/shared/utils';

type Filter = {
  branchId: {
    label: string;
    value: string;
  }[];
  period: LocalizedDateFilter;
};

type CombinedArrayType = {
  index: number;
  loanProductId: string;
  loanProductName: string;
  loanAverageBalance: string;
  loanInterestRate: string;
  loanWeight: string;
  loanEffectiveRate: string;
  savingProductId: string;
  savingProductName: string;
  savingAverageBalance: string;
  savingInterestRate: string;
  savingWeight: string;
  savingEffectiveRate: string;
};

export const SpreadRateCalculationReport = () => {
  const [filters, setFilters] = useState<Filter | null>(null);

  const { data, isFetching } = useGetSpreadRateReportQuery(
    {
      data: {
        ...filters,
        branchId: filters?.branchId?.map((item) => item?.value),
      } as SpreadRateReportInput,
    },
    { enabled: !!filters }
  );

  const spreadRateReportData = data?.report?.depositReport?.spreadRateReport;

  // const reportData = combineArrays(
  //   spreadRateReportData?.savingData?.record as SpreadRateRowData[],
  //   spreadRateReportData?.loanData?.record as SpreadRateRowData[]
  // );

  const savingData =
    spreadRateReportData?.savingData?.record?.map((r) => ({
      savingProductId: r?.productId,
      savingProductName: r?.productName,
      savingAverageBalance: r?.averageBalance,
      savingInterestRate: r?.interestRate,
      savingWeight: r?.weight,
      savingEffectiveRate: r?.effectiveRate,
    })) ?? [];

  const loanData =
    spreadRateReportData?.loanData?.record?.map((r) => ({
      loanProductId: r?.productId,
      loanProductName: r?.productName,
      loanAverageBalance: r?.averageBalance,
      loanInterestRate: r?.interestRate,
      loanWeight: r?.weight,
      loanEffectiveRate: r?.effectiveRate,
    })) ?? [];

  const spreadRateData = [
    {
      loanAvg: spreadRateReportData?.loanData?.meta?.totalEffectiveRate,
      SavingAvg: spreadRateReportData?.savingData?.meta?.totalEffectiveRate,
      SpreadRate: spreadRateReportData?.spreadRate,
    },
  ];

  const spreadRateColumn = useMemo<Column<typeof spreadRateData[0]>[]>(
    () => [
      {
        header: 'Loan Avg (%)',
        accessorFn: (row) => decimalAdjust('round', Number(row?.loanAvg), -2),
      },
      {
        header: 'Saving Avg (%)',
        accessorFn: (row) => decimalAdjust('round', Number(row?.SavingAvg), -2),
      },
      {
        header: 'Spread Rate (%)',
        accessorFn: (row) => row?.SpreadRate,
      },
    ],
    []
  );

  return (
    <Report
      defaultFilters={{}}
      data={[] as CombinedArrayType[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.TRANSACTION_MRTRANSACTION_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            {
              label: 'Transaction Reports',
              link: '/cbs/reports/cbs-reports/transactions',
            },
            {
              label: 'Spread Rate Calculation Report',
              link: '/cbs/reports/cbs-reports/transactions/spread-rate-calcualtion/new',
            },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={2}>
            <FormBranchSelect showUserBranchesOnly isMulti name="branchId" label="Service Center" />
          </GridItem>
          <GridItem colSpan={2}>
            <ReportDateRange />
          </GridItem>{' '}
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Text px="s16" mt="s16" fontSize="r2" color="gray.800" fontWeight={500}>
            Saving Product
          </Text>
          <Report.Table<CombinedArrayType>
            showFooter
            columns={[
              {
                header: 'S.N',
                accessorKey: 'index',
                footer: 'Total',
                meta: {
                  Footer: {
                    colspan: 1,
                  },
                  width: '2%',
                },
              },

              {
                header: 'Product Name',
                accessorKey: 'savingProductName',
              },
              {
                header: 'Amount',
                accessorKey: 'savingAverageBalance',
                accessorFn: (row) => amountConverter(row?.savingAverageBalance),
              },
              {
                header: 'Weight',
                accessorKey: 'savingWeight',
              },
              {
                header: 'Interest Rate (%)',
                accessorKey: 'savingInterestRate',
                accessorFn: (row) => decimalAdjust('round', Number(row?.savingInterestRate), -2),
              },
              {
                header: 'Avg. Rate (%)',
                accessorKey: 'savingEffectiveRate',
                footer: () =>
                  decimalAdjust(
                    'round',
                    Number(spreadRateReportData?.savingData?.meta?.totalEffectiveRate),
                    -2
                  ),
                meta: {
                  Footer: {
                    colspan: 1,
                  },
                  width: '15%',
                },
              },
            ]}
            data={savingData as CombinedArrayType[]}
            hasSNo
          />
          <Divider my="s16" />
          <Text px="s16" mt="s16" fontSize="r2" color="gray.800" fontWeight={500}>
            Loan Product
          </Text>
          <Report.Table<CombinedArrayType>
            showFooter
            columns={[
              {
                header: 'S.N',
                accessorKey: 'index',
                footer: 'Total',
                meta: {
                  Footer: {
                    colspan: 1,
                  },
                  width: '2%',
                },
              },

              {
                header: 'Product Name',
                accessorKey: 'loanProductName',
              },
              {
                header: 'Amount',
                accessorKey: 'savingAverageBalance',
                accessorFn: (row) => amountConverter(row?.loanAverageBalance),
              },
              {
                header: 'Weight',
                accessorKey: 'loanWeight',
              },
              {
                header: 'Interest Rate (%)',
                accessorKey: 'loanInterestRate',
                accessorFn: (row) => decimalAdjust('round', Number(row?.loanInterestRate), -2),
              },
              {
                header: 'Avg. Rate (%)',
                accessorKey: 'loanEffectiveRate',
                footer: () =>
                  decimalAdjust(
                    'round',
                    Number(spreadRateReportData?.loanData?.meta?.totalEffectiveRate),
                    -2
                  ),
                meta: {
                  Footer: {
                    colspan: 1,
                  },
                  width: '15%',
                },
              },
            ]}
            data={loanData as CombinedArrayType[]}
            hasSNo
          />
          <Divider my="s16" />
          <Text px="s16" mt="s16" fontSize="r2" color="gray.800" fontWeight={500}>
            Spread Rate
          </Text>
          <Box p="s16">
            <Table
              data={spreadRateData}
              columns={spreadRateColumn}
              variant="report"
              size="report"
              isStatic
            />
          </Box>
        </Report.Content>
      </Report.Body>
    </Report>
  );
};

// Function to combine the arrays
// function combineArrays(
//   savingProductArray: SpreadRateRowData[],
//   loanProductArray: SpreadRateRowData[]
// ): CombinedArrayType[] {
//   const combinedArray: CombinedArrayType[] = [];
//   const maxLength = Math.max(savingProductArray?.length || 0, loanProductArray?.length || 0);

//   // Convert null arrays to empty arrays
//   const safeArray1 = savingProductArray || [];
//   const safeArray2 = loanProductArray || [];

//   // Add "-" as value to missing keys in the objects to make them have the same keys
//   // eslint-disable-next-line no-plusplus
//   for (let i = 0; i < maxLength; i++) {
//     if (!savingProductArray || !savingProductArray[i])
//       safeArray1[i] = {
//         productId: null,
//         productName: null,
//         averageBalance: null,
//         interestRate: null,
//         weight: null,
//         effectiveRate: null,
//       };
//     if (!loanProductArray || !loanProductArray[i])
//       safeArray2[i] = {
//         productId: null,
//         productName: null,
//         averageBalance: null,
//         interestRate: null,
//         weight: null,
//         effectiveRate: null,
//       };
//   }
//   // Iterate through the modified arrays and combine the objects
//   // eslint-disable-next-line no-plusplus
//   for (let i = 0; i < maxLength; i++) {
//     const mergedObject = {
//       savingProductId: safeArray1[i]?.productId,
//       savingProductName: safeArray1[i]?.productName,
//       savingAverageBalance: safeArray1[i]?.averageBalance,
//       savingInterestRate: safeArray1[i]?.interestRate,
//       savingWeight: safeArray1[i]?.weight,
//       savingEffectiveRate: safeArray1[i]?.effectiveRate,
//       loanProductId: safeArray2[i]?.productId,
//       loanProductName: safeArray2[i]?.productName,
//       loanAverageBalance: safeArray2[i]?.averageBalance,
//       loanInterestRate: safeArray2[i]?.interestRate,
//       loanWeight: safeArray2[i]?.weight,
//       loanEffectiveRate: safeArray2[i]?.effectiveRate,
//     };
//     combinedArray.push(mergedObject as CombinedArrayType);
//   }

//   return combinedArray;
// }
