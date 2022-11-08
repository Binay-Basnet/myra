import { FormProvider, useForm } from 'react-hook-form';

import { KymCooperativeFormInput } from '@coop/cbs/data-access';
import { FormDatePicker, FormInput } from '@coop/shared/form';
import { FormSection } from '@coop/shared/ui';
import { getKymCoopSection, useTranslation } from '@coop/shared/utils';

import { useCooperative } from '../../hooks/useCooperative';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const KymCoopBasicInfo = (props: IProps) => {
  const { t } = useTranslation();
  const { setSection } = props;
  const methods = useForm<KymCooperativeFormInput>({
    defaultValues: {},
  });
  useCooperative({ methods });
  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymCoopSection(e.target.id);
          setSection(kymSection);
        }}
      >
        <FormSection id="kymCoopAccBasicInformation" header="kymCoopBASICINFORMATION">
          <FormInput type="text" name="nameOfOrganization" label={t['kymCoopNameofOrganization']} />
          <FormInput type="number" name="regdNumber" label={t['kymCoopRegisrationNo']} />

          <FormInput type="text" name="regdOffice" label={t['kymCoopRegistrationoffice']} />
          <FormDatePicker name="regdDate" label={t['kymCoopRegistrationDate']} maxToday />
        </FormSection>
      </form>
    </FormProvider>
  );
};
