import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, Grid, GridItem, Text } from '@myra-ui';

import {
  FormBranchSelect,
  FormCheckbox,
  FormCOALedgerSelect,
  FormLeafCoaHeadSelect,
} from '@coop/shared/form';

import { ReportDateRange } from '../components';

export const DailyBalanceReportInputs = () => {
  const { watch, setValue } = useFormContext();

  const branchId = watch('branchId');

  const coaHead = watch('coaHead');

  const allLedgers = watch('allLedgers');

  const { selectedBranch, selectedCOAHead } = useMemo(
    () => ({
      selectedBranch: branchId?.map((branch: { value: string }) => branch?.value),
      selectedCOAHead: coaHead?.map((head: { value: string }) => head?.value),
    }),
    [branchId, coaHead]
  );

  return (
    <GridItem colSpan={4}>
      <Grid templateColumns={allLedgers ? 'repeat(4, 1fr)' : 'repeat(5, 1fr)'} gap="s16">
        <FormBranchSelect
          showUserBranchesOnly
          isMulti
          name="branchId"
          label="Service Center"
          onChangeAction={() => setValue('ledgerId', [])}
        />

        <FormLeafCoaHeadSelect
          name="coaHead"
          label="COA Head"
          isMulti
          onChangeAction={() => setValue('ledgerId', [])}
        />

        <Box display="flex" flexDirection="column" gap="s4">
          <Text variant="formLabel">All Ledgers</Text>
          <Box display="flex" alignItems="center" height="100%">
            <FormCheckbox name="allLedgers" />
          </Box>
        </Box>

        {!allLedgers && (
          <FormCOALedgerSelect
            name="ledgerId"
            label="Ledger"
            branchId={selectedBranch}
            coaHead={selectedCOAHead}
            isMulti
          />
        )}

        <ReportDateRange />
      </Grid>
    </GridItem>
  );
};
