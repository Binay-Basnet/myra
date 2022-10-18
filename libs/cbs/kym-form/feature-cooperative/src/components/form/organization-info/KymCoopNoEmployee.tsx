import { FormProvider, useForm } from 'react-hook-form';

import { KymCooperativeFormInput } from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
import { FormSection } from '@coop/shared/ui';
import { getKymCoopSection, useTranslation } from '@coop/shared/utils';

import { useCooperative } from '../../hooks/useCooperative';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const KymCoopNoEmployee = (props: IProps) => {
  const { t } = useTranslation();

  const { setSection } = props;
  const methods = useForm<KymCooperativeFormInput>({
    defaultValues: {},
  });

  const { watch } = methods;

  useCooperative({ methods });

  const totalEmployee =
    (Number(watch('noOfMaleEmployee')) ?? 0) + Number(watch('noOfFemaleEmployee') ?? 0);

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymCoopSection(e.target.id);
          setSection(kymSection);
        }}
      >
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
      </form>
    </FormProvider>
  );
};
