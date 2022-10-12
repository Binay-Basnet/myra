import { useEffect, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { CloseButton } from '@chakra-ui/react';
import debounce from 'lodash/debounce';

import {
  FormFieldSearchTerm,
  RootState,
  useAppSelector,
  useDeleteMemberOccupationMutation,
  useGetIndividualKymFamilyOccupationListQuery,
  useGetIndividualKymOptionsQuery,
  useGetNewIdMutation,
  useSetMemberOccupationMutation,
} from '@coop/cbs/data-access';
import { FormInputWithType } from '@coop/cbs/kym-form/formElements';
import { DynamicBoxGroupContainer, InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormCheckbox, FormDatePicker, FormInput, FormSelect } from '@coop/shared/form';
import { Box, Button, FormSection, GridItem, Icon, IconButton, TextFields } from '@coop/shared/ui';
import { getKymSection, useTranslation } from '@coop/shared/utils';

import { getFieldOption } from '../../../utils/getFieldOption';

interface DynamicInputProps {
  // fieldIndex: number;
  optionIndex: number;
  option: any;
}

export const SpouseOccupationInput = ({ option, optionIndex }: DynamicInputProps) => {
  const { register } = useFormContext();

  useEffect(() => {
    register(`options.${optionIndex}.id`, {
      value: option.id,
    });
    register(`options.${optionIndex}.value`, {
      value: '',
    });
  }, []);

  return (
    <FormInputWithType
      formType={option?.fieldType}
      name={`options.${optionIndex}.value`}
      label={option?.name?.local}
    />
  );
};

interface IHusbandWifeOccupationProps {
  removeHusbandWifeOccupation: (occupationId: string) => void;
  occupationId: string;
  setKymCurrentSection: (section?: { section: string; subSection: string }) => void;
}

const HusbandWifeOccupation = ({
  removeHusbandWifeOccupation,
  setKymCurrentSection,
  occupationId,
}: IHusbandWifeOccupationProps) => {
  const methods = useForm();

  const { watch, reset } = methods;
  // const profession = watch('profession');

  const isOwner = watch(`isOwner`);

  const router = useRouter();
  const id = String(router?.query?.['id']);

  // const { data: editValues } = useGetIndividualKymEditDataQuery({
  //   id,
  // });

  // const profession =
  //   editValues?.members?.individual?.formState?.data?.formData?.profession
  //     ?.professionId ?? [];

  const { data: occupationData } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.Occupation,
  });

  const { t } = useTranslation();

  // const occupationFieldNames =
  //   occupationData?.members.individual?.options.list?.data?.[0]?.options ?? [];

  const { data: familyOccupationListData, refetch } = useGetIndividualKymFamilyOccupationListQuery({
    id,
    isSpouse: true,
  });

  useEffect(() => {
    if (familyOccupationListData) {
      const editValueData = familyOccupationListData?.members?.individual?.listOccupation?.data;

      const occupationDetail = editValueData?.find((data) => data?.id === occupationId);

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

  // refetch data when calendar preference is updated
  const preference = useAppSelector((state: RootState) => state?.auth?.preference);

  useEffect(() => {
    refetch();
  }, [preference?.date]);

  const { mutate } = useSetMemberOccupationMutation({
    onSuccess: () => refetch(),
  });

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        mutate({
          id,
          isSpouse: true,
          data: { id: occupationId, ...data },
        });
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
        <Box
          display="flex"
          borderRadius="br2"
          flexDirection="column"
          gap="s16"
          p="s20"
          bg="background.500"
        >
          <Box display="flex" flexDirection="column">
            <Box display="flex" justifyContent="flex-end">
              <IconButton
                aria-label="close"
                variant="ghost"
                size="sm"
                icon={<CloseButton />}
                onClick={() => {
                  removeHusbandWifeOccupation(occupationId);
                }}
                id="removeSpouseOccupationButton"
              />
            </Box>

            <InputGroupContainer>
              <GridItem colSpan={1}>
                <FormSelect
                  name="occupationId"
                  id="spouseOccupationId"
                  label={t['kymIndOccupation']}
                  options={getFieldOption(occupationData)}
                />
              </GridItem>
              <GridItem colSpan={2}>
                <FormInput
                  type="text"
                  name="orgName"
                  id="spouseOrgName"
                  label={t['kymIndOrgFirmName']}
                  bg="white"
                />
              </GridItem>
              <FormInput
                type="number"
                name="panVatNo"
                id="spousePanVatNo"
                label={t['kymIndPanVATNo']}
                bg="white"
              />
              <FormInput
                type="text"
                name="address"
                id="spouseAddress"
                label={t['kymIndAddress']}
                bg="white"
              />
              <FormInput
                type="number"
                textAlign="right"
                id="spouseEstimatedAnnualIncome"
                name="estimatedAnnualIncome"
                label={t['kymIndEstimatedAnnualIncome']}
                bg="white"
              />
              {/* {occupationFieldNames.map((option, optionIndex) => {
                return (
                  <Fragment key={option.id}>
                    <SpouseOccupationInput
                      fieldIndex={fieldIndex}
                      option={option}
                      optionIndex={optionIndex}
                    />
                  </Fragment>
                );
              })} */}
            </InputGroupContainer>
          </Box>

          <Box display="flex" gap="9px" alignItems="center">
            {/* TODO! CHANGE THIS IS DISABLED AFTER BACKEND */}
            <FormCheckbox name="isOwner" id="spouseIsOwner" />
            <TextFields variant="formLabel">{t['kymIndAreyouowner']}</TextFields>
          </Box>

          {isOwner && (
            <InputGroupContainer>
              <FormDatePicker
                bg="white"
                id="spouseEstablishedDate"
                name="establishedDate"
                label={t['kymIndEstablishedDate']}
              />
              <FormInput
                bg="white"
                type="number"
                id="spouseRegistrationNo"
                name="registrationNo"
                label={t['kymIndRegistrationNo']}
              />
              <FormInput
                bg="white"
                type="number"
                id="spouseContact"
                name="contact"
                label={t['kymIndContactNo']}
              />
            </InputGroupContainer>
          )}
        </Box>
      </form>
    </FormProvider>
  );
};

interface IMemberKYMHusbandWifeOccupationProps {
  setKymCurrentSection: (section?: { section: string; subSection: string }) => void;
}

export const MemberKYMHusbandWifeOccupation = ({
  setKymCurrentSection,
}: IMemberKYMHusbandWifeOccupationProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const id = router?.query?.['id'];

  const [occupationIds, setOccupationIds] = useState<string[]>([]);

  const { data: editValues } = useGetIndividualKymFamilyOccupationListQuery(
    {
      id: String(id),
      isSpouse: true,
    },
    { enabled: !!id }
  );

  useEffect(() => {
    if (editValues) {
      const editValueData = editValues?.members?.individual?.listOccupation?.data;

      setOccupationIds(
        editValueData?.reduce(
          (prevVal, curVal) => (curVal ? [...prevVal, curVal.id] : [...prevVal]),
          [] as string[]
        ) ?? []
      );
    }
  }, [editValues]);

  const { mutate: newIDMutate } = useGetNewIdMutation({
    onSuccess: (res) => {
      setOccupationIds([...occupationIds, res.newId]);
    },
  });

  const { mutate: deleteMutate } = useDeleteMemberOccupationMutation({
    onSuccess: (res) => {
      const deletedId = String(res?.members?.individual?.occupation?.delete?.recordId);

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

  return (
    <FormSection
      templateColumns={1}
      id="kymAccIndMainOccupationofHusabandWife"
      header="kymIndEnterMAINOCCUPATIONOFHUSBANDWIFE"
    >
      <DynamicBoxGroupContainer>
        {occupationIds.map((item) => (
          <Box key={item}>
            <HusbandWifeOccupation
              removeHusbandWifeOccupation={removeOccuapation}
              setKymCurrentSection={setKymCurrentSection}
              occupationId={item}
            />
          </Box>
        ))}

        <Button
          id="spouseOccupationButton"
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
  );
};
