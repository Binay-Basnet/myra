import { useEffect, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';
import { isEmpty, isEqual } from 'lodash';
import debounce from 'lodash/debounce';
import pickBy from 'lodash/pickBy';

import {
  FormFieldSearchTerm,
  FormOption,
  KymIndMemberInput,
  RootState,
  useAppSelector,
  useGetConfigQuery,
  useGetIndividualKymEditDataQuery,
  useGetIndividualKymFamilyOccupationListQuery,
  useGetIndividualKymOptionsQuery,
  useGetNewIdMutation,
  useSetMemberDataMutation,
  useSetMemberOccupationMutation,
} from '@coop/cbs/data-access';
import { FormInputWithType } from '@coop/cbs/kym-form/formElements';
import {
  FormAmountInput,
  FormCheckbox,
  FormDatePicker,
  FormInput,
  FormPhoneNumber,
  FormSelect,
} from '@coop/shared/form';
import { Box, FormSection, GridItem, TextFields } from '@myra-ui';
import { getKymSection, isDeepEmpty, useTranslation } from '@coop/shared/utils';

import { getFieldOption } from '../../../utils/getFieldOption';

interface DynamicInputProps {
  fieldIndex: number;
  optionIndex: number;
  option: Partial<FormOption>;
}

interface IMemberKYMMainOccupationProps {
  setKymCurrentSection: (section?: { section: string; subSection: string }) => void;
}

export const MainOccupationInput = ({ option, optionIndex, fieldIndex }: DynamicInputProps) => {
  const { register } = useFormContext();

  useEffect(() => {
    register(`mainOccupation.${fieldIndex}.options.${optionIndex}.id`, {
      value: option.id,
    });
  }, []);

  return (
    <FormInputWithType
      formType={option?.field?.fieldType}
      name={`mainOccupation.${fieldIndex}.options.${optionIndex}.value`}
      label={String(option?.name?.local)}
    />
  );
};

interface IMainOccupationProps {
  setKymCurrentSection: (section?: { section: string; subSection: string }) => void;
}

const MainOccupation = ({ setKymCurrentSection }: IMainOccupationProps) => {
  const { t } = useTranslation();

  const [occupationId, setOccupationId] = useState<string>('');

  const methods = useForm();

  const { watch, reset } = methods;

  // const profession = watch('profession');

  const isOwner = watch(`isOwner`);

  const router = useRouter();

  const id = router?.query?.['id'];

  const { data: editValues, refetch } = useGetIndividualKymEditDataQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );

  const profession =
    editValues?.members?.individual?.formState?.data?.formData?.profession?.professionId ?? [];

  // console.log(
  //   'test',
  //   editValues?.members?.individual?.formState?.data?.formData?.profession
  // );

  const { data: occupationData } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.Occupation,
  });

  const { data: familyOccupationListData, refetch: refetchEdit } =
    useGetIndividualKymFamilyOccupationListQuery(
      {
        id: String(id),
        isSpouse: false,
      },
      { enabled: !!id }
    );

  useEffect(() => {
    if (familyOccupationListData) {
      const editValueData = familyOccupationListData?.members?.individual?.listOccupation?.data;

      if (editValueData?.length) {
        setOccupationId(editValueData[0]?.id as string);

        const occupationDetail = editValueData[0];

        if (occupationDetail) {
          reset({
            occupationId: occupationDetail?.occupationId,
            orgName: occupationDetail?.orgName?.local,
            panVatNo: occupationDetail?.panVatNo,
            address: occupationDetail?.address?.local,
            estimatedAnnualIncome: occupationDetail?.estimatedAnnualIncome,
            establishedDate: occupationDetail?.establishedDate,
            registrationNo: occupationDetail?.registrationNo,
            contact: occupationDetail?.contact,
            isOwner: occupationDetail?.isOwner,
          });
        }
      }
    }
  }, [familyOccupationListData]);

  // refetch data when calendar preference is updated
  const preference = useAppSelector((state: RootState) => state?.auth?.preference);

  useEffect(() => {
    if (id) {
      refetchEdit();
    }
  }, [preference?.date, id]);

  const { mutateAsync } = useSetMemberOccupationMutation({
    onSuccess: () => refetch(),
  });

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        const familyData = {
          ...pickBy(
            (familyOccupationListData?.members?.individual?.listOccupation?.data?.length &&
              familyOccupationListData?.members?.individual?.listOccupation?.data[0]) ??
              {},
            (v) => v !== null
          ),
        };

        if (id && occupationId && !isDeepEmpty(data) && !isEqual(data, familyData)) {
          mutateAsync({
            id: String(id),
            isSpouse: false,
            data: { id: occupationId, ...data },
          }).then(() => refetchEdit());
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady, familyOccupationListData]);

  const { mutate: newIDMutate } = useGetNewIdMutation({
    onSuccess: (res) => {
      setOccupationId(res.newId);
    },
  });

  useEffect(() => {
    if (
      !occupationId &&
      !familyOccupationListData?.members?.individual?.listOccupation?.data?.length
    ) {
      newIDMutate({});
    }
  }, [familyOccupationListData, occupationId]);

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSection(e.target.id);
          setKymCurrentSection(kymSection);
        }}
      >
        <FormSection header="Main Occupation">
          <FormSelect
            name="occupationId"
            label={t['kymIndOccupation']}
            options={
              (profession as string[])?.map((data: string) => ({
                label: String(
                  getFieldOption(occupationData)?.find((prev) => prev.value === data)?.label
                ),
                value: data,
              })) ?? []
            }
          />
          <GridItem colSpan={2}>
            <FormInput type="text" name="orgName" label={t['kymIndOrgFirmName']} />
          </GridItem>

          <FormInput type="number" name="panVatNo" label={t['kymIndPanVATNo']} />
          <FormInput type="text" name="address" label={t['kymIndAddress']} />
          <FormAmountInput name="estimatedAnnualIncome" label={t['kymIndEstimatedAnnualIncome']} />

          <GridItem colSpan={3} display="flex" gap="9px" alignItems="center">
            <FormCheckbox name="isOwner" />
            <TextFields variant="formLabel">{t['kymIndAreyouowner']}</TextFields>
          </GridItem>

          {isOwner && (
            <>
              <FormDatePicker name="establishedDate" label={t['kymIndEstablishedDate']} />
              <FormInput name="registrationNo" label={t['kymIndRegistrationNo']} />
              <FormPhoneNumber name="contact" label={t['kymIndContactNo']} />
            </>
          )}
        </FormSection>
      </form>
    </FormProvider>
  );
};

