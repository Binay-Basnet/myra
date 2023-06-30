import { useFormContext } from 'react-hook-form';

import { FormSection } from '@myra-ui';

import { KymCooperativeFormInput } from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const KymCoopNoEmployee = () => {
  const { t } = useTranslation();

  const { watch } = useFormContext<KymCooperativeFormInput>();

  const totalEmployee =
    (Number(watch('noOfMaleEmployee')) ?? 0) + Number(watch('noOfFemaleEmployee') ?? 0);

  return (
    <FormSection id="kymCoopAccNumberofEmployee" header="kymCoopNumberofEmployee">
      <FormInput
        type="number"
        textAlign="right"
        name="noOfMaleEmployee"
        label={t['kymCoopMale']}
        // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        //   setMaleNum(Number(e.target.value))
        // }
      />
      <FormInput
        type="number"
        textAlign="right"
        name="noOfFemaleEmployee"
        label={t['kymCoopFemale']}
        // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        //   setFemaleNum(Number(e.target.value))
        // }
      />

      <FormInput
        bg="neutralColorLight.Gray-20"
        border="1px solid"
        borderColor="disabled.disabled"
        isDisabled
        type="number"
        textAlign="right"
        name="totalEmployee"
        label={t['kymCoopTotal']}
        value={totalEmployee}
      />
    </FormSection>
  );
};
