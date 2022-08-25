import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import {
  FormFieldSearchTerm,
  KymIndMemberInput,
  useGetIndividualKymEditDataQuery,
  useGetIndividualKymOptionsQuery,
  useSetMemberDataMutation,
} from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { FormSection } from '@coop/shared/ui';
import { getKymSection, useTranslation } from '@coop/shared/utils';

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
  const id = router?.query?.['id'];

  const methods = useForm<KymIndMemberInput>({});

  const { watch, reset } = methods;

  const { mutate } = useSetMemberDataMutation();

  const { data: genderFields, isLoading: genderLoading } =
    useGetIndividualKymOptionsQuery({
      searchTerm: FormFieldSearchTerm.Gender,
    });

  const { data: ethnicityFields, isLoading: ethnicityLoading } =
    useGetIndividualKymOptionsQuery({
      searchTerm: FormFieldSearchTerm.Ethnicity,
    });

  const { data: educationFields, isLoading: educationLoading } =
    useGetIndividualKymOptionsQuery({
      searchTerm: FormFieldSearchTerm.EducationQualification,
    });

  const { data: religionFields, isLoading: religionLoading } =
    useGetIndividualKymOptionsQuery({
      searchTerm: FormFieldSearchTerm.Religion,
    });

  const { data: nationalityFields, isLoading: nationalityLoading } =
    useGetIndividualKymOptionsQuery({
      searchTerm: FormFieldSearchTerm.Nationality,
    });

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        if (id) {
          mutate({ id: String(id), data });
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

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
        ...editValueData?.basicInformation,
        firstName: editValueData?.basicInformation?.firstName?.local,
        middleName: editValueData?.basicInformation?.middleName?.local,
        lastName: editValueData?.basicInformation?.lastName?.local,
        nationalityId:
          nationalityFields?.form?.options?.predefined?.data?.[0]?.id,
      });
    }
  }, [nationalityFields, editValues]);

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSection(e.target.id);
          setKymCurrentSection(kymSection);
        }}
      >
        <FormSection
          gridLayout={true}
          id="kymAccIndBasicInformation"
          // scrollMarginTop={'200px'}
          header="kymIndBASICINFORMATION"
        >
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
        </FormSection>
      </form>
    </FormProvider>
  );
};
