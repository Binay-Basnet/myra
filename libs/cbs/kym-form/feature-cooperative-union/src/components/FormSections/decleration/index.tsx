import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { DocumentDeclarationInstitutionCOOPUnion } from './COOPUnionDeclaration';

interface declarationProps {
  setSection: (section: { section: string; subSection: string }) => void;
}

export const Declaration = (props: declarationProps) => {
  const { t } = useTranslation();
  const { setSection } = props;

  return (
    <SectionContainer>
      <Text p="s20" fontSize="r3" fontWeight="600">
        {t['kymCoopUnionDec7Declaration']}
      </Text>
      <DocumentDeclarationInstitutionCOOPUnion setSection={setSection} />
    </SectionContainer>
  );
};
