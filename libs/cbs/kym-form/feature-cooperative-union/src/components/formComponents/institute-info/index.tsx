import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import {
  ContainerWithDivider,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { Text } from '@coop/shared/ui';

import { ApplicantDetails } from './ApplicantDetails';
import { BankAccountDetails } from './BankAccountDetails';
import { ContactDetails } from './ContactDetails';
import { InstituteBasicInfo } from './InstituteBasicInfo';
import { RegisteredDetails } from './RegisteredDetails';

const InstituteInfo = () => {
  const router = useRouter();
  const id = String(router?.query?.['id']);
  const methods = useForm({});
  const { control, handleSubmit, getValues, watch, setError } = methods;

  return (
    <FormProvider {...methods}>
      <form
      // onChange={debounce(() => {
      //   console.log('hello', getValues());
      //   mutate({ id, data: getValues() });
      // }, 800)}
      // onSubmit={handleSubmit((data) => {
      //   console.log('data', data);
      // })}
      // onFocus={(e) => {
      //   const kymSection = getKymSectionCoOperativeUnion(e.target.id);

      //   setKymCurrentSection(kymSection);
      // }}
      >
        <SectionContainer>
          <Text fontSize="r3" fontWeight="600">
            1. Institution Information
          </Text>
          <ContainerWithDivider>
            <InstituteBasicInfo />
            <RegisteredDetails />
            <ContactDetails />
            {/* <CurrentMemberDetails /> */}
            <BankAccountDetails />
            <ApplicantDetails />
          </ContainerWithDivider>
        </SectionContainer>
      </form>
    </FormProvider>
  );
};

export default InstituteInfo;
