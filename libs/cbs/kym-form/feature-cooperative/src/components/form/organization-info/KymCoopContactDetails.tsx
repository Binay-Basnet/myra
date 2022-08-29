import { FormProvider, useForm } from 'react-hook-form';

import { KymCooperativeFormInput } from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
import { FormSection } from '@coop/shared/ui';
import { getKymCoopSection, useTranslation } from '@coop/shared/utils';

import { useCooperative } from '../../hooks/useCooperative';
interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const KymCoopContactDetails = (props: IProps) => {
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
        <FormSection
          gridLayout={true}
          id="kymCoopAccContactDetails"
          header="kymCoopContactDetails"
        >
          <FormInput
            type="text"
            name="email"
            label={t['kymCoopOfficialEmail']}
            __placeholder={t['kymCoopEnterEmailAddress']}
          />
          <FormInput
            type="text"
            name="website"
            label={t['kymCoopWebsiteLink']}
            __placeholder={t['kymCoopEnterWebsiteURL']}
          />

          <FormInput
            type="text"
            name="contactNumber"
            label={t['kymCoopPhoneno']}
            __placeholder={t['kymCoopEnterPhoneNumber']}
          />
        </FormSection>
      </form>
    </FormProvider>
  );
};
