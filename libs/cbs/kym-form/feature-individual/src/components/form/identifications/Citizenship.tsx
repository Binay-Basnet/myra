import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';

import {
  Id_Type,
  KymIndIdentification,
  RootState,
  useAppSelector,
  useGetIndividualKymIdentificationListQuery,
  useGetNewIdMutation,
  useSetKymIndividualIdentificationDataMutation,
} from '@coop/cbs/data-access';
import { FormDatePicker, FormInput } from '@coop/shared/form';
import { Box, FormSection, Text } from '@coop/shared/ui';
import { getKymSection, isDeepEmpty, useTranslation } from '@coop/shared/utils';

interface ICitizenshipProps {
  setKymCurrentSection: (section?: { section: string; subSection: string }) => void;
}

type CitizenshipDataType =
  | {
      id: string;
      idNo: string;
      idType: string;
      place: Record<'en' | 'local' | 'np', string>;
      date: string;
    }[]
  | null
  | undefined;

const getCitizenshipData = (identificationListData: KymIndIdentification[] | null | undefined) => {
  const citizenshipData = identificationListData?.find(
    (identification: KymIndIdentification | null) => identification?.idType === 'citizenship'
  );

  return {
    idNo: citizenshipData?.idNo,
    place: citizenshipData?.place?.local,
    date: citizenshipData?.date,
    id: citizenshipData?.id,
  };
};

export const Citizenship = ({ setKymCurrentSection }: ICitizenshipProps) => {
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
      const citizenshipData = getCitizenshipData(
        identificationListData?.members?.individual?.listIdentification?.data as CitizenshipDataType
      );

      if (citizenshipData?.id) {
        setMutationId(citizenshipData.id);

        reset({
          idNo: citizenshipData?.idNo,
          place: citizenshipData?.place,
          date: citizenshipData?.date,
        });
      }
    }
  }, [identificationListData]);

  // refetch data when calendar preference is updated
  const preference = useAppSelector((state: RootState) => state?.auth?.preference);

  useEffect(() => {
    refetch();
  }, [preference?.date]);

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        const citizenshipData = getCitizenshipData(
          identificationListData?.members?.individual?.listIdentification
            ?.data as CitizenshipDataType
        );

        if (id && !isDeepEmpty(data) && !isEqual({ ...data, id: mutationId }, citizenshipData)) {
          if (!mutationId) {
            newIDMutate({ idType: Id_Type.Kymidentification }).then((res) => {
              setMutationId(res.newId);
              mutate({
                id: String(id),
                data: { ...data, id: res.newId, idType: 'citizenship' },
              });
            });
          }

          if (mutationId) {
            mutate({
              id: String(id),
              data: { ...data, id: mutationId, idType: 'citizenship' },
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
        <Text fontSize="r1" p="s20" pb="0" fontWeight="medium" color="neutralColorLight.Gray-70">
          {t['kynIndCitizenship']}
        </Text>
        <form
          onFocus={(e) => {
            const kymSection = getKymSection(e.target.id);
            setKymCurrentSection(kymSection);
          }}
        >
          <FormSection>
            <FormInput type="text" name="idNo" label={t['kynIndCitizenshipNo']} />

            <FormInput type="text" name="place" label={t['kynIndCitizenshipIssuePlace']} />

            <FormDatePicker name="date" label={t['kynIndCitizenshipIssueDate']} />
          </FormSection>
        </form>
      </FormProvider>
    </Box>
  );
};
