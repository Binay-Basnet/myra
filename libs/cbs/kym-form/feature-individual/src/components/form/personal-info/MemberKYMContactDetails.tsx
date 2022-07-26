import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  KymIndMemberInput,
  useGetIndividualKymEditDataQuery,
  useSetMemberDataMutation,
} from '@coop/shared/data-access';
import { FormEmailInput, FormPhoneNumber } from '@coop/shared/form';
import { Text } from '@coop/shared/ui';
import { getKymSection, useTranslation } from '@coop/shared/utils';

interface IMemberKYMContactDetailsProps {
  setKymCurrentSection: (section?: {
    section: string;
    subSection: string;
  }) => void;
}

export const MemberKYMContactDetails = ({
  setKymCurrentSection,
}: IMemberKYMContactDetailsProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const id = String(router?.query?.['id']);

  const methods = useForm<KymIndMemberInput>();

  const { watch, reset } = methods;

  const { data: editValues, refetch } = useGetIndividualKymEditDataQuery({
    id: id,
  });

  useEffect(() => {
    if (editValues) {
      const editValueData =
        editValues?.members?.individual?.formState?.data?.formData;

      reset({
        ...editValueData?.contactDetails,
      });
    }
  }, [editValues]);

  const { mutate } = useSetMemberDataMutation();

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        mutate({ id: router.query['id'] as string, data });
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSection(e.target.id);
          setKymCurrentSection(kymSection);
        }}
      >
        <GroupContainer id="kymAccIndContactDetails" scrollMarginTop={'200px'}>
          <Text
            fontSize="r1"
            fontWeight="semibold"
            color="neutralColorLight.Gray-80"
          >
            {t['kymIndCONTACTDETAILS']}
          </Text>
          <InputGroupContainer>
            <FormPhoneNumber
              name="mobileNumber"
              label={t['kymIndMobileNo']}
              placeholder={t['kymIndEnterMobileNo']}
            />
            <FormPhoneNumber
              name="phoneNumber"
              label={t['kymIndPhoneNo']}
              placeholder={t['kymIndEnterPhoneNo']}
            />
            <FormEmailInput
              type="text"
              name="email"
              label={t['kymIndEmail']}
              placeholder={t['kymIndEnterEmail']}
            />
          </InputGroupContainer>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
