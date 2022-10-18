import { FormProvider, useForm } from 'react-hook-form';

import { KymIndMemberInput } from '@coop/cbs/data-access';
import { FormEmailInput, FormPhoneNumber } from '@coop/shared/form';
import { FormSection } from '@coop/shared/ui';
import { getKymSection, useTranslation } from '@coop/shared/utils';

import { useIndividual } from '../../hooks/useIndividual';

interface IMemberKYMContactDetailsProps {
  setKymCurrentSection: (section?: { section: string; subSection: string }) => void;
}

export const MemberKYMContactDetails = ({
  setKymCurrentSection,
}: IMemberKYMContactDetailsProps) => {
  const { t } = useTranslation();

  const methods = useForm<KymIndMemberInput>();
  useIndividual({ methods });

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSection(e.target.id);
          setKymCurrentSection(kymSection);
        }}
      >
        <FormSection id="kymAccIndContactDetails" header="kymIndCONTACTDETAILS">
          <FormPhoneNumber name="mobileNumber" label={t['kymIndMobileNo']} />
          <FormPhoneNumber name="phoneNumber" label={t['kymIndPhoneNo']} />
          <FormEmailInput type="text" name="email" label={t['kymIndEmail']} />
        </FormSection>
      </form>
    </FormProvider>
  );
};
