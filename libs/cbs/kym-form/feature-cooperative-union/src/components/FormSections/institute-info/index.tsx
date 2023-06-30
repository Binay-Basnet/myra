import { Text } from '@myra-ui';

import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { useTranslation } from '@coop/shared/utils';

import { ApplicantDetails } from './ApplicantDetails';
import { BankAccountDetails } from './BankAccountDetails';
import { BranchOfficeAddress } from './BranchOfficeAddress';
import { ContactDetails } from './ContactDetails';
import { CooperativeMemberInformation } from './CooperativeMemberInformation';
import { InstituteBasicInfo } from './InstituteBasicInfo';
import { OperatingOfficeAddress } from './OperatingOfficeAddress';
import { RegisteredDetails } from './RegisteredDetails';

export const InstituteInfo = () => {
  const { t } = useTranslation();

  return (
    <SectionContainer>
      <Text p="s20" fontSize="r3" fontWeight="600">
        {t['kymCoopUnionInstitutionInformation']}
      </Text>
      <InstituteBasicInfo />
      <RegisteredDetails />
      <OperatingOfficeAddress />
      <BranchOfficeAddress />
      <ContactDetails />
      <BankAccountDetails />
      <ApplicantDetails />
      <CooperativeMemberInformation />
    </SectionContainer>
  );
};
