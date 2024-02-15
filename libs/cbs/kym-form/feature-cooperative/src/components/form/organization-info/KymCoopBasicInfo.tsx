import { FormSection } from '@myra-ui';

import { FormDatePicker, FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const KymCoopBasicInfo = () => {
  const { t } = useTranslation();
  return (
    <FormSection id="kymCoopAccBasicInformation" header="kymCoopBASICINFORMATION">
      <FormInput
        isRequired
        type="text"
        name="nameOfOrganization"
        label={t['kymCoopNameofOrganization']}
      />
      <FormInput name="regdNumber" label={t['kymCoopRegistrationNo']} isRequired />
      <FormInput name="vatNo" label={t['kymCoopPanVatNo']} isRequired />

      <FormInput isRequired type="text" name="regdOffice" label={t['kymCoopRegistrationoffice']} />
      <FormDatePicker name="regdDate" label={t['kymCoopRegistrationDate']} maxToday isRequired />
    </FormSection>
  );
};
