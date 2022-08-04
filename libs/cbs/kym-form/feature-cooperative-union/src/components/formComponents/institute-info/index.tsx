import React from 'react';

import {
  ContainerWithDivider,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { ApplicantDetails } from './ApplicantDetails';
import { BankAccountDetails } from './BankAccountDetails';
import { BranchOfficeAddress } from './BranchOfficeAddress';
import { ContactDetails } from './ContactDetails';
import { CooperativeMemberInformation } from './CooperativeMemberInformation';
import { InstituteBasicInfo } from './InstituteBasicInfo';
import { OperatingOfficeAddress } from './OperatingOfficeAddress';
import { RegisteredDetails } from './RegisteredDetails';

interface interfaceInfoProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const InstituteInfo = (props: interfaceInfoProps) => {
  const { t } = useTranslation();
  const { setSection } = props;

  return (
    <SectionContainer>
      <Text fontSize="r3" fontWeight="600">
        {t['kymCoopUnionInstitutionInformation']}
      </Text>
      <ContainerWithDivider>
        <InstituteBasicInfo setSection={setSection} />
        <RegisteredDetails setSection={setSection} />
        <OperatingOfficeAddress setSection={setSection} />
        <BranchOfficeAddress setSection={setSection} />
        <ContactDetails setSection={setSection} />
        <BankAccountDetails setSection={setSection} />
        <ApplicantDetails setSection={setSection} />
        <CooperativeMemberInformation setSection={setSection} />
      </ContainerWithDivider>
    </SectionContainer>
    //   </form>
    // </FormProvider>
  );
};
