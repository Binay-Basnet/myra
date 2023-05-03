import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, GridItem, Text } from '@myra-ui';

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

    return { crSelfTotal: Number(tempCR?.toFixed(2)), drSelfTotal: Number(tempDR.toFixed(2)) };
  }, [selfEntries]);

  const totalDr = Number((drSelfTotal + drBranchTotal).toFixed(2));
  const totalCr = Number((crSelfTotal + crBranchTotal).toFixed(2));
  const diff = Number((totalDr - totalCr).toFixed(2));

  return (
    <GridItem colSpan={3}>
      <Box
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
  );
};
