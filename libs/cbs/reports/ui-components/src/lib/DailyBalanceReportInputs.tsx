import { useFormContext } from 'react-hook-form';

import { Grid, GridItem } from '@myra-ui';

import { FormBranchSelect, FormLeafCoaHeadSelect } from '@coop/shared/form';

import { ReportDateRange } from '../components';

export const DailyBalanceReportInputs = () => {
  const { watch, setValue } = useFormContext();

  const allLedgers = watch('allLedgers');

  return (
    <GridItem colSpan={4}>
      <Grid templateColumns={allLedgers ? 'repeat(4, 1fr)' : 'repeat(5, 1fr)'} gap="s16">
        <FormBranchSelect
          showUserBranchesOnly
          isMulti
          name="branchId"
          label="Service Center"
          onChangeAction={() => setValue('filter.ledgerId', [])}
        />

        <FormLeafCoaHeadSelect
          name="coaHead"
          label="COA Head"
          isMulti
          onChangeAction={() => setValue('filter.ledgerId', [])}
        />

        <ReportDateRange />
      </Grid>
    </GridItem>
  );
};
