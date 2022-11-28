import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { Text } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

import { ApplicantDetails } from './ApplicantDetails';
import { BankAccountDetails } from './BankAccountDetails';
import { BranchOfficeAddress } from './BranchOfficeAddress';
import { ContactDetails } from './ContactDetails';
import { CooperativeMemberInformation } from './CooperativeMemberInformation';
import { InstituteBasicInfo } from './InstituteBasicInfo';
import { OperatingOfficeAddress } from './OperatingOfficeAddress';
import { RegisteredDetails } from './RegisteredDetails';

interface IInstitutionInfoProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const InstituteInfo = ({ setSection }: IInstitutionInfoProps) => {
  const { t } = useTranslation();

  return (
    <SectionContainer>
      <Text p="s20" fontSize="r3" fontWeight="600">
        {t['kymCoopUnionInstitutionInformation']}
      </Text>
      <InstituteBasicInfo setSection={setSection} />
      <RegisteredDetails setSection={setSection} />
      <OperatingOfficeAddress setSection={setSection} />
      <BranchOfficeAddress setSection={setSection} />
      <ContactDetails setSection={setSection} />
      <BankAccountDetails setSection={setSection} />
      <ApplicantDetails setSection={setSection} />
      <CooperativeMemberInformation setSection={setSection} />
    </SectionContainer>
  );
};
