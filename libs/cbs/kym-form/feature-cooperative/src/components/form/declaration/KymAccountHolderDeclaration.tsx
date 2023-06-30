import { Box, FormSection, GridItem } from '@myra-ui';

import { FormFileInput, FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const KymAccountHolderDeclaration = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <FormSection id="kymCoopAccAccountHolderDeclaration" header="kymCoopAccountHolderDeclaration">
        <FormInput
          isRequired
          type="text"
          name="accountHoldersName"
          label={t['kymCoopAccountHolderName']}
        />
      </FormSection>

      <Documents />
    </Box>
  );
};

const Documents = () => {
  const { t } = useTranslation();
  return (
    <FormSection header="kymCoopDOCUMENTDECLARATION" templateColumns={2}>
      <GridItem w="124px">
        <FormFileInput label={t['kymCoopSignature']} name="documents.8.identifiers" />
      </GridItem>
      <GridItem w="124px">
        <FormFileInput size="md" label={t['kymCoopStamp']} name="documents.9.identifiers" />
      </GridItem>
    </FormSection>
  );
};
