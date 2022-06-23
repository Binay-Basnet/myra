import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import {
  ContainerWithDivider,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { useSetCooperativeUnionBoardOfDirectorDataMutation } from '@coop/shared/data-access';
import { Text } from '@coop/shared/ui';
import { getKymSectionCoOperativeUnion } from '@coop/shared/utils';
import { useTranslation } from '@coop/shared/utils';

import { BoardDirectorInfo } from './BoardDirectorInfo';

interface directorDetailsProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const DirectorDetails = (props: directorDetailsProps) => {
  const { t } = useTranslation();
  const { setSection } = props;
  const router = useRouter();
  const id = String(router?.query?.['id']);
  const { mutate } = useSetCooperativeUnionBoardOfDirectorDataMutation({});
  const methods = useForm({
    defaultValues: {
      boardOfDirectorsDetails: [
        {
          fullName: '',
          designation: '',
          permanentStateId: '',
          permanentDistrictId: '',
          permanentVdcOrMunicId: '',
          permanentWardId: '',
          permanentLocality: '',
          isPermanentAndTemporaryAddressSame: false,
          temporaryStateId: '',
          temporaryDistrictId: '',
          temporaryVdcOrMunicId: '',
          temporaryWardId: '',
          temporaryLocality: '',
          dateOfMembership: '',
          highestQualification: '',
          contactNumber: '',
          email: '',
          citizenshipOrPassportOrLisenceNo: 0,
          subjectOfTraining: '',
          dateOfTraining: '',
          trainingOrganization: '',
          photograph: '',
          identityDocumentPhoto: '',
        },
      ],
    },
  });
  const { control, handleSubmit, getValues, watch } = methods;
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
            {t['kymCoopUnionDetailsOfBoardDirectors']}
          </Text>
          <ContainerWithDivider>
            <BoardDirectorInfo watch={watch} control={control} />
          </ContainerWithDivider>
        </SectionContainer>
      </form>
    </FormProvider>
  );
};
