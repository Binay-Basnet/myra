import { useMemo } from 'react';

import { Column, FormSection, GridItem, Table } from '@myra-ui';

import { FormDatePicker, FormInput, FormSelect } from '@coop/shared/form';

export const Deprecation = () => {
  const data = [{}];
  const columns = useMemo<Column<typeof data[0]>[]>(
    () => [
      { accessor: 'Year', header: 'Year' },
      { accessor: 'Date', header: 'Date' },

      { accessor: 'BeginningValue', header: 'Beginning Value' },

      { accessor: 'Year', header: 'Depreciation Expense' },
      { accessor: 'Year', header: 'Ending Value' },
    ],
    []
  );
  return (
    //   const { watch, setValue } = useFormContext();

    <FormSection
      header="Deprecation"
      subHeader="Depreciation is used to calculate the cost of your assets over their useful life. If you would like to track the depreciation of assets, select Yes"
      templateColumns={3}
      divider
    >
      <FormInput isRequired type="text" name="assetLife" label="Asset Life" />
      <FormInput isRequired type="text" name="salvageValue" label="Salvage Value" />
      <FormSelect
        isRequired
        name="depreciationMethod"
        label="Depreciation Method"
        options={[]}
        isLoading={false}
      />
      <FormDatePicker name="startDate" label="Start Date" />
      <FormDatePicker name="endDate" label="End Date" />
      <FormSelect
        isRequired
        name="accountingPeriod"
        label="Accounting Period"
        options={[]}
        isLoading={false}
      />
      <GridItem colSpan={3}>
        <Table isStatic allowSelection={false} variant="report" data={data} columns={columns} />
      </GridItem>
    </FormSection>
  );
};
