import { Box, Checkbox, FormSection, Text } from '@myra-ui';

import { FormAddress, FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const AccountHolderDeclarationInstitution = () => {
  const { t } = useTranslation();

  return (
    <>
      <FormSection id="kymInsAccountHolderDeclaration" header="kymInAccountHolderDeclarations">
        <FormInput isRequired name="accountHolderName" label={t['kymInsAccountHolderName']} />
        <FormInput isRequired name="accountHolderPhone" label={t['kymInsPhone']} />
        <FormInput isRequired name="accountHolderEmail" label={t['kymInsEmail']} />
      </FormSection>

      <FormAddress
        name="accountHolderAddress"
        sectionHeader="kymInsAccountHolderAddress"
        sectionId="kymInsAccountHolderDeclaration"
      />
      <Box p="s20" display="flex" gap="s16" alignItems="center">
        <Checkbox id="weAgree" fontSize="s3" />
        <Text variant="formInput" mt="-6px">
          {t['kymIndAgree']}&nbsp;
          <Text as="span" variant="link">
            {t['kymIndAgreeLink']}
          </Text>
        </Text>
      </Box>
    </>
  );
};
