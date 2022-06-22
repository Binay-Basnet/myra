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
import { FormInput, FormSelect } from '@coop/shared/form';
// import { KymIndMemberInput } from '@coop/shared/data-access';
import { Box, Button, Grid, Icon, Text } from '@coop/shared/ui';

interface IAddSisterConcern {
  index: number;
  removeSister: () => void;
}

const AddSister = ({ index, removeSister }: IAddSisterConcern) => {
  return (
    <DynamicBoxContainer>
      <CloseIcon
        cursor="pointer"
        onClick={removeSister}
        color="gray.500"
        _hover={{
          color: 'gray.900',
        }}
        aria-label="close"
        alignSelf="flex-end"
      />
      <Grid templateColumns={'repeat(2, 1fr)'} gap="s20">
        <FormInput
          type="text"
          bg="white"
          name={`sisterConcernDetails.${index}.name`}
          label="Name of Sister Concern"
          placeholder="Enter Name of Sister Concern"
        />
        <FormInput
          type="text"
          bg="white"
          name={`sisterConcernDetails.${index}.natureOfBusiness`}
          label="Nature of Business"
          placeholder="Nature of Business"
        />
        <FormInput
          type="text"
          bg="white"
          name={`sisterConcernDetails.${index}.address`}
          label="Address"
          placeholder="Address"
        />
        <FormInput
          type="text"
          bg="white"
          name={`sisterConcernDetails.${index}.phoneNo`}
          label="Phone No."
          placeholder="Enter Phone Number"
        />
      </Grid>
    </DynamicBoxContainer>
  );
};

export const InstitutionKYMSisterConcernDetails = () => {
  const {
    fields: sisterFields,
    append: sisterAppend,
    remove: sisterRemove,
  } = useFieldArray({ name: 'sisterConcernDetails' });

  return (
    <GroupContainer id="Details of sister concern" scrollMarginTop={'200px'}>
      <Text fontSize="r1" fontWeight="SemiBold">
        Details of sister concern
      </Text>

      <div>
        <DynamicBoxGroupContainer>
          {sisterFields.map((item, index) => {
            return (
              <Box key={item.id}>
                <AddSister
                  index={index}
                  removeSister={() => sisterRemove(index)}
                />
              </Box>
            );
          })}
          <Button
            id="sisterConcernButton"
            alignSelf="start"
            leftIcon={<Icon size="md" as={AiOutlinePlus} />}
            variant="outline"
            onClick={() => {
              sisterAppend({});
            }}
          >
            New Detail
          </Button>
        </DynamicBoxGroupContainer>
      </div>
    </GroupContainer>
  );
};
