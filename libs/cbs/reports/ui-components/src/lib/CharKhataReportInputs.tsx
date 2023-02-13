import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { GridItem } from '@myra-ui';

import { CharKhataReportFilter, CoaHead } from '@coop/cbs/data-access';
import { FormBranchSelect, FormSelect } from '@coop/shared/form';

import { ReportDateRange } from '../components';

type TrialSheetReportFiltersCharkhata = Omit<
  CharKhataReportFilter,
  'filter' | 'branchId' | 'coaHead'
> & {
  branchId: { label: string; value: string }[];
  coaHead: { label: string; value: CoaHead }[];
  filter: {
    includeZero: 'include' | 'exclude';
  };
  coaType: { label: string; value: string }[];
};

interface ArrayObject {
  value: string;
  label: string;
}

function combineArrays(
  arrays: { label: string; value: string; slug: string }[][],
  values: string[]
): { label: string; value: string; slug: string }[] {
  const combinedArray: { label: string; value: string; slug: string }[] = [];

  arrays.forEach((array) => {
    array.forEach((obj) => {
      if (values.includes(obj.slug)) {
        combinedArray.push(obj);
      }
    });
  });

  return combinedArray;
}

const coaHeadOptions: { label: string; value: string; slug: string }[][] = [
  [
    {
      label: 'Share Capital  10',
      value: CoaHead.TotalShareCapitalBalance_10 as string,
      slug: 'equityAndLiablitiesEnum',
    },
  ],
  [
    {
      label: 'Reserve and Surplus  20',
      value: CoaHead?.TotalReserveAndSurplusBalance_20 as string,
      slug: 'equityAndLiablitiesEnum',
    },
  ],
  [
    {
      label: 'Saving  30',
      value: CoaHead?.TotalSavingDepositBalance_30 as string,
      slug: 'equityAndLiablitiesEnum',
    },
  ],
  [
    {
      label: 'Loan Saving Account  40',
      value: CoaHead?.TotalLoanSavingAccountBalance_40 as string,
      slug: 'equityAndLiablitiesEnum',
    },
  ],
  [
    {
      label: 'Capital Grant  50',
      value: CoaHead?.TotalCapitalGrantBalance_50 as string,
      slug: 'equityAndLiablitiesEnum',
    },
  ],
  [
    {
      label: 'Current Liabilities and Payble  60',
      value: CoaHead?.TotalCurrentLiabilitiesAndPayableBalance_60 as string,
      slug: 'equityAndLiablitiesEnum',
    },
  ],
  [
    {
      label: 'Non Current Liabilities  70',
      value: CoaHead?.TotalNonCurrentLiabilitiesBalance_70 as string,
      slug: 'equityAndLiablitiesEnum',
    },
  ],
  [
    {
      label: 'Cash and Cash Equivalent  80',
      value: CoaHead?.TotalCashAndCashEquivalentBalance_80 as string,
      slug: 'assestsEnum',
    },
  ],
  [
    {
      label: 'Bank  90',
      value: CoaHead?.TotalBankBalance_90 as string,

      slug: 'assestsEnum',
    },
  ],
  [
    {
      label: 'Investment  100',
      value: CoaHead?.TotalInvestmentBalance_100 as string,

      slug: 'assestsEnum',
    },
  ],
  [
    {
      label: 'Loan  110',
      value: CoaHead?.TotalLoanBalance_110 as string,

      slug: 'assestsEnum',
    },
  ],
  [
    {
      label: 'Other Assests  120',
      value: CoaHead?.TotalOtherCurrentAssetsBalance_120 as string,
      slug: 'assestsEnum',
    },
  ],
  [
    {
      label: 'Non Currrent Assets  130',
      value: CoaHead?.TotalNonCurrentAssetsBalance_130 as string,
      slug: 'assestsEnum',
    },
  ],
  [
    {
      label: 'Other Non Current Assests  140',
      value: CoaHead?.TotalOtherNonCurrentAssetsBalance_140 as string,
      slug: 'assestsEnum',
    },
  ],
  [
    {
      label: 'Expenses  150',
      value: CoaHead?.TotalExpensesBalance_150 as string,
      slug: 'expensesEnum',
    },
  ],
  [
    {
      label: 'Revinue  160',
      value: CoaHead?.TotalRevinueBalance_160 as string,
      slug: 'incomeEnum',
    },
  ],
  [
    {
      label: 'Off Balance Sheet  170',
      value: CoaHead?.TotalOffBalanceSheetBalance_170 as string,
      slug: 'offBalanceSheetEnum',
    },
  ],
];

export const CharkhataReportInputs = () => {
  const methods = useFormContext<TrialSheetReportFiltersCharkhata>();
  const [combinedArray, setCombinedArray] = useState<ArrayObject[]>([]);
  const [selectedHeads, setSelectedHeads] = useState<string[]>([]);

  const { watch } = methods;
  const coaTypeSelected = watch('coaType');

  const coaTypeEnum = [
    { label: 'Equity and Liabilities', value: 'equityAndLiablitiesEnum' },
    { label: 'Assets', value: 'assestsEnum' },
    { label: 'Expenses', value: 'expensesEnum' },
    { label: 'Income', value: 'incomeEnum' },
    { label: 'Off Balance Sheet', value: 'offBalanceSheetEnum' },
  ];

  useEffect(() => {
    setSelectedHeads(
      coaTypeSelected && coaTypeSelected.length !== 0 ? coaTypeSelected?.map((t) => t.value) : []
    );
  }, [coaTypeSelected]);

  useEffect(() => {
    setCombinedArray(combineArrays(coaHeadOptions, selectedHeads));
  }, [selectedHeads]);

  return (
    <>
      <GridItem colSpan={1}>
        <FormBranchSelect isMulti name="branchId" label="Service Center" />
      </GridItem>
      <GridItem colSpan={1}>
        <FormSelect isMulti name="coaType" label="COA Types" options={coaTypeEnum} />
      </GridItem>
      <GridItem colSpan={1}>
        <FormSelect isMulti name="coaHead" label="Coa Head" options={combinedArray} />
      </GridItem>
      <GridItem colSpan={1}>
        <ReportDateRange />
      </GridItem>{' '}
    </>
  );
};
