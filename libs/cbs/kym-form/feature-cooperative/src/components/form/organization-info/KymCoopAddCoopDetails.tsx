import React from 'react';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const KymCoopAddCoopDetails = () => {
  const { t } = useTranslation();
  return (
    <GroupContainer
      id="Additional Coorperative Details"
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
  );
};
