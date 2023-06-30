import { FormSection } from '@myra-ui';

import { FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const KymCoopContactDetails = () => {
  const { t } = useTranslation();

  return (
    <FormSection id="kymCoopAccContactDetails" header="kymCoopContactDetails">
      <FormInput type="text" name="email" label={t['kymCoopOfficialEmail']} />
      <FormInput type="text" name="website" label={t['kymCoopWebsiteLink']} />

      <FormInput isRequired type="text" name="contactNumber" label={t['kymCoopPhoneno']} />
    </FormSection>
  );
};
