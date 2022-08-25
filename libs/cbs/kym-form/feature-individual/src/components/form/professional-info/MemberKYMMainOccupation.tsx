import { useEffect, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { CloseButton } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import debounce from 'lodash/debounce';

import {
  FormFieldSearchTerm,
  FormOption,
  KymIndMemberInput,
  useDeleteMemberOccupationMutation,
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
  DynamicBoxGroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormCheckbox, FormInput, FormSelect } from '@coop/shared/form';
import {
  Box,
  Button,
  FormSection,
  GridItem,
  Icon,
  IconButton,
  TextFields,
} from '@coop/shared/ui';
import { getKymSection, useTranslation } from '@coop/shared/utils';

import { getFieldOption } from '../../../utils/getFieldOption';

interface DynamicInputProps {
  fieldIndex: number;
  optionIndex: number;
  option: Partial<FormOption>;
}

interface IMemberKYMMainOccupationProps {
  setKymCurrentSection: (section?: {
    section: string;
    subSection: string;
  }) => void;
}

export const MainOccupationInput = ({
  option,
  optionIndex,
  fieldIndex,
}: DynamicInputProps) => {
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
      placeholder={String(option?.name?.local)}
    />
  );
};

interface IMainOccupationProps {
  removeMainOccupation: (occupationId: string) => void;
  setKymCurrentSection: (section?: {
    section: string;
    subSection: string;
  }) => void;
  occupationId: string;
}

