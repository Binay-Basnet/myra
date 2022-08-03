import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import { useSetPersonnelDetailsMutation } from '@coop/cbs/data-access';
import {
  ContainerWithDivider,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { Text } from '@coop/shared/ui';
import { getKymSectionCoOperativeUnion } from '@coop/shared/utils';
import { useTranslation } from '@coop/shared/utils';

import { KymMemberdetailsCOOP } from './memberDetails';

interface memberDetailsProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const MemberDetails = (props: memberDetailsProps) => {
  const { t } = useTranslation();
  const { setSection } = props;
  const router = useRouter();
  const id = String(router?.query?.['id']);
  const { mutate } = useSetPersonnelDetailsMutation({});
  const methods = useForm({});
  const { handleSubmit, getValues, watch } = methods;
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
