import { Box, Text } from '@myra-ui';

import { FormCheckbox } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const KYMDeclarationAgree = () => {
  const { t } = useTranslation();
  return (
    <Box p="s20" display="flex" gap="s16" alignItems="center">
      <FormCheckbox isRequired name="declarationAgreement" fontSize="s3" />
      <Text variant="formInput" mt="-6px">
        {t['kymIndAgree']}&nbsp;
        <Text as="span" variant="link">
          {t['kymIndAgreeLink']}
        </Text>
      </Text>
    </Box>
  );
};
