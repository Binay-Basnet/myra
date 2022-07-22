import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  Kym_Field_Custom_Id as KYMOptionEnum,
  useGetIndividualKymOptionsQuery,
} from '@coop/shared/data-access';
import {
  KymIndMemberInput,
  useSetMemberDataMutation,
} from '@coop/shared/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';
import { getKymSection } from '@coop/shared/utils';

import { getFieldOption } from '../../../utils/getFieldOption';

interface IMemberKYMBasicInfoProps {
  setKymCurrentSection: (section?: {
    section: string;
    subSection: string;
  }) => void;
}

export const MemberKYMBasicInfo = ({
  setKymCurrentSection,
}: IMemberKYMBasicInfoProps) => {
  const { t } = useTranslation();

  const router = useRouter();
  const id = String(router?.query?.['id']);

  // const {
  //   data: editValues,
  //   isLoading: editLoading,
  //   refetch,
  // } = useGetIndividualKymEditDataQuery(
  //   {
  //     id: id,
  //   },
  //   { enabled: id !== 'undefined' }
  // );

  const methods = useForm<KymIndMemberInput>();

  const { watch, reset } = methods;

  const { mutate } = useSetMemberDataMutation({
    onSuccess: (res) => {
      // setError('firstName', {
      //   type: 'custom',
      //   message: res?.members?.individual?.add?.error?.error?.['firstName'][0],
      // });
      console.log(res);
    },
    // onError: () => {
    //   setError('firstName', { type: 'custom', message: 'gg' });
    // },
  });

  const { data: genderFields, isLoading: genderLoading } =
    useGetIndividualKymOptionsQuery({
      id,
      filter: { customId: KYMOptionEnum.Gender },
    });

  const { data: ethnicityFields, isLoading: ethnicityLoading } =
    useGetIndividualKymOptionsQuery({
      id,
      filter: { customId: KYMOptionEnum.Ethnicity },
    });

  const { data: educationFields, isLoading: educationLoading } =
    useGetIndividualKymOptionsQuery({
      id,
      filter: { customId: KYMOptionEnum.EducationQualification },
    });

  const { data: religionFields, isLoading: religionLoading } =
    useGetIndividualKymOptionsQuery({
      id,
      filter: { customId: KYMOptionEnum.Religion },
    });

  const { data: nationalityFields, isLoading: nationalityLoading } =
    useGetIndividualKymOptionsQuery({
      id,
      filter: { customId: KYMOptionEnum.Nationality },
    });

  console.log({ nationalityFields });

  useEffect(() => {
    reset({
      nationalityId:
        nationalityFields?.members?.individual?.options?.list?.data?.[0]
          ?.options?.[0]?.id,
    });
  }, [nationalityLoading]);

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        mutate({ id: router.query['id'] as string, data });
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
        <GroupContainer
          id="kymAccIndBasicInformation"
          scrollMarginTop={'200px'}
        >
          <Text
            fontSize="r1"
            fontWeight="semibold"
            color="neutralColorLight.Gray-80"
          >
            {t['kymIndBASICINFORMATION']}
          </Text>
          <InputGroupContainer>
            <FormInput
              type="text"
              name="firstName"
              label={t['kymIndFirstName']}
              placeholder={t['kymIndEnterFirstName']}
            />
            <FormInput
              type="text"
              name="middleName"
              label={t['kymIndMiddleName']}
              placeholder={t['kymIndEnterMiddlename']}
            />
            <FormInput
              type="text"
              name="lastName"
              label={t['kymIndLastName']}
              placeholder={t['kymIndEnterLastname']}
            />
            <FormSelect
              name="genderId"
              label={t['kymIndGender']}
              placeholder={t['kymIndSelectGender']}
              isLoading={genderLoading}
              options={getFieldOption(genderFields)}
            />
            <FormInput
              type="date"
              name="dateOfBirth"
              label={t['kymIndDateofBirthBS']}
              placeholder={t['kymIndEnterdateofbirth']}
            />
            <FormSelect
              name="ethnicityId"
              label={t['kymIndEthnicity']}
              placeholder={t['kymIndSelectEthnicity']}
              isLoading={ethnicityLoading}
              options={getFieldOption(ethnicityFields)}
            />

            <FormSelect
              name="nationalityId"
              isDisabled
              label={t['kymIndNationality']}
              placeholder={t['kymIndEnterNationality']}
              isLoading={nationalityLoading}
              options={getFieldOption(nationalityFields)}
            />

            <FormSelect
              name={'educationQualificationId'}
              label={t['kymIndEducationalQualification']}
              placeholder={t['kymIndSelectEducationalQualification']}
              isLoading={educationLoading}
              options={getFieldOption(educationFields)}
            />
            <FormSelect
              name="religionId"
              label={t['kymIndReligion']}
              placeholder={t['kymIndSelectReligion']}
              isLoading={religionLoading}
              options={getFieldOption(religionFields)}
            />
          </InputGroupContainer>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
