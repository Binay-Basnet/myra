import { Box, Text } from '@myra-ui';

import { FormCheckbox } from '@coop/shared/form';

export const KYMDeclarationAgree = () => (
  <Box p="s20" display="flex" gap="s16" alignItems="center">
    <FormCheckbox isRequired name="declarationAgreement" fontSize="s3" />
    <Text variant="formInput" mt="-6px">
      I/We agree to the&nbsp;
      <Text as="span" variant="link">
        Terms and condition.
      </Text>
    </Text>
  </Box>
);
