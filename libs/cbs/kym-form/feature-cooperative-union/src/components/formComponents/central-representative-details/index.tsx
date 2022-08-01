import {
  ContainerWithDivider,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { AddRepresentative } from './detailsOfdirectorswithOther';

interface centralRepresntativeDetailsProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const CentralRepresentativeDetails = (
  props: centralRepresntativeDetailsProps
) => {
  const { setSection } = props;
  const { t } = useTranslation();

  return (
    <SectionContainer>
      <Text fontSize="r3" fontWeight="600">
        {t['kymCoopUnionOp4DetailsofCentralRepresentative']}
      </Text>
      <ContainerWithDivider>
        <AddRepresentative setSection={setSection} />
      </ContainerWithDivider>
    </SectionContainer>
  );
};
