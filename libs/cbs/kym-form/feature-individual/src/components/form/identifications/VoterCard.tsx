import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';

import { Box, FormSection, Text } from '@myra-ui';

import {
  Id_Type,
  KymIndIdentification,
  useGetIndividualKymIdentificationListQuery,
  useGetNewIdMutation,
  useSetKymIndividualIdentificationDataMutation,
} from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
import { getKymSection, isDeepEmpty, useTranslation } from '@coop/shared/utils';

interface IVoterCardProps {
  setKymCurrentSection: (section?: { section: string; subSection: string }) => void;
}

type VoterCardData =
  | {
      id: string;
      idNo: string;
      idType: string;
      place: Record<'en' | 'local' | 'np', string>;
      date: Record<'en' | 'local' | 'np', string>;
    }[]
  | null
  | undefined;

const getVoterCardData = (identificationListData: KymIndIdentification[] | null | undefined) => {
  const VoterCardData = identificationListData?.find(
    (identification: KymIndIdentification | null) => identification?.idType === 'voterCard'
  );

  return {
    idNo: VoterCardData?.idNo,
    place: VoterCardData?.place?.local,
    id: VoterCardData?.id,
  };
};

export const VoterCard = ({ setKymCurrentSection }: IVoterCardProps) => {
  const [mutationId, setMutationId] = useState('');

  const { t } = useTranslation();

  const router = useRouter();

  const id = router?.query?.['id'];

  const methods = useForm();

  const { watch, reset } = methods;

  const { mutateAsync: newIDMutate } = useGetNewIdMutation();

  const { mutate } = useSetKymIndividualIdentificationDataMutation({
    onSuccess: () => refetch(),
  });

  const { data: identificationListData, refetch } = useGetIndividualKymIdentificationListQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );

  useEffect(() => {
    if (identificationListData?.members?.individual?.listIdentification?.data) {
      const VoterCardData = getVoterCardData(
        identificationListData?.members?.individual?.listIdentification?.data as VoterCardData
      );

      if (VoterCardData?.id) {
        setMutationId(VoterCardData.id);

        reset({
          idNo: VoterCardData?.idNo,
          place: VoterCardData?.place,
        });
      }
    }
  }, [identificationListData]);

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        const VoterCardData = getVoterCardData(
          identificationListData?.members?.individual?.listIdentification?.data as VoterCardData
        );

        if (id && !isDeepEmpty(data) && !isEqual({ ...data, id: mutationId }, VoterCardData)) {
          if (!mutationId) {
            newIDMutate({ idType: Id_Type.Kymidentification }).then((res) => {
              setMutationId(res.newId);
              mutate({
                id: String(id),
                data: { ...data, id: res.newId, idType: 'voterCard' },
              });
            });
          }

          if (mutationId) {
            mutate({
              id: String(id),
              data: { ...data, id: mutationId, idType: 'voterCard' },
            });
          }
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, mutationId, identificationListData]);

  return (
    <Box>
      <FormProvider {...methods}>
        <Text p="s20" pb="0" fontSize="r1" fontWeight="medium" color="neutralColorLight.Gray-70">
          {t['kymIndVoterCard']}
        </Text>
        <form
          onFocus={(e) => {
            const kymSection = getKymSection(e.target.id);
            setKymCurrentSection(kymSection);
          }}
        >
          <FormSection>
            <FormInput isRequired type="text" name="idNo" label={t['kymIndVoterCardNo']} />

            <FormInput
              isRequired
              type="text"
              name="place"
              label={t['kymIndVoterCardPollingStation']}
            />
          </FormSection>
        </form>
      </FormProvider>
    </Box>
  );
};
