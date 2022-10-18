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
import { Box, FormSection, Text } from '@coop/shared/ui';
import { getKymSection, isDeepEmpty, useTranslation } from '@coop/shared/utils';

interface INationalIDProps {
  setKymCurrentSection: (section?: { section: string; subSection: string }) => void;
}

type NationalIdData =
  | {
      id: string;
      idNo: string;
      idType: string;
      place: Record<'en' | 'local' | 'np', string>;
      date: string;
    }[]
  | null
  | undefined;

const getNationalIDData = (identificationListData: KymIndIdentification[] | null | undefined) => {
  const NationalIdData = identificationListData?.find(
    (identification: KymIndIdentification | null) => identification?.idType === 'nationalId'
  );

  return {
    idNo: NationalIdData?.idNo,
    id: NationalIdData?.id,
  };
};

export const NationalID = ({ setKymCurrentSection }: INationalIDProps) => {
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
      const NationalIdData = getNationalIDData(
        identificationListData?.members?.individual?.listIdentification?.data as NationalIdData
      );

      if (NationalIdData?.id) {
        setMutationId(NationalIdData.id);

        reset({
          idNo: NationalIdData?.idNo,
        });
      }
    }
  }, [identificationListData]);

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        const NationalIdData = getNationalIDData(
          identificationListData?.members?.individual?.listIdentification?.data as NationalIdData
        );

        if (id && !isDeepEmpty(data) && !isEqual({ ...data, id: mutationId }, NationalIdData)) {
          if (!mutationId) {
            newIDMutate({ idType: Id_Type.Kymidentification }).then((res) => {
              setMutationId(res.newId);
              mutate({
                id: String(id),
                data: { ...data, id: res.newId, idType: 'nationalId' },
              });
            });
          }

          if (mutationId) {
            mutate({
              id: String(id),
              data: { ...data, id: mutationId, idType: 'nationalId' },
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
          {t['kymIndNationalID']}
        </Text>
        <form
          onFocus={(e) => {
            const kymSection = getKymSection(e.target.id);
            setKymCurrentSection(kymSection);
          }}
        >
          <FormSection>
            <FormInput type="text" name="idNo" label={t['kymIndNationalIDNo']} />
          </FormSection>
        </form>
      </FormProvider>
    </Box>
  );
};
