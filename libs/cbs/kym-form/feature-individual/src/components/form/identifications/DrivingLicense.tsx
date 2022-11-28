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
import { Box, FormSection, Text } from '@myra-ui';
import { getKymSection, isDeepEmpty, useTranslation } from '@coop/shared/utils';

interface IDrivingLicenseProps {
  setKymCurrentSection: (section?: { section: string; subSection: string }) => void;
}

type DrivingLicenseDataType =
  | {
      id: string;
      idNo: string;
      idType: string;
      place: Record<'en' | 'local' | 'np', string>;
      date: string;
    }[]
  | null
  | undefined;

const getDrivingLicenseData = (
  identificationListData: KymIndIdentification[] | null | undefined
) => {
  const drivingLicenseData = identificationListData?.find(
    (identification: KymIndIdentification | null) => identification?.idType === 'drivingLicense'
  );

  return {
    idNo: drivingLicenseData?.idNo,
    place: drivingLicenseData?.place?.local,
    date: drivingLicenseData?.date,
    id: drivingLicenseData?.id,
  };
};

export const DrivingLicense = ({ setKymCurrentSection }: IDrivingLicenseProps) => {
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
      const drivingLicenseData = getDrivingLicenseData(
        identificationListData?.members?.individual?.listIdentification
          ?.data as DrivingLicenseDataType
      );

      if (drivingLicenseData?.id) {
        setMutationId(drivingLicenseData.id);

        reset({
          idNo: drivingLicenseData?.idNo,
          place: drivingLicenseData?.place,
          date: drivingLicenseData?.date,
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
        const drivingLicenseData = getDrivingLicenseData(
          identificationListData?.members?.individual?.listIdentification
            ?.data as DrivingLicenseDataType
        );

        if (id && !isDeepEmpty(data) && !isEqual({ ...data, id: mutationId }, drivingLicenseData)) {
          if (!mutationId) {
            newIDMutate({ idType: Id_Type.Kymidentification }).then((res) => {
              setMutationId(res.newId);
              mutate({
                id: String(id),
                data: { ...data, id: res.newId, idType: 'drivingLicense' },
              });
            });
          }

          if (mutationId) {
            mutate({
              id: String(id),
              data: { ...data, id: mutationId, idType: 'drivingLicense' },
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
          {t['kymIndDrivingLicense']}
        </Text>
        <form
          onFocus={(e) => {
            const kymSection = getKymSection(e.target.id);
            setKymCurrentSection(kymSection);
          }}
        >
          <FormSection>
            <FormInput type="text" name="idNo" label={t['kymIndDrivingLicenseNo']} />

            <FormInput type="text" name="place" label={t['kymIndDrivingLicenseIssuePlace']} />

            <FormDatePicker name="date" label={t['kymIndDrivingLicenseIssueDate']} maxToday />
          </FormSection>
        </form>
      </FormProvider>
    </Box>
  );
};
