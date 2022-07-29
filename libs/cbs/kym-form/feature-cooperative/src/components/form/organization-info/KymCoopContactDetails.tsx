import { FormProvider, useForm } from 'react-hook-form';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { KymCooperativeFormInput } from '@coop/shared/data-access';
import { FormInput } from '@coop/shared/form';
import { Text } from '@coop/shared/ui';
import { getKymCoopSection, useTranslation } from '@coop/shared/utils';

import { useCooperative } from '../../hooks/customCooperative';
interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const KymCoopContactDetails = (props: IProps) => {
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
        <GroupContainer id="kymCoopAccContactDetails" scrollMarginTop={'200px'}>
          <Text
            fontSize="r1"
            fontWeight="semibold"
            color="neutralColorLight.Gray-80"
          >
            {t['kymCoopContactDetails']}
          </Text>
          <InputGroupContainer>
            <FormInput
              type="text"
              name="email"
              label={t['kymCoopOfficialEmail']}
              placeholder={t['kymCoopEnterEmailAddress']}
            />
            <FormInput
              type="text"
              name="website"
              label={t['kymCoopWebsiteLink']}
              placeholder={t['kymCoopEnterWebsiteURL']}
            />

            <FormInput
              type="text"
              name="contactNumber"
              label={t['kymCoopPhoneno']}
              placeholder={t['kymCoopEnterPhoneNumber']}
            />
          </InputGroupContainer>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
