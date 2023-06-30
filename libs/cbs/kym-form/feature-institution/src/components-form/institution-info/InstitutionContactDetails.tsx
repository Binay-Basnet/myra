import { FormSection } from '@myra-ui';

import { FormDatePicker, FormEmailInput, FormInput, FormPhoneNumber } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const ContactDetailsInstitution = () => {
  const { t } = useTranslation();

  return (
    <FormSection id="kymInsContactDetails" header="kymInsContactDetails">
      <FormPhoneNumber isRequired name="phone" label={t['kymInsPhone']} />
      <FormInput type="number" name="fax" label={t['kymInsFax']} />
      <FormEmailInput isRequired name="email" label={t['kymInsEmail']} />
      <FormInput type="text" name="website" label={t['kymInsWebsiteLinkany']} />
      <FormInput type="number" name="postBoxNo" label={t['kymInsPostBoxNo']} />
      <FormInput type="number" name="numberOfEmployee" label={t['kymInsNumberofEmployees']} />
      <FormDatePicker name="dateOfLastAGM" label={t['kymInsAGMDetailsDate']} maxToday />
    </FormSection>
  );
};
