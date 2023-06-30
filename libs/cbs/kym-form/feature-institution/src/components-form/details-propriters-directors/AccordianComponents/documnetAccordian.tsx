import { FormSection } from '@myra-ui';

import { FormFileInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

interface IProps {
  index: number;
}

export const DocumentComponent = ({ index }: IProps) => {
  const { t } = useTranslation();

  return (
    <FormSection templateColumns={2}>
      <FormFileInput
        label={t['kymInsPhotograph']}
        name={`director.${index}.documents.0.identifiers`}
        size="lg"
      />
      <FormFileInput
        label={t['kymInsPhotographOfIdentityProofDocument']}
        name={`director.${index}.documents.1.identifiers`}
        size="lg"
      />
    </FormSection>
  );
};
