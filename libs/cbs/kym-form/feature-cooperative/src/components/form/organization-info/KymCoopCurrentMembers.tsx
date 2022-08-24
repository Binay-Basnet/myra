import { FormProvider, useForm } from 'react-hook-form';

import { KymCooperativeFormInput } from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
import { FormSection } from '@coop/shared/ui';
import { getKymCoopSection, useTranslation } from '@coop/shared/utils';

import { useCooperative } from '../../hooks/useCooperative';
interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const KymCoopCurrentMembers = (props: IProps) => {
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
          id="kymCoopAccCurrentMembers"
          header="kymCoopCurrentMembers"
        >
          <FormInput
            type="number"
            min={0}
            name="noOfMaleMembers"
            label={t['kymCoopNoofMalemembers']}
            placeholder={t['kymCoopEnternumberofMaleMembers']}
          />
          <FormInput
            type="number"
            min={0}
            name="noOfFemaleMembers"
            label={t['kymCoopNoofFemalemembers']}
            placeholder={t['kymCoopEnternumberofFemaleMembers']}
          />

          <FormInput
            type="text"
            name="noOfOtherMembers"
            label={t['kymCoopNoofOthermembers']}
            placeholder={t['kymCoopEnternumberofOthermembers']}
          />
        </FormSection>
      </form>
    </FormProvider>
  );
};
