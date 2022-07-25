import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Skeleton } from '@chakra-ui/react';
import debounce from 'lodash/debounce';

import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import {
  Kym_Field_Custom_Id as KYMOptionEnum,
  KymIndMemberInput,
  useGetIndividualKymEditDataQuery,
  useGetIndividualKymOptionsQuery,
  useSetMemberDataMutation,
} from '@coop/shared/data-access';
import { FormCheckboxGroup } from '@coop/shared/form';
import { Text } from '@coop/shared/ui';
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

  const id = String(router?.query?.['id']);

  const methods = useForm<KymIndMemberInput>();

  const { watch, reset } = methods;

  const { data: occupationData, isLoading: occupationLoading } =
    useGetIndividualKymOptionsQuery({
      id,
      filter: { customId: KYMOptionEnum.Occupation },
    });

  const { mutate } = useSetMemberDataMutation();

  const { data: editValues } = useGetIndividualKymEditDataQuery({
    id: id,
  });

  console.log({
    ind: 'identification details info',
    data: editValues?.members?.individual?.formState?.data?.formData
      ?.profession,
  });

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
        mutate({ id, data });
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSection(e.target.id);
          setKymCurrentSection(kymSection);
        }}
      >
        <GroupContainer id="kymAccIndProfession" scrollMarginTop={'200px'}>
          <Text fontSize="r1" fontWeight="SemiBold">
            {t['kymIndPROFESSION']}
          </Text>

          {occupationLoading ? (
            <Skeleton height="40px" />
          ) : (
            <FormCheckboxGroup
              name={'professionId'}
              showOther
              list={getFieldOption(occupationData)}
            />
          )}
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
