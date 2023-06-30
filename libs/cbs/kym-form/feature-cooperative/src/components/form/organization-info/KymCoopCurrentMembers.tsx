import { FormSection } from '@myra-ui';

import { FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const KymCoopCurrentMembers = () => {
  const { t } = useTranslation();
  return (
    <FormSection id="kymCoopAccCurrentMembers" header="kymCoopCurrentMembers">
      <FormInput type="number" min={0} name="noOfMaleMembers" label={t['kymCoopNoofMalemembers']} />
      <FormInput
        type="number"
        min={0}
        name="noOfFemaleMembers"
        label={t['kymCoopNoofFemalemembers']}
      />

      <FormInput type="text" name="noOfOtherMembers" label={t['kymCoopNoofOthermembers']} />
    </FormSection>
  );
};
