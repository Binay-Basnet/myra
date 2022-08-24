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

interface IPassportProps {
  setKymCurrentSection: (section?: {
    section: string;
    subSection: string;
  }) => void;
}

type passportData =
  | {
      id: string;
      idNo: string;
      idType: string;
      place: Record<'en' | 'local' | 'np', string>;
      date: string;
    }[]
  | null
  | undefined;

const getPassportData = (
  identificationListData: KymIndIdentification[] | null | undefined
) => {
  const passportData = identificationListData?.find(
    (identification: KymIndIdentification | null) =>
      identification?.idType === 'passport'
  );

  return {
    idNo: passportData?.idNo,
    place: passportData?.place?.local,
    date: passportData?.date,
    id: passportData?.id,
  };
};

export const Passport = ({ setKymCurrentSection }: IPassportProps) => {
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
      const passportData = getPassportData(
        identificationListData?.members?.individual?.listIdentification
          ?.data as passportData
      );

      if (passportData?.id) {
        setMutationId(passportData.id);

        reset({
          idNo: passportData?.idNo,
          place: passportData?.place,
          date: passportData?.date,
        });
      }
    }
  }, [identificationListData]);

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        const passportData = getPassportData(
          identificationListData?.members?.individual?.listIdentification
            ?.data as passportData
        );

        if (
          id &&
          !isDeepEmpty(data) &&
          !isEqual({ ...data, id: mutationId }, passportData)
        ) {
          if (!mutationId) {
            newIDMutate({ idType: Id_Type.Kymidentification }).then((res) => {
              setMutationId(res.newId);
              mutate({
                id: String(id),
                data: { ...data, id: res.newId, idType: 'passport' },
              });
            });
          }

          if (mutationId) {
            mutate({
              id: String(id),
              data: { ...data, id: mutationId, idType: 'passport' },
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
        <Text
          p="s20"
          pb="0"
          fontSize="r1"
          fontWeight="medium"
          color="neutralColorLight.Gray-70"
        >
          {t['kymIndPassport']}
        </Text>
        <form
          onFocus={(e) => {
            const kymSection = getKymSection(e.target.id);
            setKymCurrentSection(kymSection);
          }}
        >
          <Box p="s20" display="flex" flexDirection="column" gap="s16">
            <Grid templateColumns="repeat(3, 1fr)" gap="s20">
              <FormInput
                type="text"
                name="idNo"
                label={t['kymIndPassportNo']}
                placeholder={t['kymIndPassportNo']}
              />

              <FormInput
                type="text"
                name="place"
                label={t['kymIndPassportIssuePlace']}
                placeholder={t['kymIndPassportIssuePlace']}
              />

              <FormInput
                type="date"
                name="date"
                label={t['kymIndPassportIssueDate']}
                placeholder={t['kymIndPassportIssueDate']}
              />
            </Grid>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};
