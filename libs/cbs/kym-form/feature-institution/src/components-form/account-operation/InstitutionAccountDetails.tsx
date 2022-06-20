import React from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { CloseIcon } from '@chakra-ui/icons';
import {
  DynamicBoxContainer,
  DynamicBoxGroupContainer,
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormFileInput, FormInput, FormSelect } from '@coop/shared/form';
// import { KymIndMemberInput } from '@coop/shared/data-access';
import { Box, Button, Grid, Icon, Text } from '@coop/shared/ui';

interface IAddAccountDetailsConcern {
  index: number;
  removeAccountDetails: () => void;
}

const AddAccountDetails = ({
  index,
  removeAccountDetails,
}: IAddAccountDetailsConcern) => {
  return (
    <DynamicBoxContainer>
      <CloseIcon
        cursor="pointer"
        onClick={removeAccountDetails}
        color="gray.500"
        _hover={{
          color: 'gray.900',
        }}
        aria-label="close"
        alignSelf="flex-end"
      />
      <InputGroupContainer>
        <FormInput
          type="text"
          bg="white"
          name={`accountOperatorsDetails.${index}.fullName`}
          label="Full Name"
          placeholder="Enter Full Name"
        />
        <FormSelect
          name={`accountOperatorsDetails.${index}.designation`}
          label="Designation"
          placeholder="Select position"
          options={[
            { value: 'precident', label: 'President' },
            { value: 'viceprecident', label: 'Vice-President' },
            { value: 'secretary', label: 'Secretary' },
            { value: 'treasurer', label: 'Treasurer' },
          ]}
        />
        <Box display="flex" flexDirection={'column'} gap="s4">
          <Text fontSize={'s3'} fontWeight="500">
            Specimen Signature
          </Text>
          <Box w="124px" display="flex" flexDirection={'column'} gap="s4">
            <FormFileInput
              name={`accountOperatorsDetails.${index}.specimenSignature`}
            />
          </Box>
        </Box>
      </InputGroupContainer>
    </DynamicBoxContainer>
  );
};

export const InstitutionKYMAccountDetail = () => {
  const {
    fields: accountFields,
    append: accountAppend,
    remove: accountRemove,
  } = useFieldArray({ name: 'accountOperatorsDetails' });

  return (
    <GroupContainer id="Details of Account Operators" scrollMarginTop="200px">
      <Text fontSize="r1" fontWeight="SemiBold">
        Details of Account Operators
      </Text>

      <div>
        <DynamicBoxGroupContainer>
          {accountFields.map((item, index) => {
            return (
              <Box key={item.id}>
                <AddAccountDetails
                  index={index}
                  removeAccountDetails={() => accountRemove(index)}
                />
              </Box>
            );
          })}
          <Button
            alignSelf="start"
            leftIcon={<Icon size="md" as={AiOutlinePlus} />}
            variant="outline"
            onClick={() => {
              accountAppend({});
            }}
          >
            New Operator
          </Button>
        </DynamicBoxGroupContainer>
      </div>
    </GroupContainer>
  );
};
