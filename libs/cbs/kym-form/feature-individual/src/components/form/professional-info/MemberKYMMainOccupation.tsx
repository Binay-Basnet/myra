import { Fragment, useEffect, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { CloseIcon } from '@chakra-ui/icons';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';

import { FormInputWithType } from '@coop/cbs/kym-form/formElements';
import {
  DynamicBoxGroupContainer,
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  Kym_Field_Custom_Id,
  KymIndMemberInput,
  KymOption,
  useDeleteMemberOccupationMutation,
  useGetConfigQuery,
  useGetIndividualKymEditDataQuery,
  useGetIndividualKymFamilyOccupationListQuery,
  useGetIndividualKymOptionsQuery,
  useGetNewIdMutation,
  useSetMemberDataMutation,
  useSetMemberOccupationMutation,
} from '@coop/shared/data-access';
import {
  FormCheckbox,
  FormInput,
  FormSelect,
  FormSwitch,
} from '@coop/shared/form';
import {
  Box,
  Button,
  Grid,
  GridItem,
  Icon,
  Text,
  TextFields,
} from '@coop/shared/ui';
import { getKymSection, useTranslation } from '@coop/shared/utils';

import { getFieldOption } from '../../../utils/getFieldOption';

interface DynamicInputProps {
  fieldIndex: number;
  optionIndex: number;
  option: Partial<KymOption>;
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
      formType={option?.fieldType}
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

  const id = String(router?.query?.['id']);

  const { data: editValues } = useGetIndividualKymEditDataQuery({
    id,
  });

  const profession =
    editValues?.members?.individual?.formState?.data?.formData?.profession
      ?.professionId ?? [];

  const { data: occupationData } = useGetIndividualKymOptionsQuery({
    id,
    filter: {
      customId: Kym_Field_Custom_Id.Occupation,
    },
  });

  // const { data: occupationDetailsDefaultFields } =
  //   useGetIndividualKymOptionsQuery({
  //     id,
  //     filter: {
  //       customId: Kym_Field_Custom_Id.OccupationDetails,
  //     },
  //   });

  // const occupationFieldNames =
  //   occupationDetailsDefaultFields?.members.individual?.options.list?.data?.[0]
  //     ?.options ?? [];

  const { data: familyOccupationListData, refetch } =
    useGetIndividualKymFamilyOccupationListQuery({
      id: id,
      isSpouse: false,
    });

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

  const { mutate } = useSetMemberOccupationMutation({
    onSuccess: () => refetch(),
  });

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        mutate({ id, isSpouse: false, data: { id: occupationId, ...data } });
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

  return (
    <Box
      display="flex"
      borderRadius="br2"
      flexDirection="column"
      gap="s16"
      p="s20"
      bg="background.500"
    >
      <FormProvider {...methods}>
        <form
          onFocus={(e) => {
            const kymSection = getKymSection(e.target.id);
            setKymCurrentSection(kymSection);
          }}
        >
          <Box display="flex" gap="32px" flexDirection="column">
            <Box display="flex" flexDirection="column">
              <CloseIcon
                cursor="pointer"
                onClick={() => {
                  removeMainOccupation(occupationId);
                }}
                color="gray.500"
                _hover={{
                  color: 'gray.900',
                }}
                aria-label="close"
                alignSelf="flex-end"
                id="removeMainOccupationButton"
              />

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
                  type="text"
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
                {/*TODO! CHANGE THIS IS DISABLED AFTER BACKEND*/}
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

const visaTypes = [
  { label: 'Student', value: 'Student' },
  { label: 'Employement', value: 'Employement' },
  { label: 'Tourist', value: 'Tourist' },
];

export const MemberKYMMainOccupation = ({
  setKymCurrentSection,
}: IMemberKYMMainOccupationProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const id = String(router?.query?.['id']);

  const methods = useForm<KymIndMemberInput>();

  const { watch, control, reset } = methods;

  const isForeignEmployee = watch('isForeignEmployment');

  const countryList = useGetConfigQuery()?.data?.config?.countries ?? [];
  const countryOptions = !isEmpty(countryList)
    ? countryList?.map((item) => ({
        label: item?.name ?? '',
        value: item?.code ?? '',
      }))
    : [];

  const [occupationIds, setOccupationIds] = useState<string[]>([]);

  const { data: editValues } = useGetIndividualKymEditDataQuery({
    id: id,
  });

  useEffect(() => {
    if (editValues) {
      const editValueData =
        editValues?.members?.individual?.formState?.data?.formData
          ?.foreignEmployment;

      reset({ ...editValueData });
    }
  }, [editValues]);

  const { data: occupationListEditValues } =
    useGetIndividualKymFamilyOccupationListQuery({
      id: id,
      isSpouse: false,
    });

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
    deleteMutate({ memberId: id, id: occupationId });
  };

  const { mutate } = useSetMemberDataMutation();

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        mutate({ id, data });
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

  return (
    <GroupContainer id="kymAccIndMainProfession" scrollMarginTop={'200px'}>
      <Text fontSize="r1" fontWeight="SemiBold">
        {t['kymIndMAINOCCUPATION']}
      </Text>
      <DynamicBoxGroupContainer>
        {occupationIds.map((id) => {
          return (
            <Box key={id}>
              <MainOccupation
                removeMainOccupation={removeOccuapation}
                setKymCurrentSection={setKymCurrentSection}
                occupationId={id}
              />
            </Box>
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

      <FormProvider {...methods}>
        <form
          onFocus={(e) => {
            const kymSection = getKymSection(e.target.id);
            setKymCurrentSection(kymSection);
          }}
        >
          <Box display="flex" flexDirection="column" gap="s16">
            <Box display="flex" flexDirection="row">
              <FormSwitch
                control={control}
                id="isForeignEmployee"
                name="isForeignEmployment"
                label={t['kymIndEnableforForeignEmployment']}
              />
            </Box>

            {isForeignEmployee && (
              <Grid mb="s16" templateColumns="repeat(3, 1fr)" gap="s16">
                <GridItem>
                  <FormSelect
                    id="nameOfCountry"
                    control={control}
                    name="foreignEmpCountryId"
                    label={t['kymIndNameofCountry']}
                    placeholder={t['kymIndSelectCountry']}
                    options={countryOptions}
                  />
                </GridItem>
                <GridItem>
                  <FormSelect
                    control={control}
                    id="typeOfVisa"
                    name="typeOfVisaId"
                    label={t['kymIndTypeofVisa']}
                    placeholder={t['kymIndEnterTypeofVisa']}
                    options={visaTypes}
                  />
                </GridItem>
                <GridItem>
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
                </GridItem>
              </Grid>
            )}
          </Box>
        </form>
      </FormProvider>
    </GroupContainer>
  );
};