const MainOccupation = ({
  removeMainOccupation,
  setKymCurrentSection,
  occupationId,
}: IMainOccupationProps) => {
  const { t } = useTranslation();

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
    editValues?.members?.individual?.formState?.data?.formData?.profession
      ?.professionId ?? [];

  // console.log(
  //   'test',
  //   editValues?.members?.individual?.formState?.data?.formData?.profession
  // );

  const { data: occupationData } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.Occupation,
  });

  const { data: familyOccupationListData } =
    useGetIndividualKymFamilyOccupationListQuery(
      {
        id: String(id),
        isSpouse: false,
      },
      { enabled: !!id }
    );

  useEffect(() => {
    if (familyOccupationListData) {
      const editValueData =
        familyOccupationListData?.members?.individual?.listOccupation?.data;

      const occupationDetail = editValueData?.find(
        (data) => data?.id === occupationId
      );

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
  }, [familyOccupationListData]);

  const { mutateAsync } = useSetMemberOccupationMutation({
    onSuccess: () => refetch(),
  });

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        if (id) {
          mutateAsync({
            id: String(id),
            isSpouse: false,
            data: { id: occupationId, ...data },
          }).then(() => refetch());
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

  return (
    <Box
      p="s20"
      display="flex"
      borderRadius="br2"
      flexDirection="column"
      gap="s16"
      bg="background.500"
    >
      <FormProvider {...methods}>
        <form
          onFocus={(e) => {
            const kymSection = getKymSection(e.target.id);
            setKymCurrentSection(kymSection);
          }}
        >
          <Box display="flex" gap="16px" flexDirection="column">
            <Box display="flex" flexDirection="column">
              <Box display="flex" justifyContent="flex-end">
                <IconButton
                  aria-label="close"
                  variant="ghost"
                  size="sm"
                  icon={<CloseButton />}
                  onClick={() => {
                    removeMainOccupation(occupationId);
                  }}
                  id="removeMainOccupationButton"
                />
              </Box>

              <InputGroupContainer>
                <GridItem colSpan={1}>
                  <FormSelect
                    name={`occupationId`}
                    label={t['kymIndOccupation']}
                    placeholder={t['kymIndSelectOccupation']}
                    options={
                      (profession as string[])?.map((data: string) => ({
                        label: String(
                          getFieldOption(occupationData)?.find(
                            (prev) => prev.value === data
                          )?.label
                        ),
                        value: data,
                      })) ?? []
                    }
                  />
                </GridItem>
                <GridItem colSpan={2}>
                  <FormInput
                    bg="white"
                    type="text"
                    name={`orgName`}
                    label={t['kymIndOrgFirmName']}
                    placeholder={t['kymIndOrgFirmName']}
                  />
                </GridItem>

                <FormInput
                  bg="white"
                  type="number"
                  name={`panVatNo`}
                  label={t['kymIndPanVATNo']}
                  placeholder={t['kymIndPanVATNumber']}
                />
                <FormInput
                  type="text"
                  bg="white"
                  name={`address`}
                  label={t['kymIndAddress']}
                  placeholder={t['kymIndEnterAddress']}
                />
                <FormInput
                  bg="white"
                  type="number"
                  textAlign={'right'}
                  name={`estimatedAnnualIncome`}
                  label={t['kymIndEstimatedAnnualIncome']}
                  placeholder="0.00"
                />

                {/* {occupationFieldNames.map((option, optionIndex) => {
                return (
                  <Fragment key={option.id}>
                    <MainOccupationInput
                      fieldIndex={fieldIndex}
                      option={option}
                      optionIndex={optionIndex}
                    />
                  </Fragment>
                );
              })} */}
              </InputGroupContainer>
            </Box>

            <Box display="flex" gap="16px" flexDirection="column">
              <Box display="flex" gap="9px" alignItems="center">
                {/* TODO! CHANGE THIS IS DISABLED AFTER BACKEND*/}
                <FormCheckbox name={`isOwner`} />
                <TextFields variant="formLabel">
                  {t['kymIndAreyouowner']}
                </TextFields>
              </Box>

              {isOwner && (
                <InputGroupContainer>
                  <FormInput
                    bg="white"
                    type="date"
                    name={`establishedDate`}
                    label={t['kymIndEstablishedDate']}
                    placeholder={t['kymIndEstablishedDate']}
                  />
                  <FormInput
                    bg="white"
                    type="number"
                    name={`registrationNo`}
                    label={t['kymIndRegistrationNo']}
                    placeholder={t['kymIndRegistrationNo']}
                  />
                  <FormInput
                    bg="white"
                    type="number"
                    name={`contact`}
                    label={t['kymIndContactNo']}
                    placeholder={t['kymIndContactNo']}
                  />
                </InputGroupContainer>
              )}
            </Box>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};

export const MemberKYMMainOccupation = ({
  setKymCurrentSection,
}: IMemberKYMMainOccupationProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const id = router?.query?.['id'];

  const methods = useForm<KymIndMemberInput>();

  const { watch, reset, control } = methods;

  const [occupationIds, setOccupationIds] = useState<string[]>([]);

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
        editValues?.members?.individual?.formState?.data?.formData
          ?.foreignEmployment;

      reset({ ...editValueData, isForeignEmployment: true });
      // if (foreignEmpEnable)
      //   reset({ ...editValueData, isForeignEmployment: true });
      // else {
      //   reset({ ...editValueData, isForeignEmployment: false });
      // }
    }
  }, [editValues]);

  const { data: occupationListEditValues } =
    useGetIndividualKymFamilyOccupationListQuery(
      {
        id: String(id),
        isSpouse: false,
      },
      { enabled: !!id }
    );

  useEffect(() => {
    if (occupationListEditValues) {
      const editValueData =
        occupationListEditValues?.members?.individual?.listOccupation?.data;

      setOccupationIds(
        editValueData?.reduce(
          (prevVal, curVal) => (curVal ? [...prevVal, curVal.id] : prevVal),
          [] as string[]
        ) ?? []
      );
    }
  }, [occupationListEditValues]);

  const { mutate: newIDMutate } = useGetNewIdMutation({
    onSuccess: (res) => {
      setOccupationIds([...occupationIds, res.newId]);
    },
  });

  const { mutate: deleteMutate } = useDeleteMemberOccupationMutation({
    onSuccess: (res) => {
      const deletedId = String(
        res?.members?.individual?.occupation?.delete?.recordId
      );

      const tempOccupationIds = [...occupationIds];

      tempOccupationIds.splice(tempOccupationIds.indexOf(deletedId), 1);

      setOccupationIds([...tempOccupationIds]);
    },
  });

  const appendOccupation = () => {
    newIDMutate({});
  };

  const removeOccuapation = (occupationId: string) => {
    deleteMutate({ memberId: String(id), id: occupationId });
  };

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

  return (
    <Box id="kymAccIndMainProfession" scrollMarginTop={'200px'}>
      <FormSection
        gridLayout={true}
        templateColumns={1}
        header="kymIndMAINOCCUPATION"
      >
        <DynamicBoxGroupContainer>
          {occupationIds.map((id) => {
            return (
              <MainOccupation
                key={id}
                removeMainOccupation={removeOccuapation}
                setKymCurrentSection={setKymCurrentSection}
                occupationId={id}
              />
            );
          })}

          <Button
            id="mainOccupationButton"
            alignSelf="start"
            leftIcon={<Icon size="md" as={AiOutlinePlus} />}
            variant="outline"
            onClick={() => {
              appendOccupation();
            }}
          >
            {t['kymIndAddOccupation']}
          </Button>
        </DynamicBoxGroupContainer>
      </FormSection>

      <FormProvider {...methods}>
        <form
          onFocus={(e) => {
            const kymSection = getKymSection(e.target.id);
            setKymCurrentSection(kymSection);
          }}
        >
          <FormSection
            gridLayout={true}
            header="kymIndForeignEmploymentDetails"
          >
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
          </FormSection>
        </form>
      </FormProvider>
    </Box>
  );
};
