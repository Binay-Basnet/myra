import React, { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { CloseIcon } from '@chakra-ui/icons';

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

    return () => {
      unregister(`incomeSourceDetails.${fieldIndex}.options.${optionIndex}.id`);
      unregister(
        `incomeSourceDetails.${fieldIndex}.options.${optionIndex}.value`
      );
    };
  }, []);

  return (
    <FormInput
      type="text"
      name={`incomeSourceDetails.${fieldIndex}.options.${optionIndex}.value`}
      label={option.name.local}
      placeholder={option.name.local}
    />
  );
};

const IncomeSource = ({ index, removeIncomeSource }: any) => {
  const { data: familyIncomeData, isLoading: familyIncomeLoading } =
    useGetIndividualKymOptionsQuery({
      filter: { customId: KYMOptionEnum.IncomeSourceDetails },
    });
  return (
    <DynamicBoxContainer>
      <CloseIcon
        cursor="pointer"
        onClick={removeIncomeSource}
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

  console.log(incomeSourceFields, 'income');

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
