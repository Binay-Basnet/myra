import { Text } from '@myra-ui';

import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { useTranslation } from '@coop/shared/utils';

import { DocumentDeclarationInstitutionCOOPUnion } from './COOPUnionDeclaration';

export const Declaration = () => {
  const { t } = useTranslation();

  return (
    <SectionContainer>
      <Text p="s20" fontSize="r3" fontWeight="600">
        {t['kymCoopUnionAcc7Declaration']}
      </Text>
      <DocumentDeclarationInstitutionCOOPUnion />
    </SectionContainer>
  );
};
