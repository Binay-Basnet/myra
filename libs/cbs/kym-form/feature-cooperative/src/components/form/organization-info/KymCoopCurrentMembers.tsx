import { FormProvider, useForm } from 'react-hook-form';

import { KymCooperativeFormInput } from '@coop/cbs/data-access';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/shared/form';
import { Text } from '@coop/shared/ui';
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
  const { control, handleSubmit, getValues, watch, setError } = methods;
  useCooperative({ methods });

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymCoopSection(e.target.id);
          setSection(kymSection);
        }}
      >
        <GroupContainer id="kymCoopAccCurrentMembers" scrollMarginTop={'200px'}>
          <Text
            fontSize="r1"
            fontWeight="semibold"
            color="neutralColorLight.Gray-80"
          >
            {t['kymCoopCurrentMembers']}
          </Text>
          <InputGroupContainer>
            <FormInput
              type="text"
              name="noOfMaleMembers"
              label={t['kymCoopNoofMalemembers']}
              placeholder={t['kymCoopEnternumberofMaleMembers']}
            />
            <FormInput
              type="text"
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
          </InputGroupContainer>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
