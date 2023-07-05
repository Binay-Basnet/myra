import { Text } from '@myra-ui';

import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { useTranslation } from '@coop/shared/utils';

import { AccountOperatorInfo } from './AccountOperatorDetails';

export const AccountOperatorDetails = () => {
  const { t } = useTranslation();

  return (
    <SectionContainer>
      <Text p="s20" fontSize="r3" fontWeight="600">
        {t['kymCoopUnion3DetailsofAccountOperators']}
      </Text>
      <AccountOperatorInfo />
    </SectionContainer>
  );
};
