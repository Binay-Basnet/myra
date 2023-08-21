import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { CharKhataReportFilter, CoaAccountClass, CoaHead } from '@coop/cbs/data-access';
import { FormBranchSelect, FormLeafCoaHeadSelect, FormSelect } from '@coop/shared/form';

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

const coaTypeEnum = [
  { label: 'Equity and Liabilities', value: CoaAccountClass.EquityAndLiabilities },
  { label: 'Assets', value: CoaAccountClass.Assets },
  { label: 'Expenses', value: CoaAccountClass.Expenditure },
  { label: 'Income', value: CoaAccountClass.Income },
  { label: 'Off Balance Sheet', value: CoaAccountClass.OffBalanceSheet },
];
export const CharkhataReportInputs = () => {
  const methods = useFormContext<TrialSheetReportFiltersCharkhata>();

  const { watch, setValue } = methods;
  const coaTypeSelected = watch('coaType');

  const selectedCoaClasses = useMemo(
    () => coaTypeSelected?.map((t) => t.value) ?? [],
    [coaTypeSelected]
  );

  return (
    <>
      <FormBranchSelect isMulti name="branchId" label="Service Center" />

      <FormSelect
        isMulti
        name="coaType"
        label="COA Types"
        options={coaTypeEnum}
        onChangeAction={() => setValue('coaHead', [])}
      />

      <FormLeafCoaHeadSelect
        name="coaHead"
        label="COA Head"
        isMulti
        coaClass={selectedCoaClasses as CoaAccountClass[]}
      />

      <ReportDateRange />
    </>
  );
};
