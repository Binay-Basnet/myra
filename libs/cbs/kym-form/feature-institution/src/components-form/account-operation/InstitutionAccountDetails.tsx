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
import { FormFileInput, FormInput, FormSelect } from '@coop/myra/components';
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
        <Box w="124px">
          <FormFileInput
            name={`accountOperatorsDetails.${index}.specimenSignature`}
            label="Specimen Signature"
          />
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
  } = useFieldArray({ name: 'sisterConcernDetails' });

  return (
    <GroupContainer id="Family Details" scrollMarginTop={'200px'}>
      <Text fontSize="r1" fontWeight="SemiBold">
        Details of AccountDetails concern
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
            New Operators
          </Button>
        </DynamicBoxGroupContainer>
      </div>
    </GroupContainer>
  );
};
