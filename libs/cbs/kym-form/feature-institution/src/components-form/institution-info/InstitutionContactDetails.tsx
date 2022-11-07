import { FormProvider, useForm } from 'react-hook-form';

import { KymInsInput } from '@coop/cbs/data-access';
import { FormDatePicker, FormEmailInput, FormInput, FormPhoneNumber } from '@coop/shared/form';
import { FormSection } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

import { useInstitution } from '../hooks/useInstitution';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const ContactDetailsInstitution = (props: IProps) => {
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
        <FormSection id="kymInsContactDetails" header="kymInsContactDetails">
          <FormPhoneNumber name="phone" label={t['kymInsPhone']} />
          <FormInput type="number" name="fax" label={t['kymInsFax']} />
          <FormEmailInput name="email" label={t['kymInsEmail']} />
          <FormInput type="text" name="website" label={t['kymInsWebsiteLinkany']} />
          <FormInput type="number" name="postBoxNo" label={t['kymInsPostBoxNo']} />
          <FormInput type="number" name="numberOfEmployee" label={t['kymInsNumberofEmployees']} />
          <FormDatePicker name="dateOfLastAGM" label={t['kymInsAGMDetailsDate']} maxToday />
        </FormSection>
      </form>
    </FormProvider>
  );
};
