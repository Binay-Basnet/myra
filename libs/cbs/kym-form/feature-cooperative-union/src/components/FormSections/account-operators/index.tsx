import { Text } from '@myra-ui';

import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { useTranslation } from '@coop/shared/utils';

import { AccountOperatorInfo } from './AccountOperatorDetails';

interface DirectorDetailsProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const AccountOperatorDetails = (props: DirectorDetailsProps) => {
  const { t } = useTranslation();
  const { setSection } = props;

  return (
    <SectionContainer>
      <Text p="s20" fontSize="r3" fontWeight="600">
        {t['kymCoopUnion3DetailsofAccountOperators']}
      </Text>
      <AccountOperatorInfo setSection={setSection} />
    </SectionContainer>
  );
};
