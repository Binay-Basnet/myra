import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { AccountOperatorInfo } from './AccountOperatorDetails';

interface directorDetailsProps {
  setSection: (section: { section: string; subSection: string }) => void;
}

export const AccountOperatorDetails = (props: directorDetailsProps) => {
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
