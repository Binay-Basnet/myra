import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { Text } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

import { AddRepresentative } from './DetailsOfdirectorswithOther';

interface CentralRepresntativeDetailsProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const CentralRepresentativeDetails = (props: CentralRepresntativeDetailsProps) => {
  const { setSection } = props;
  const { t } = useTranslation();

  return (
    <SectionContainer>
      <Text p="s20" fontSize="r3" fontWeight="600">
        {t['kymCoopUnionOp4DetailsofCentralRepresentative']}
      </Text>
      <AddRepresentative setSection={setSection} />
    </SectionContainer>
  );
};
