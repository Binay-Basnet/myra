import { Text } from '@myra-ui/foundations';

import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { useTranslation } from '@coop/shared/utils';

import {
  KYMIndAddress,
  KYMIndBasicInfo,
  KYMIndContactDetails,
  KYMIndFamilyDetails,
  KYMIndFamilyMember,
  KYMIndIdentificationDetails,
} from './sections';

export const KYMIndPersonalInfo = () => {
  const { t } = useTranslation();

  return (
    <SectionContainer>
      <Text p="s20" fontSize="r3" fontWeight="SemiBold">
        {t['kymAccInd1PersonalDetails']}
      </Text>
      <KYMIndBasicInfo />
      <KYMIndContactDetails />
      <KYMIndIdentificationDetails />
      <KYMIndAddress />
      <KYMIndFamilyDetails />
      <KYMIndFamilyMember />
    </SectionContainer>
  );
};
