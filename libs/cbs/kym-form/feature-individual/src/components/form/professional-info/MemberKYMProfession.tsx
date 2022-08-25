import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Skeleton } from '@chakra-ui/react';
import debounce from 'lodash/debounce';

import {
  FormFieldSearchTerm,
  KymIndMemberInput,
  useGetIndividualKymEditDataQuery,
  useGetIndividualKymOptionsQuery,
  useSetMemberDataMutation,
} from '@coop/cbs/data-access';
import { FormCheckboxGroup } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { getKymSection, useTranslation } from '@coop/shared/utils';

import { getFieldOption } from '../../../utils/getFieldOption';

interface IMemberKYMProfessionProps {
  setKymCurrentSection: (section?: {
    section: string;
    subSection: string;
  }) => void;
}

export const MemberKYMProfession = ({
  setKymCurrentSection,
}: IMemberKYMProfessionProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const id = router?.query?.['id'];

  const methods = useForm<KymIndMemberInput>();

  const { watch, reset } = methods;

  const { data: occupationData, isLoading: occupationLoading } =
    useGetIndividualKymOptionsQuery({
      searchTerm: FormFieldSearchTerm.Occupation,
    });

  const { mutateAsync } = useSetMemberDataMutation({
    onSuccess: () => refetch(),
  });

  const { data: editValues, refetch } = useGetIndividualKymEditDataQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );

  useEffect(() => {
    if (editValues) {
      const editValueData =
        editValues?.members?.individual?.formState?.data?.formData;

      reset({
        ...editValueData?.profession,
      });
    }
  }, [editValues]);

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        if (id) {
          mutateAsync({ id: String(id), data }).then(() => refetch());
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

  return (
    <FormProvider {...methods}>
      <Text
        fontSize="r1"
        p="s20"
        pb="0"
        fontWeight="SemiBold"
        color="neutralColorLight.Gray-70"
      >
        {t['kymIndPROFESSION']}
      </Text>
      <form
        onFocus={(e) => {
          const kymSection = getKymSection(e.target.id);
          setKymCurrentSection(kymSection);
        }}
      >
        <Box
          p="s20"
          display="flex"
          flexDirection="column"
          id="kymAccIndProfession"
          scrollMarginTop={'200px'}
          gap="s16"
        >
          {occupationLoading ? (
            <Skeleton height="40px" />
          ) : (
            <FormCheckboxGroup
              name={'professionId'}
              showOther
              list={getFieldOption(occupationData)}
            />
          )}
        </Box>

        {/* <FormSection header="kymIndForeignEmploymentDetails">
          <FormSelect
            id="nameOfCountry"
            control={control}
            name="foreignEmpCountryId"
            label={t['kymIndNameofCountry']}
            placeholder={t['kymIndSelectCountry']}
            options={countryOptions}
          />
          <FormSelect
            control={control}
            id="typeOfVisa"
            name="typeOfVisaId"
            label={t['kymIndTypeofVisa']}
            placeholder={t['kymIndEnterTypeofVisa']}
            options={visaTypes}
          />
          <FormInput
            bg="white"
            control={control}
            type="number"
            textAlign={'right'}
            name={`foreignEstimatedAnnualIncome`}
            id="estimatedAnnualIncome"
            label={t['kymIndEstimatedAnnualIncome']}
            helperText={t['kymIndWriteStudentVISA']}
            placeholder="0.00"
          />
        </FormSection> */}
      </form>
    </FormProvider>
  );
};
