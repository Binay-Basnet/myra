import { Text } from '@myra-ui';

import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { useTranslation } from '@coop/shared/utils';

import { AddRepresentative } from './DetailsOfdirectorswithOther';

export const CentralRepresentativeDetails = () => {
  const { t } = useTranslation();

  return (
    <SectionContainer>
      <Text p="s20" fontSize="r3" fontWeight="600">
        {t['kymCoopUnionAcc4DetailsofCentralRepresentative']}
      </Text>
      <AddRepresentative />
    </SectionContainer>
  );
};
