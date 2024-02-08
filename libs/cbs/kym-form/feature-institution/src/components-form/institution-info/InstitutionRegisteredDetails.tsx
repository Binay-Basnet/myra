import { FormSection, GridItem } from '@myra-ui';

import { FormAddress, FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const RegisteredDetailsInstitution = () => {
  const { t } = useTranslation();

  return (
    <FormSection id="kymInsRegisteredDetails" header="kymInsRegisteredDetails">
      <FormInput
        isRequired
        id="registeredDetailsInstitution"
        name="registeredNumber"
        label={t['kymInsRegisteredNumber']}
      />
      <GridItem colSpan={2}>
        <FormInput
          isRequired
          id="registeredDetailsInstitution"
          type="text"
          name="issuingOffice"
          label={t['kymInsIssuingOffice']}
        />
      </GridItem>
      <FormAddress name="registeredAddress" isRequired />
    </FormSection>
  );
};
