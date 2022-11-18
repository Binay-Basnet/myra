import { CloseButton } from '@chakra-ui/react';

import { FormInput } from '@coop/shared/form';
import { Box, IconButton } from '@coop/shared/ui';

export const AddCollateral = () => (
  <Box display="flex" flexDirection="column">
    <Box p="s20" display="flex" borderRadius="br2" flexDirection="column" bg="background.500">
      <Box display="flex" justifyContent="flex-end">
        <IconButton
          aria-label="close"
          variant="ghost"
          size="sm"
          icon={<CloseButton />}
          // onClick={() => {
          //   removeMainOccupation(occupationId);
          // }}
        />
      </Box>
      <Box display="flex" gap="16px" flexDirection="column">
        <Box display="flex" flexDirection="column">
          <Box display="flex" p="s16" gap="s16">
            <FormInput type="text" name="fullName" label="Type of Collateral" />
            <FormInput
              type="number"
              textAlign="right"
              name="designationEn"
              label="Valuation Amount"
            />
            <FormInput type="text" name="designationEn" label="Collateral Details" />
          </Box>
        </Box>
      </Box>
    </Box>
  </Box>
);
