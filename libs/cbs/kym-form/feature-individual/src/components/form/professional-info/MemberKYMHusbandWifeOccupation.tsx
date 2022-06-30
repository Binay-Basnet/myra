import React, { Fragment, useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { CloseIcon } from '@chakra-ui/icons';

import {
  DynamicBoxGroupContainer,
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  Kym_Field_Custom_Id as KYMOptionEnum,
  KymOption,
  useGetIndividualKymOptionsQuery,
} from '@coop/shared/data-access';
import { FormCheckbox, FormInput } from '@coop/shared/form';
import { Box, Button, Icon, Text, TextFields } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

interface DynamicInputProps {
  fieldIndex: number;
  optionIndex: number;
  option: Partial<KymOption>;
}

export const SpouseOccupationInput = ({
  option,
  optionIndex,
  fieldIndex,
}: DynamicInputProps) => {
  const { register, unregister } = useFormContext();

  useEffect(() => {
    register(`spouseOccupation.${fieldIndex}.options.${optionIndex}.id`, {
      value: option.id,
    });
    register(`spouseOccupation.${fieldIndex}.options.${optionIndex}.value`, {
      value: '',
    });

    return () => {
      unregister(`spouseOccupation.${fieldIndex}.options.${optionIndex}.id`);
      unregister(`spouseOccupation.${fieldIndex}.options.${optionIndex}.value`);
    };
  }, []);

  return (
    <FormInput
      type="text"
      name={`spouseOccupation.${fieldIndex}.options.${optionIndex}.value`}
      label={option?.name?.local}
      placeholder={option?.name?.local}
    />
  );
};

const HusbandWifeOccupation = ({
  control,
  index: fieldIndex,
  removeHusbandWifeOccupation,
  watch,
}: any) => {
  // const profession = watch('profession');

  const isOwner = watch(`spouseOccupation.${fieldIndex}.isOwner`);

  const { data: occupationData } = useGetIndividualKymOptionsQuery({
    filter: { customId: KYMOptionEnum.OccupationDetails },
  });
  const { t } = useTranslation();

  const occupationFieldNames =
    occupationData?.members.individual?.options.list?.data?.[0]?.options ?? [];

  return (
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
          onClick={removeHusbandWifeOccupation}
          color="gray.500"
          _hover={{
            color: 'gray.900',
          }}
          aria-label="close"
          alignSelf="flex-end"
        />

        <InputGroupContainer>
          {occupationFieldNames.map((option, optionIndex) => {
            return (
              <Fragment key={option.id}>
                <SpouseOccupationInput
                  fieldIndex={fieldIndex}
                  option={option}
                  optionIndex={optionIndex}
                />
              </Fragment>
            );
          })}
        </InputGroupContainer>
      </Box>

      <Box display="flex" gap="9px" alignItems="center">
        {/*TODO! CHANGE THIS IS DISABLED AFTER BACKEND*/}
        <FormCheckbox
          isDisabled={true}
          name={`spouseOccupation.${fieldIndex}.isOwner`}
        />
        <TextFields variant="formLabel">{t['kymIndAreyouowner']}</TextFields>
      </Box>

      {isOwner && (
        <InputGroupContainer>
          <FormInput
            bg="white"
            control={control}
            type="date"
            name={`spouseOccupation.${fieldIndex}.establishedDate`}
            label={t['kymIndEstablishedDate']}
            placeholder={t['kymIndEstablishedDate']}
          />
          <FormInput
            bg="white"
            control={control}
            type="number"
            name={`spouseOccupation.${fieldIndex}.registrationNo`}
            label={t['kymIndRegistrationNo']}
            placeholder={t['kymIndRegistrationNo']}
          />
          <FormInput
            bg="white"
            control={control}
            type="number"
            name={`spouseOccupation.${fieldIndex}.contactNo`}
            label={t['kymIndContactNo']}
            placeholder={t['kymIndContactNo']}
          />
        </InputGroupContainer>
      )}
    </Box>
  );
};

export const MemberKYMHusbandWifeOccupation = () => {
  const { t } = useTranslation();
  const { control, watch } = useFormContext();

  const {
    fields: husbandWifeOccupationFields,
    append: husbandWifeOccupationAppend,
    remove: husbandWifeOccupationRemove,
  } = useFieldArray({ control, name: 'spouseOccupation' });

  return (
    <GroupContainer
      id="kymAccIndMainOccupationofHusabandWife"
      scrollMarginTop={'200px'}
    >
      <Text fontSize="r1" fontWeight="SemiBold">
        {t['kymIndEnterMAINOCCUPATIONOFHUSBANDWIFE']}
      </Text>

      <DynamicBoxGroupContainer>
        {husbandWifeOccupationFields.map((item, index) => {
          return (
            <Box key={item.id}>
              <HusbandWifeOccupation
                control={control}
                index={index}
                watch={watch}
                removeHusbandWifeOccupation={() =>
                  husbandWifeOccupationRemove(index)
                }
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
            husbandWifeOccupationAppend({});
          }}
        >
          {t['kymIndAddOccupation']}
        </Button>
      </DynamicBoxGroupContainer>
    </GroupContainer>
  );
};
