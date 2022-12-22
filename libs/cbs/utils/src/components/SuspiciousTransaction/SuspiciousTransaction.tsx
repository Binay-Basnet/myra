/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { useFormContext } from 'react-hook-form';

import { Box, Text } from '@myra-ui/foundations';

import { SuspiciousTransactionTopology } from '@coop/cbs/data-access';
import { FormCheckbox, FormCheckboxGroup, FormTextArea } from '@coop/shared/form';

const topologiesList = Object.values(SuspiciousTransactionTopology ?? {}).map((topology) => ({
  value: topology,
  label: topology?.replace(/_/gi, ' '),
}));

export const SuspiciousTransaction = () => {
  const { watch } = useFormContext();

  const isSuspicious = watch('isSuspicious');

  return (
    <>
      <FormCheckbox name="isSuspicious" label="Suspicious Transaction" />

      {isSuspicious && (
        <Box
          display="flex"
          flexDirection="column"
          gap="s16"
          p="s16"
          bg="highlight.500"
          borderRadius="br2"
        >
          <Text fontSize="r1" fontWeight={500} color="gray.600">
            Specify following Topologies
          </Text>

          <FormCheckboxGroup name="suspicionTopologies" list={topologiesList} orientation="grid" />

          <FormTextArea name="suspicionRemarks" label="Remarks" rows={3} />
        </Box>
      )}
    </>
  );
};
