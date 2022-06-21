import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import {
  ContainerWithDivider,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { useSetMemberDetailsDataMutation } from '@coop/shared/data-access';
import { Text } from '@coop/shared/ui';
import { getKymSectionCoOperativeUnion } from '@coop/shared/utils';

import { KymMemberdetailsCOOP } from './memberDetails';

interface memberDetailsProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const MemberDetails = (props: memberDetailsProps) => {
  const { setSection } = props;
  const router = useRouter();
  const id = String(router?.query?.['id']);
  const { mutate } = useSetMemberDetailsDataMutation({});
  const methods = useForm({});
  const { handleSubmit, getValues, watch } = methods;
  return (
    <FormProvider {...methods}>
      <form
        onChange={debounce(() => {
          console.log('hello', getValues());
          mutate({ id, data: getValues() });
        }, 800)}
        onSubmit={handleSubmit((data) => {
          console.log('data', data);
        })}
        onFocus={(e) => {
          const kymSection = getKymSectionCoOperativeUnion(e.target.id);

          setSection(kymSection);
        }}
      >
        <SectionContainer>
          <Text fontSize="r3" fontWeight="600">
            5. Details of member
          </Text>
          <ContainerWithDivider>
            <KymMemberdetailsCOOP watch={watch} />
          </ContainerWithDivider>
        </SectionContainer>
      </form>
    </FormProvider>
  );
};
