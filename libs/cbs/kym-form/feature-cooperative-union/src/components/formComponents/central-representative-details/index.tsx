import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import {
  ContainerWithDivider,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { useSetPersonnelDetailsMutation } from '@coop/shared/data-access';
import { Text } from '@coop/shared/ui';
import { getKymSectionCoOperativeUnion } from '@coop/shared/utils';
import { useTranslation } from '@coop/shared/utils';

import { AddRepresentative } from './detailsOfdirectorswithOther';

interface centralRepresntativeDetailsProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const CentralRepresentativeDetails = (
  props: centralRepresntativeDetailsProps
) => {
  const { setSection } = props;
  const router = useRouter();
  const id = String(router?.query?.['id']);
  const { mutate } = useSetPersonnelDetailsMutation({});
  const methods = useForm({});
  const { control, handleSubmit, getValues, watch, setError } = methods;
  const { t } = useTranslation();

  return (
    <FormProvider {...methods}>
      <form
        onChange={debounce(() => {
          console.log('hello', getValues());
          // mutate({ id, data: getValues() });
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
            {t['kymCoopUnionOp4DetailsofCentralRepresentative']}
          </Text>
          <ContainerWithDivider>
            <AddRepresentative watch={watch} control={control} />
          </ContainerWithDivider>
        </SectionContainer>
      </form>
    </FormProvider>
  );
};
