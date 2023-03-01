import { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { GridItem } from '@myra-ui';

import { CharKhataReportFilter, CoaHead, useGetCoaFullViewQuery } from '@coop/cbs/data-access';
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
const sortCoa = (data: { label: string; value: string; slug: string }[]) =>
  data?.sort((a, b) =>
    Number(
      a?.value?.localeCompare(b?.value as string, undefined, {
        numeric: true,
        sensitivity: 'base',
      })
    )
  );

function combineArrays(
  arrays: { label: string; value: string; slug: string }[][] | undefined | null,
  values: string[]
): { label: string; value: string; slug: string }[] {
  const combinedArray: { label: string; value: string; slug: string }[] = [];
  let sortedArray: { label: string; value: string; slug: string }[] = [];

  if (arrays) {
    arrays.forEach((array) => {
      array.forEach((obj) => {
        if (values.includes(obj.slug)) {
          combinedArray.push(obj);
          sortedArray = sortCoa(combinedArray);
        }
      });
    });

    return sortedArray;
  }
  return [];
}

const coaTypeEnum = [
  { label: 'Equity and Liabilities', value: 'EQUITY_AND_LIABILITIES' },
  { label: 'Assets', value: 'ASSETS' },
  { label: 'Expenses', value: 'EXPENDITURE' },
  { label: 'Income', value: 'INCOME' },
  { label: 'Off Balance Sheet', value: 'OFF_BALANCE_SHEET' },
];
export const CharkhataReportInputs = () => {
  const methods = useFormContext<TrialSheetReportFiltersCharkhata>();

  const { data: fullView, isFetching } = useGetCoaFullViewQuery();
  const coaFullList = fullView?.settings?.chartsOfAccount?.fullView?.data;

  const coaViews: { label: string; value: string; slug: string }[][] | null | undefined = useMemo(
    () =>
      coaFullList &&
      coaFullList?.map((coaCLass) =>
        // if (coaCLass?.id?.length) {
        //   let numDots = 0;
        //   for (let i = 0; i < coaCLass?.id?.length; i += 1) {
        //     if (coaCLass?.id[i] === '.') {
        //       numDots += 1;
        //     }
        //   }
        //   const spaces = '-'.repeat(numDots);

        //   return [
        //     {
        //       label: `${spaces}${coaCLass?.id}-${coaCLass?.name?.local}`,
        //       value: coaCLass?.id as string,
        //       slug: coaCLass?.accountClass as string,
        //     },
        //   ];
        // }
        [
          {
            label: `${coaCLass?.id}-${coaCLass?.name?.local}`,
            value: coaCLass?.id as string,
            slug: coaCLass?.accountClass as string,
          },
        ]
      ),

    [isFetching]
  );
  const [combinedArray, setCombinedArray] = useState<ArrayObject[]>([]);
  const [selectedHeads, setSelectedHeads] = useState<string[]>([]);

  const { watch } = methods;
  const coaTypeSelected = watch('coaType');

  useEffect(() => {
    setSelectedHeads(
      coaTypeSelected && coaTypeSelected.length !== 0 ? coaTypeSelected?.map((t) => t.value) : []
    );
  }, [coaTypeSelected]);

  useEffect(() => {
    setCombinedArray(combineArrays(coaViews, selectedHeads));
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
