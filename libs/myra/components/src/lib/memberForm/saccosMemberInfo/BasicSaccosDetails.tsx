import React from 'react';
import { Controller } from 'react-hook-form';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import { FormSelect } from '@saccos/myra/components';
import {
  Box,
  Button,
  Grid,
  GridItem,
  Icon,
  Input,
  Select,
  Text,
} from '@saccos/myra/ui';

export const BasicSaccosDetails = ({ control }) => {
  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
        <FormSelect
          control={control}
          name="purposeId"
          label="Main purpose of becoming a member"
          placeholder="Select purpose of becoming a member"
          options={[
            { label: 'Fun', value: 'fun' },
            { label: 'For Intrest', value: 'intrest' },
          ]}
        />
      </Grid>
      <br />
      <Text fontSize="s3">Membership Details</Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
        <GridItem colSpan={2}>
          <Controller
            control={control}
            name="nameAddressCooperative"
            render={({ field: { onChange } }) => (
              <Input
                type="text"
                placeholder="Name and Address Cooperative"
                onChange={onChange}
                bg="white"
              />
            )}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Controller
            control={control}
            name="memberNo"
            render={({ field: { onChange } }) => (
              <Input
                type="text"
                placeholder="Member No"
                onChange={onChange}
                bg="white"
              />
            )}
          />
        </GridItem>
      </Grid>
      <br />
      <Text fontSize="s3">Family member in this instituttion</Text>
      <Grid templateColumns="repeat(6, 1fr)" gap={'1em'}>
        <GridItem colSpan={1}>
          <Controller
            control={control}
            name="saccosMemberRelationship"
            render={({ field: { onChange } }) => (
              <Select
                onChange={onChange}
                placeholder="Relationship"
                options={[
                  { label: 'Mother', value: 'mother' },
                  { label: 'Father', value: 'father' },
                ]}
              />
            )}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Controller
            control={control}
            name="memberNo"
            render={({ field: { onChange } }) => (
              <Input
                type="text"
                placeholder="Member No"
                onChange={onChange}
                bg="white"
              />
            )}
          />
        </GridItem>
        <Button
          variant="outline"
          leftIcon={<Icon size="md" as={AiOutlineSearch} />}
        >
          Find Member
        </Button>
      </Grid>
      <Button
        leftIcon={<Icon size="md" as={AiOutlinePlus} />}
        variant="outline"
        mt={2}
      >
        Add Family Member
      </Button>
    </Box>
  );
};
