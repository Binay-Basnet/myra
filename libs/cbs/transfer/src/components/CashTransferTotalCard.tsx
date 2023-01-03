import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, FormSection, GridItem, Text } from '@myra-ui';

import { CashTransferSelfEntry, CashTransferServiceCentreEntry } from '@coop/cbs/data-access';

export const CashTransferTotalCard = () => {
  const { watch } = useFormContext();

  const selfEntries = watch('selfEntries');
  const branchEntries = watch('branchEntries');

  const { crBranchTotal, drBranchTotal } = useMemo(() => {
    let tempCR = 0;
    let tempDR = 0;

    branchEntries?.forEach((entry: CashTransferServiceCentreEntry) => {
      tempCR += Number(entry?.cr ?? 0);
      tempDR += Number(entry?.dr ?? 0);
    });

    return { crBranchTotal: tempCR, drBranchTotal: tempDR };
  }, [branchEntries]);

  const { crSelfTotal, drSelfTotal } = useMemo(() => {
    let tempCR = 0;
    let tempDR = 0;

    selfEntries?.forEach((entry: CashTransferSelfEntry) => {
      tempCR += Number(entry?.cr ?? 0);
      tempDR += Number(entry?.dr ?? 0);
    });

    return { crSelfTotal: tempCR, drSelfTotal: tempDR };
  }, [selfEntries]);

  const totalDr = drSelfTotal + drBranchTotal;
  const totalCr = crSelfTotal + crBranchTotal;
  const diff = totalDr - totalCr;

  return (
    <FormSection>
      <GridItem colSpan={3}>
        <Box
          mt="s40"
          border="1px solid"
          borderColor="border.layout"
          borderRadius="br2"
          p="s16"
          gap="s20"
          display="flex"
          flexDirection="column"
        >
          <Box display="flex" justifyContent="space-between">
            <Text fontWeight="Medium" fontSize="r1" color="gray.700" lineHeight="17px">
              Total DR
            </Text>
            <Text fontWeight="Regular" fontSize="r1" color="gray.600" lineHeight="17px">
              {totalDr}
            </Text>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Text fontWeight="Medium" fontSize="r1" color="gray.700" lineHeight="17px">
              Total CR
            </Text>
            <Text fontWeight="Regular" fontSize="r1" color="gray.600" lineHeight="17px">
              {totalCr}
            </Text>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Text fontWeight="Medium" fontSize="r1" color="gray.700" lineHeight="17px">
              Difference
            </Text>
            <Text fontWeight="Regular" fontSize="r1" color="gray.600" lineHeight="17px">
              {Math.abs(diff)}
            </Text>
          </Box>
        </Box>
      </GridItem>
    </FormSection>
  );
};
