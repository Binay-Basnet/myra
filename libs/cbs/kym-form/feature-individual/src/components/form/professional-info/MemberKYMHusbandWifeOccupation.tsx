import { Fragment, useEffect, useState } from 'react';
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { CloseIcon } from '@chakra-ui/icons';
import debounce from 'lodash/debounce';

import { FormInputWithType } from '@coop/cbs/kym-form/formElements';
import {
  DynamicBoxGroupContainer,
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  Kym_Field_Custom_Id as KYMOptionEnum,
  KymIndMemberInput,
  KymOption,
  useDeleteMemberOccupationMutation,
  useGetIndividualKymEditDataQuery,
  useGetIndividualKymOptionsQuery,
  useGetNewIdMutation,
  useSetMemberOccupationMutation,
} from '@coop/shared/data-access';
import { FormCheckbox, FormInput, FormSelect } from '@coop/shared/form';
import { Box, Button, GridItem, Icon, Text, TextFields } from '@coop/shared/ui';
import { getKymSection, useTranslation } from '@coop/shared/utils';

import { getFieldOption } from '../../../utils/getFieldOption';

interface DynamicInputProps {
  fieldIndex: number;
  optionIndex: number;
  option: Partial<KymOption>;
}

interface IMemberKYMHusbandWifeOccupationProps {
  setKymCurrentSection: (section?: {
    section: string;
    subSection: string;
  }) => void;
}

export const SpouseOccupationInput = ({
  option,
  optionIndex,
  fieldIndex,
}: DynamicInputProps) => {
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
      placeholder={option?.name?.local}
    />
  );
};

const HusbandWifeOccupation = ({
  removeHusbandWifeOccupation,
  setKymCurrentSection,
  occupationId,
}: any) => {
  const methods = useForm();

  const { watch } = methods;
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
    filter: { customId: KYMOptionEnum.Occupation },
  });

  const { t } = useTranslation();

  // const occupationFieldNames =
  //   occupationData?.members.individual?.options.list?.data?.[0]?.options ?? [];

  const { mutate } = useSetMemberOccupationMutation();

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
            <CloseIcon
              cursor="pointer"
              onClick={() => {
                removeHusbandWifeOccupation(occupationId);
              }}
              color="gray.500"
              _hover={{
                color: 'gray.900',
              }}
              aria-label="close"
              alignSelf="flex-end"
            />

            <InputGroupContainer>
              <GridItem colSpan={1}>
                <FormSelect
                  name={`occupationId`}
                  label={t['kymIndOccupation']}
                  placeholder={t['kymIndSelectOccupation']}
                  options={
                    profession?.map((data: string) => ({
                      label: getFieldOption(occupationData)?.find(
                        (prev) => prev.value === data
                      )?.label,
                      value: data,
                    })) ?? []
                  }
                />
              </GridItem>
              <GridItem colSpan={2}>
                <FormInput
                  type="text"
                  name={`orgName`}
                  label={t['kymIndOrgFirmName']}
                  placeholder={t['kymIndOrgFirmName']}
                  bg="white"
                />
              </GridItem>
              <FormInput
                type="text"
                name={`panVatNo`}
                label={t['kymIndPanVATNo']}
                placeholder={t['kymIndPanVATNumber']}
                bg="white"
              />
              <FormInput
                type="text"
                name={`address`}
                label={t['kymIndAddress']}
                placeholder={t['kymIndEnterAddress']}
                bg="white"
              />
              <FormInput
                type="number"
                textAlign={'right'}
                name={`estimatedAnnualIncome`}
                label={t['kymIndEstimatedAnnualIncome']}
                bg="white"
                placeholder="0.00"
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
      </form>
    </FormProvider>
  );
};

export const MemberKYMHusbandWifeOccupation = ({
  setKymCurrentSection,
}: IMemberKYMHusbandWifeOccupationProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const id = String(router?.query?.['id']);

  const [occupationIds, setOccupationIds] = useState<string[]>([]);

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

  return (
    <GroupContainer
      id="kymAccIndMainOccupationofHusabandWife"
      scrollMarginTop={'200px'}
    >
      <Text fontSize="r1" fontWeight="SemiBold">
        {t['kymIndEnterMAINOCCUPATIONOFHUSBANDWIFE']}
      </Text>

      <DynamicBoxGroupContainer>
        {occupationIds.map((id) => {
          return (
            <Box key={id}>
              <HusbandWifeOccupation
                removeHusbandWifeOccupation={removeOccuapation}
                setKymCurrentSection={setKymCurrentSection}
                occupationId={id}
              />
            </Box>
          );
        })}

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
    </GroupContainer>
  );
};