export const MemberKYMMainOccupation = ({
  setKymCurrentSection,
}: IMemberKYMMainOccupationProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const id = router?.query?.['id'];

  const methods = useForm<KymIndMemberInput>();

  const [isForeignEmp, setIsForeignEmp] = useState(false);

  const { watch, reset, control } = methods;

  const { data: editValues, refetch } = useGetIndividualKymEditDataQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );

  // const { data: occupationData } = useGetIndividualKymOptionsQuery({
  //   searchTerm: FormFieldSearchTerm.Occupation,
  // });

  // const professionId =
  //   editValues?.members?.individual?.formState?.data?.formData?.profession
  //     ?.professionId;

  // const foreignId = occupationData?.form?.options?.predefined?.data;

  // const foreignEmpEnable = professionId?.includes(foreignId[5]?.id);

  useEffect(() => {
    if (editValues) {
      const editValueData =
        editValues?.members?.individual?.formState?.data?.formData?.foreignEmployment;

      reset({ ...editValueData, isForeignEmployment: true });
      // if (foreignEmpEnable)
      //   reset({ ...editValueData, isForeignEmployment: true });
      // else {
      //   reset({ ...editValueData, isForeignEmployment: false });
      // }
    }
  }, [editValues]);

  const { mutate } = useSetMemberDataMutation();

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        if (id) {
          mutate(
            { id: String(id), data },
            {
              onSuccess: () => refetch(),
            }
          );
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

  const countryList = useGetConfigQuery()?.data?.config?.countries ?? [];
  const countryOptions = !isEmpty(countryList)
    ? countryList?.map((item) => ({
        label: item?.name ?? '',
        value: item?.code ?? '',
      }))
    : [];

  const visaTypes = [
    { label: 'Student', value: 'Student' },
    { label: 'Employement', value: 'Employement' },
    { label: 'Tourist', value: 'Tourist' },
  ];

  const { data: occupationData } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.Occupation,
  });

  const professionId = occupationData?.form?.options?.predefined?.data;
  const professionData =
    editValues?.members?.individual?.formState?.data?.formData?.profession?.professionId;

  useEffect(() => {
    refetch();
    if (professionId && professionData) {
      setIsForeignEmp(professionData.includes(professionId[5]?.id as string));
    }
  }, [editValues]);

  return (
    <Box id="kymAccIndMainProfession" scrollMarginTop="200px">
      <MainOccupation setKymCurrentSection={setKymCurrentSection} />

      {isForeignEmp && (
        <FormProvider {...methods}>
          <form
            onFocus={(e) => {
              const kymSection = getKymSection(e.target.id);
              setKymCurrentSection(kymSection);
            }}
          >
            <FormSection header="kymIndForeignEmploymentDetails">
              <FormSelect
                id="nameOfCountry"
                control={control}
                name="foreignEmpCountryId"
                label={t['kymIndNameofCountry']}
                options={countryOptions}
              />
              <FormSelect
                control={control}
                id="typeOfVisa"
                name="typeOfVisaId"
                label={t['kymIndTypeofVisa']}
                options={visaTypes}
              />
              <FormInput
                bg="white"
                control={control}
                type="number"
                textAlign="right"
                name="foreignEstimatedAnnualIncome"
                id="estimatedAnnualIncome"
                label={t['kymIndEstimatedAnnualIncome']}
                helperText={t['kymIndWriteStudentVISA']}
              />
            </FormSection>
          </form>
        </FormProvider>
      )}
    </Box>
  );
};
