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
import { FormInput, FormSelect } from '@coop/myra/components';
// import { KymIndMemberInput } from '@coop/shared/data-access';
import { Box, Button, Grid, Icon, Text } from '@coop/shared/ui';

interface IAddDirector {
  index: number;
  removeDirector: () => void;
}

const AddDirector = ({ index, removeDirector }: IAddDirector) => {
  return (
    <DynamicBoxContainer>
      <CloseIcon
        cursor="pointer"
        onClick={removeDirector}
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
          name={`detailsOfDirectorsWithAffiliation.${index}.nameOfDirector`}
          label="Name of Director"
          placeholder="Enter Name of Director"
        />
        <FormInput
          type="text"
          bg="white"
          name={`detailsOfDirectorsWithAffiliation.${index}.nameOfInstitution`}
          label="Name of Institution"
          placeholder="Enter Name of Institution"
        />
      </Grid>
      <InputGroupContainer mt="s16">
        <FormInput
          type="text"
          bg="white"
          name={`detailsOfDirectorsWithAffiliation.${index}.addressOfInstitution`}
          label="Address of Institution"
          placeholder="Enter Address of Institution"
        />
        <FormInput
          type="text"
          bg="white"
          name={`detailsOfDirectorsWithAffiliation.${index}.designation`}
          label="Designation"
          placeholder="Enter Designation"
        />
        <FormInput
          type="number"
          textAlign={'right'}
          bg="white"
          name={`detailsOfDirectorsWithAffiliation.${index}.yearlyIncome`}
          label="Yearly Income"
          placeholder="0.00"
        />
      </InputGroupContainer>
    </DynamicBoxContainer>
  );
};

export const InstitutionKYMDirectorWithAffiliation = () => {
  const {
    fields: directorFields,
    append: directorAppend,
    remove: directorRemove,
  } = useFieldArray({ name: 'detailsOfDirectorsWithAffiliation' });

  return (
    <GroupContainer
      id="Details of directors affiliated with other Firms"
      scrollMarginTop={'200px'}
    >
      <Text fontSize="r1" fontWeight="SemiBold">
        Details of directors affiliated with other Firms
      </Text>

      <div>
        <DynamicBoxGroupContainer>
          {directorFields.map((item, index) => {
            return (
              <Box key={item.id}>
                <AddDirector
                  index={index}
                  removeDirector={() => directorRemove(index)}
                />
              </Box>
            );
          })}
          <Button
            alignSelf="start"
            leftIcon={<Icon size="md" as={AiOutlinePlus} />}
            variant="outline"
            onClick={() => {
              directorAppend({});
            }}
          >
            New Detail
          </Button>
        </DynamicBoxGroupContainer>
      </div>
    </GroupContainer>
  );
};
