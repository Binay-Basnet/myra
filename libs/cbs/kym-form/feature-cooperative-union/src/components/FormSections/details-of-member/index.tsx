import { FormProvider, useForm } from 'react-hook-form';
import debounce from 'lodash/debounce';

import {
  ContainerWithDivider,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { Text } from '@coop/shared/ui';
import {
  getKymSectionCoOperativeUnion,
  useTranslation,
} from '@coop/shared/utils';

import { KymMemberdetailsCOOP } from './memberDetails';

interface memberDetailsProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const MemberDetails = (props: memberDetailsProps) => {
  const { t } = useTranslation();
  const { setSection } = props;
  const methods = useForm({});
  const { watch } = methods;
  return (
    <FormProvider {...methods}>
      <form
        onChange={debounce(() => {
          // mutate({ id, data: getValues() });
        }, 800)}
        onFocus={(e) => {
          const kymSection = getKymSectionCoOperativeUnion(e.target.id);

          setSection(kymSection);
        }}
      >
        <SectionContainer>
          <Text fontSize="r3" fontWeight="600">
            {t['kymCoopUnionRep5DetailsofMember']}
          </Text>
          <ContainerWithDivider>
            <KymMemberdetailsCOOP watch={watch} />
          </ContainerWithDivider>
        </SectionContainer>
      </form>
    </FormProvider>
  );
};
