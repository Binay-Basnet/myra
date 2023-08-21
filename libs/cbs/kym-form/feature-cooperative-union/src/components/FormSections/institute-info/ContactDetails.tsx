import { FormSection } from '@myra-ui';

import { FormDatePicker, FormEmailInput, FormInput, FormPhoneNumber } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const ContactDetails = () => {
  const { t } = useTranslation();

  // const methods = useForm<CoopUnionInstitutionInformationInput>();
  // useCoopUnionInstitution({ methods });

  return (
    <FormSection id="kymCoopUnionAccContactDetails" header="kymCoopUnionContactDetails">
      <FormPhoneNumber isRequired name="phone" label={t['kymCoopUnionPhone']} />

      <FormInput type="number" name="fax" label={t['kymCoopUnionFax']} />

      <FormEmailInput isRequired name="contactEmail" label={t['kymCoopUnionEmail']} />

      <FormInput type="text" name="website" label={t['kymCoopUnionWebsiteLinkAny']} />

      <FormInput type="number" name="postBoxNo" label={t['kymCoopUnionPostBoxNo']} />
      <FormInput type="number" name="noOfEmployee" label={t['kymCoopUnionNumberOfEmployees']} />
      <FormDatePicker name="lastAgmDate" label={t['kymCoopUnionAGMDetailsDate']} />
    </FormSection>
  );
};
