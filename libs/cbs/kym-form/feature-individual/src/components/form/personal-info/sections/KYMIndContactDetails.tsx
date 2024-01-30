import { FormSection } from '@myra-ui';

import { FormEmailInput, FormPhoneNumber } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { KYMSection } from '../../../../../../ui-form-elements/src/constants/KYMSection';

export const KYMIndContactDetails = () => {
  const { t } = useTranslation();

  return (
    <FormSection id={KYMSection.INDIVIDUAL_CONTACT_DETAILS} header="kymIndContactDetails">
      <FormPhoneNumber isRequired name="mobileNumber" label={t['kymIndMobileNo']} />
      <FormPhoneNumber isRequired name="phoneNumber" label={t['kymIndPhoneNo']} />
      <FormEmailInput isRequired type="text" name="email" label={t['kymIndEmail']} />
    </FormSection>
  );
};
