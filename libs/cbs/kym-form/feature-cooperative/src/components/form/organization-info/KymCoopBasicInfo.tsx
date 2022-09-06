import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { KymCooperativeFormInput } from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
import { FormSection } from '@coop/shared/ui';
import { getKymCoopSection, useTranslation } from '@coop/shared/utils';

import { useCooperative } from '../../hooks/useCooperative';

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
        <FormSection
          gridLayout={true}
          id="kymCoopAccBasicInformation"
          header="kymCoopBASICINFORMATION"
        >
          <FormInput
            type="text"
            name={'nameOfOrganization'}
            label={t['kymCoopNameofOrganization']}
            __placeholder={t['kymCoopEnterNameofOrganization']}
          />
          <FormInput
            type="number"
            name="regdNumber"
            label={t['kymCoopRegisrationNo']}
            __placeholder={t['kymCoopEnterRegisteredNumber']}
          />

          <FormInput
            type="text"
            name="regdOffice"
            label={t['kymCoopRegistrationoffice']}
            __placeholder={t['kymCoopEnterRegisteredAddress']}
          />
          <FormInput
            type="date"
            name="regdDate"
            label={t['kymCoopRegistrationDate']}
          />
        </FormSection>
      </form>
    </FormProvider>
  );
};
