import React, { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { CloseIcon } from '@chakra-ui/icons';

import { FormInputWithType } from '@coop/cbs/kym-form/formElements';
import {
  DynamicBoxContainer,
  DynamicBoxGroupContainer,
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  Kym_Field_Custom_Id as KYMOptionEnum,
  useGetIndividualKymOptionsQuery,
} from '@coop/shared/data-access';
import { FormInput, FormRadioGroup } from '@coop/shared/form';
import { Box, Button, Icon, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { getFieldOption } from '../../../utils/getFieldOption';

const IncomeSourceInput = ({ option, fieldIndex, optionIndex }: any) => {
  const { register, unregister } = useFormContext();

  useEffect(() => {
    register(`incomeSourceDetails.${fieldIndex}.options.${optionIndex}.id`, {
      value: option.id,
    });
    register(`incomeSourceDetails.${fieldIndex}.options.${optionIndex}.value`, {
      value: '',
    });
  }, []);

  return (
    <FormInputWithType
      formType={option?.fieldType}
      name={`incomeSourceDetails.${fieldIndex}.options.${optionIndex}.value`}
      label={String(option?.name?.local)}
      placeholder={String(option?.name?.local)}
    />
  );
};

const IncomeSource = ({ index, removeIncomeSource }: any) => {
  const { data: familyIncomeData, isLoading: familyIncomeLoading } =
    useGetIndividualKymOptionsQuery({
      filter: { customId: KYMOptionEnum.IncomeSourceDetails },
    });

  const { unregister } = useFormContext();

  return (
    <DynamicBoxContainer>
      <CloseIcon
        cursor="pointer"
        onClick={() => {
          removeIncomeSource();
          unregister(`incomeSourceDetails.${index}`);
        }}
        color="gray.500"
        _hover={{
          color: 'gray.900',
        }}
        aria-label="close"
        alignSelf="flex-end"
      />

      <InputGroupContainer>
        {familyIncomeData?.members?.individual?.options?.list?.data?.[0]?.options?.map(
          (option, optionIndex) => (
            <IncomeSourceInput
              key={optionIndex}
              fieldIndex={index}
              option={option}
              optionIndex={optionIndex}
            />
          )
        )}
      </InputGroupContainer>
    </DynamicBoxContainer>
  );
};

export const MemberKYMIncomeSourceDetails = () => {
  const { t } = useTranslation();
  const { data: familyIncomeData, isLoading: familyIncomeLoading } =
    useGetIndividualKymOptionsQuery({
      filter: { customId: KYMOptionEnum.FamilyIncomeSource },
    });

  const { control } = useFormContext();

  const {
    fields: incomeSourceFields,
    append: incomeSourceAppend,
    remove: incomeSourceRemove,
  } = useFieldArray({ control, name: 'incomeSourceDetails' });

  return (
    <GroupContainer id="kymAccIndIncomeSourceDetails" scrollMarginTop={'200px'}>
      <Text fontSize="r1" fontWeight="SemiBold">
        {t['kymIndINCOMESOURCEDETAILS']}
      </Text>
      <GroupContainer>
        <Box display="flex" flexDirection="column">
          <FormRadioGroup
            id="annualIncomeSourceId"
            name="annualIncomeSourceId"
            label={t['kynIndAnnualFamilyIncome']}
            options={getFieldOption(familyIncomeData)}
          />
        </Box>
        <div>
          <Text fontSize="s3" mb="s4">
            {t['kynIndIncomegreater']}
          </Text>
          <DynamicBoxGroupContainer>
            {incomeSourceFields.map((item, index) => {
              return (
                <Box key={item.id}>
                  <IncomeSource
                    control={control}
                    removeIncomeSource={() => incomeSourceRemove(index)}
                    index={index}
                  />
                </Box>
              );
            })}
            <Button
              id="incomeSourceDetailsButton"
              alignSelf="start"
              leftIcon={<Icon size="md" as={AiOutlinePlus} />}
              variant="outline"
              onClick={() => incomeSourceAppend({})}
            >
              {t['kynIndNewEntry']}
            </Button>
          </DynamicBoxGroupContainer>
        </div>
      </GroupContainer>
    </GroupContainer>
  );
};
