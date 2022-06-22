import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import {
  ContainerWithDivider,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { useSetCooperativeUnionInstitutionDataMutation } from '@coop/shared/data-access';
import { Text } from '@coop/shared/ui';
import { getKymSectionCoOperativeUnion } from '@coop/shared/utils';

import { ApplicantDetails } from './ApplicantDetails';
import { BankAccountDetails } from './BankAccountDetails';
import { ContactDetails } from './ContactDetails';
import { InstituteBasicInfo } from './InstituteBasicInfo';
import { RegisteredDetails } from './RegisteredDetails';
import { useTranslation } from '@coop/shared/utils';

interface interfaceInfoProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const InstituteInfo = (props: interfaceInfoProps) => {
  const { t } = useTranslation();
  const { setSection } = props;
  const router = useRouter();
  const id = String(router?.query?.['id']);
  const { mutate } = useSetCooperativeUnionInstitutionDataMutation({});
  const methods = useForm({});
  const { control, handleSubmit, getValues, watch, setError } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onChange={debounce(() => {
          console.log('hello', getValues());
          mutate({ id, data: getValues() });
        }, 800)}
        onSubmit={handleSubmit((data) => {
          console.log('data', data);
        })}
        onFocus={(e) => {
          const kymSection = getKymSectionCoOperativeUnion(e.target.id);

          setSection(kymSection);
        }}
      >
        <SectionContainer>
          <Text fontSize="r3" fontWeight="600">
            {t.kymCoopUnionInstitutionInformation}
          </Text>
          <ContainerWithDivider>
            <InstituteBasicInfo />
            <RegisteredDetails />
            <ContactDetails />
            <BankAccountDetails />
            <ApplicantDetails />
          </ContainerWithDivider>
        </SectionContainer>
      </form>
    </FormProvider>
  );
};
