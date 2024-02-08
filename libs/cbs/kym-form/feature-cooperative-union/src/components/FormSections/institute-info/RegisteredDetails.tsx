import { FormSection, GridItem } from '@myra-ui';

import { FormAddress, FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const RegisteredDetails = () => {
  const { t } = useTranslation();

  // const methods = useForm<CoopUnionInstitutionInformationInput>();

  // useCoopUnionInstitution({ methods });

  return (
    <FormSection id="kymCoopUnionAccRegisteredDetails" header="kymCoopUnionRegisteredDetails">
      <FormInput type="number" name="regdNo" label={t['kymCoopUnionRegisteredNumber']} />
      <GridItem colSpan={2}>
        <FormInput
          isRequired
          type="text"
          name="issuingOffice"
          label={t['kymCoopUnionIssuingOffice']}
        />
      </GridItem>

      <FormAddress name="regdAddress" isRequired />
    </FormSection>
  );
};
