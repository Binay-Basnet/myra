import { FormProvider, useForm } from 'react-hook-form';

import { FormSection } from '@myra-ui';

import { KymIndMemberInput } from '@coop/cbs/data-access';
import { FormEmailInput, FormPhoneNumber } from '@coop/shared/form';
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
          <FormPhoneNumber isRequired name="mobileNumber" label={t['kymIndMobileNo']} />
          <FormPhoneNumber isRequired name="phoneNumber" label={t['kymIndPhoneNo']} />
          <FormEmailInput isRequired type="text" name="email" label={t['kymIndEmail']} />
        </FormSection>
      </form>
    </FormProvider>
  );
};
