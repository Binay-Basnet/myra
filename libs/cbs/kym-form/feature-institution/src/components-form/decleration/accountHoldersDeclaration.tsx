import { FormProvider, useForm } from 'react-hook-form';

import { Box, FormSection, Text } from '@myra-ui';

import { KymInsInput } from '@coop/cbs/data-access';
import { FormAddress, FormCheckbox, FormInput } from '@coop/shared/form';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

import { useInstitution } from '../hooks/useInstitution';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const AccountHolderDeclarationInstitution = (props: IProps) => {
  const { t } = useTranslation();

  const methods = useForm<KymInsInput>({
    defaultValues: {},
  });
  const { setSection } = props;

  useInstitution({ methods });

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionInstitution(e.target.id);
          setSection(kymSection);
        }}
      >
        <FormSection id="kymInsAccountHolderDeclaration" header="kymInAccountHolderDeclarations">
          <FormInput name="accountHolderName" label={t['kymInsAccountHolderName']} />
          <FormInput name="accountHolderPhone" label={t['kymInsPhone']} />
          <FormInput name="accountHolderEmail" label={t['kymInsEmail']} />
        </FormSection>

        <FormAddress
          name="accountHolderAddress"
          sectionHeader="kymInAccountHolderDeclarations"
          sectionId="kymInsAccountHolderDeclaration"
        />
        <Box p="s20" display="flex" gap="s16" alignItems="center">
          <FormCheckbox id="weAgree" name="declarationAgreement" fontSize="s3" />
          <Text variant="formInput" mt="-6px">
            I/We agree to the&nbsp;
            <Text as="span" variant="link">
              Terms and condition.
            </Text>
          </Text>
        </Box>
      </form>
    </FormProvider>
  );
};
