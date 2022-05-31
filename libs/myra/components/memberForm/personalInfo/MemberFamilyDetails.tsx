import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import {
  Text,
  Grid,
  Box,
  IconButton,
  Icon,
  Button,
  GridItem,
} from '../../../ui/src';
import { FormInput, FormSelect } from '../../newFormComponents';

const AddFamilyMember = ({ control, index, removeFamilyMember }) => {
  return (
    <Box
      p={4}
      display="flex"
      flexDirection="column"
      h={130}
      bg="gray.100"
      borderRadius={5}
    >
      <IconButton
        alignSelf="flex-end"
        variant="ghost"
        colorScheme="teal"
        aria-label="close"
        size="md"
        icon={<Icon size="md" as={AiOutlineClose} />}
        onClick={removeFamilyMember}
      />
      <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
        <GridItem colSpan={1}>
          <FormInput
            control={control}
            type="text"
            name={`familyMember[${index}].familyMemberRelation`}
            label="Relation"
            placeholder="Enter Relation"
          />
        </GridItem>
        <GridItem colSpan={2}>
          <FormInput
            control={control}
            type="text"
            name={`familyMember[${index}].familyMemberFullName`}
            label="FullName"
            placeholder="Enter Fullname"
          />
        </GridItem>
      </Grid>
    </Box>
  );
};

export const MemberFamilyDetails = ({ control }) => {
  const {
    fields: familyFields,
    append: familyAppend,
    remove: familyRemove,
  } = useFieldArray({ control, name: 'familyMember' });
  return (
    <>
      <Text fontSize="r1" fontWeight="SemiBold">
        FAMILY DETAILS
      </Text>
      <br />
      <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
        <FormSelect
          control={control}
          name="martialStatus"
          label="Martial Status"
          placeholder="Select Martial Status"
          options={[
            { value: 'married', label: 'Married' },
            { value: 'unmarried', label: 'Unmarried' },
          ]}
        />
      </Grid>
      <br />
      <Text fontSize="s3">Family members</Text>
      <Box p={2} boxShadow="xs" borderRadius={5}>
        {familyFields.map((item, index) => {
          return (
            <Box key={item.id} mb={2}>
              <AddFamilyMember
                control={control}
                index={index}
                removeFamilyMember={() => familyRemove(index)}
              />
            </Box>
          );
        })}
        <Button
          leftIcon={<Icon size="md" as={AiOutlinePlus} />}
          variant="outline"
          mt={2}
          onClick={() => {
            familyAppend({});
          }}
        >
          Add Family Member
        </Button>
      </Box>
    </>
  );
};
