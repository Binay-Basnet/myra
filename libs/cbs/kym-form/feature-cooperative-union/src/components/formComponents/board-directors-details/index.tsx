import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { BoardDirectorInfo } from './BoardDirectorInfo';

interface directorDetailsProps {
  setSection: React.Dispatch<
    React.SetStateAction<{ section: string; subSection: string }>
  >;
}

export const DirectorDetails = (props: directorDetailsProps) => {
  const { t } = useTranslation();
  const { setSection } = props;

  return (
    <SectionContainer>
      <Text p="s20" fontSize="r3" fontWeight="600">
        {t['kymCoopUnionDetailsOfBoardDirectors']}
      </Text>
      <BoardDirectorInfo setSection={setSection} />
    </SectionContainer>
  );
};
