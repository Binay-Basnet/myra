import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import { useSetDeclarationDataMutation } from '@coop/cbs/data-access';
import {
  ContainerWithDivider,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { Text } from '@coop/shared/ui';
import { getKymSectionCoOperativeUnion } from '@coop/shared/utils';
import { useTranslation } from '@coop/shared/utils';

import { DocumentDeclarationInstitutionCOOPUnion } from './COOPUnionDeclaration';

interface declarationProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const Declaration = (props: declarationProps) => {
  const { t } = useTranslation();
  const { setSection } = props;
  const router = useRouter();
  const id = String(router?.query?.['id']);
  const { mutate } = useSetDeclarationDataMutation({});
  const methods = useForm({});
  const { handleSubmit, getValues } = methods;
  return (
    <FormProvider {...methods}>
      <form
        onChange={debounce(() => {
          mutate({ id, data: getValues() });
        }, 800)}
        onFocus={(e) => {
          const kymSection = getKymSectionCoOperativeUnion(e.target.id);

          setSection(kymSection);
        }}
      >
        <SectionContainer>
          <Text fontSize="r3" fontWeight="600">
            {t['kymCoopUnionDec7Declaration']}
          </Text>
          <ContainerWithDivider>
            <DocumentDeclarationInstitutionCOOPUnion setSection={setSection} />
          </ContainerWithDivider>
        </SectionContainer>
      </form>
    </FormProvider>
  );
};
