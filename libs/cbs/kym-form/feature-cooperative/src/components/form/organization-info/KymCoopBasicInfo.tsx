import React from 'react';
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
export const KymCoopBasicInfo = (props: IProps) => {
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
        <GroupContainer
          id="kymCoopAccBasicInformation"
          scrollMarginTop={'200px'}
        >
          <Text
            fontSize="r1"
            fontWeight="semibold"
            color="neutralColorLight.Gray-80"
          >
            {t['kymCoopBASICINFORMATION']}
          </Text>
          <FormInput
            w="65%"
            type="text"
            name={'nameOfOrganization'}
            label={t['kymCoopNameofOrganization']}
            placeholder={t['kymCoopEnterNameofOrganization']}
          />
          <InputGroupContainer>
            <FormInput
              type="number"
              name="regdNumber"
              label={t['kymCoopRegisrationNo']}
              placeholder={t['kymCoopEnterRegisteredNumber']}
            />

            <FormInput
              type="text"
              name="regdOffice"
              label={t['kymCoopRegistrationoffice']}
              placeholder={t['kymCoopEnterRegisteredAddress']}
            />
            <FormInput
              type="date"
              name="regdDate"
              label={t['kymCoopRegistrationDate']}
            />
          </InputGroupContainer>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
