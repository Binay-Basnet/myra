import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { AddRepresentative } from './detailsOfdirectorswithOther';

interface centralRepresntativeDetailsProps {
  setSection: React.Dispatch<
    React.SetStateAction<{ section: string; subSection: string }>
  >;
}

export const CentralRepresentativeDetails = (
  props: centralRepresntativeDetailsProps
) => {
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
