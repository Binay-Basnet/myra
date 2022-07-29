import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { KymCooperativeFormInput } from '@coop/shared/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Text } from '@coop/shared/ui';
import { getKymCoopSection, useTranslation } from '@coop/shared/utils';

import { useCooperative } from '../../hooks/customCooperative';
interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}
export const KymCoopAddCoopDetails = (props: IProps) => {
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
        <GroupContainer
          id="kymCoopAccAdditionalCoorperativeDetails"
          scrollMarginTop={'200px'}
        >
          <Text
            fontSize="r1"
            fontWeight="semibold"
            color="neutralColorLight.Gray-80"
          >
            {t['kymCoopAdditionalCoorperativeDetails']}
          </Text>
          <InputGroupContainer>
            <FormSelect
              name="economicDetailType"
              label={t['kymCoopType']}
              placeholder={t['kymCoopSelectType']}
              options={[
                { label: 'Economy', value: 'economy' },
                { label: 'Maths', value: 'maths' },
              ]}
            />
            <FormInput
              type="text"
              name="mainServiceProduct"
              label={t['kymCoopMainServiceProduct']}
              placeholder={t['kymCoopEnterMainServiceProduct']}
            />
          </InputGroupContainer>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
