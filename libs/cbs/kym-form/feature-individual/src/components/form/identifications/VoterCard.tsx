import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';

import {
  Id_Type,
  KymIndIdentification,
  useGetIndividualKymIdentificationListQuery,
  useGetNewIdMutation,
  useSetKymIndividualIdentificationDataMutation,
} from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
import { Box, Grid, Text } from '@coop/shared/ui';
import { getKymSection, isDeepEmpty, useTranslation } from '@coop/shared/utils';

interface IVoterCardProps {
  setKymCurrentSection: (section?: {
    section: string;
    subSection: string;
  }) => void;
}

type voterCardData =
  | {
      id: string;
      idNo: string;
      idType: string;
      place: Record<'en' | 'local' | 'np', string>;
      date: string;
    }[]
  | null
  | undefined;

const getVoterCardData = (
  identificationListData: KymIndIdentification[] | null | undefined
) => {
  const voterCardData = identificationListData?.find(
    (identification: KymIndIdentification | null) =>
      identification?.idType === 'voterCard'
  );

  return {
    idNo: voterCardData?.idNo,
    place: voterCardData?.place?.local,
    id: voterCardData?.id,
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

  const { data: identificationListData, refetch } =
    useGetIndividualKymIdentificationListQuery(
      {
        id: String(id),
      },
      { enabled: !!id }
    );

  useEffect(() => {
    if (identificationListData?.members?.individual?.listIdentification?.data) {
      const voterCardData = getVoterCardData(
        identificationListData?.members?.individual?.listIdentification
          ?.data as voterCardData
      );

      if (voterCardData?.id) {
        setMutationId(voterCardData.id);

        reset({
          idNo: voterCardData?.idNo,
          place: voterCardData?.place,
        });
      }
    }
  }, [identificationListData]);

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        const voterCardData = getVoterCardData(
          identificationListData?.members?.individual?.listIdentification
            ?.data as voterCardData
        );

        if (
          id &&
          !isDeepEmpty(data) &&
          !isEqual({ ...data, id: mutationId }, voterCardData)
        ) {
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
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSection(e.target.id);
          setKymCurrentSection(kymSection);
        }}
      >
        <Box display="flex" flexDirection="column" gap="s16">
          <Text
            fontSize="r1"
            fontWeight="medium"
            color="neutralColorLight.Gray-70"
          >
            {t['kymIndVoterCard']}
          </Text>
          <Grid templateColumns="repeat(3, 1fr)" gap="s20">
            <FormInput
              type="text"
              name="idNo"
              label={t['kymIndVoterCardNo']}
              placeholder={t['kymIndVoterCardNo']}
            />

            <FormInput
              type="text"
              name="place"
              label={t['kymIndVoterCardPollingStation']}
              placeholder={t['kymIndVoterCardPollingStation']}
            />
          </Grid>
        </Box>
      </form>
    </FormProvider>
  );
};
