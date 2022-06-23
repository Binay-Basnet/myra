import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { CloseIcon } from '@chakra-ui/icons';

import {
  DynamicBoxGroupContainer,
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { useGetIndividualKymOptionQuery } from '@coop/shared/data-access';
import { FormCheckbox, FormInput, FormSelect } from '@coop/shared/form';
import { Box, Button, GridItem, Icon, Text, TextFields } from '@coop/shared/ui';

import { getFieldOption } from '../../../utils/getFieldOption';

const HusbandWifeOccupation = ({
  control,
  index,
  removeHusbandWifeOccupation,
  watch,
}: any) => {
  const profession = watch('profession');

  const isOwner = watch(`spouseOccupation.${index}.isOwner`);

  const { data: occupationData } = useGetIndividualKymOptionQuery({
    fieldName: 'occupation',
  });

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
          <GridItem colSpan={1}>
            <FormSelect
              control={control}
              name={`spouseOccupation.${index}.occupation`}
              label="Occupation"
              placeholder="Select Occupation"
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
              control={control}
              type="text"
              name={`spouseOccupation.${index}.orgName`}
              label="Org/Firm Name"
              placeholder="Org/Firm Name"
              bg="white"
            />
          </GridItem>
          <FormInput
            control={control}
            type="text"
            name={`spouseOccupation.${index}.idNumber`}
            label="Pan / VAT No"
            placeholder="Pan/Vat Number"
            bg="white"
          />
          <FormInput
            control={control}
            type="text"
            name={`spouseOccupation.${index}.address`}
            label="Address"
            placeholder="Enter Address"
            bg="white"
          />
          <FormInput
            control={control}
            type="number"
            textAlign={'right'}
            name={`spouseOccupation.${index}.estimatedAnnualIncome`}
            label="Estimated Annual Income"
            bg="white"
            placeholder="0.00"
          />
        </InputGroupContainer>
      </Box>

      <Box display="flex" gap="9px" alignItems="center">
        <FormCheckbox name={`spouseOccupation.${index}.isOwner`} />
        <TextFields variant="formLabel">Are you owner?</TextFields>
      </Box>

      {isOwner && (
        <InputGroupContainer>
          <FormInput
            bg="white"
            control={control}
            type="date"
            name={`spouseOccupation.${index}.establishedDate`}
            label="Established Date"
            placeholder="Established Date"
          />
          <FormInput
            bg="white"
            control={control}
            type="number"
            name={`spouseOccupation.${index}.registrationNo`}
            label="Registration No."
            placeholder="Registration No."
          />
          <FormInput
            bg="white"
            control={control}
            type="number"
            name={`spouseOccupation.${index}.contactNo`}
            label="Contact No."
            placeholder="Contact No."
          />
        </InputGroupContainer>
      )}
    </Box>
  );
};

export const MemberKYMHusbandWifeOccupation = () => {
  const { control, watch } = useFormContext();

  const {
    fields: husbandWifeOccupationFields,
    append: husbandWifeOccupationAppend,
    remove: husbandWifeOccupationRemove,
  } = useFieldArray({ control, name: 'spouseOccupation' });

  return (
    <GroupContainer
      id="Main Occupation of Husaband/Wife"
      scrollMarginTop={'200px'}
    >
      <Text fontSize="r1" fontWeight="SemiBold">
        MAIN OCCUPATION OF HUSBAND/WIFE
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
          Add Occupation
        </Button>
      </DynamicBoxGroupContainer>
    </GroupContainer>
  );
};
