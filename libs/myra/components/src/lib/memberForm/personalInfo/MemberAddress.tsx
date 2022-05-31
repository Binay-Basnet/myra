import React from 'react';
import { FaMap } from 'react-icons/fa';
import { FormInput, FormSelect } from '@saccos/myra/components';
import { Box, Button, Grid, Icon, Switch, Text } from '@saccos/myra/ui';

export const MemberAddress = ({ control }) => {
  return (
    <>
      <Text fontSize="r1" fontWeight="SemiBold">
        PERMANENT ADDRESS
      </Text>
      <br />
      <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
        <FormSelect
          control={control}
          name="permananetStateId"
          label="State"
          placeholder="Select State"
          options={[
            { label: 'Bagmati', value: 'bagmati' },
            { label: 'Gandaki', value: 'gandaki' },
          ]}
        />
        <FormSelect
          control={control}
          name="permanantDistrictId"
          label="District"
          placeholder="Select District"
          options={[
            { label: 'Lalitpur', value: 'lalitpur' },
            { label: 'Kathmandu', value: 'kathmandu' },
          ]}
        />
        <FormSelect
          control={control}
          name="permanantLocalityId"
          label="VDC / Muncipality"
          placeholder="Select VDC / Muncipality"
          options={[
            { label: 'Lalitpur-16', value: 'lalitpur16' },
            { label: 'Kathmandu-5', value: 'kathmandu5' },
          ]}
        />
        <FormInput
          control={control}
          type="number"
          name="permanentWardId"
          label="Ward No"
          placeholder="Enter Ward No"
        />
        <FormInput
          control={control}
          type="text"
          name="permanentTole"
          label="Locality"
          placeholder="Enter Locality"
        />
      </Grid>
      <br />
      <Button leftIcon={<Icon size="md" as={FaMap} />} mt={2}>
        Pin on Map
      </Button>
      <br />
      <br />
      <Text fontSize="r1" fontWeight="SemiBold">
        TEMPORARY ADDRESS
      </Text>
      <br />
      <Box display="flex" flexDirection="row" alignItems="center">
        <Switch mr={5} onChange={(e) => console.log('event', e)} />
        <Text fontSize="r1">Temporary Address same as permanent</Text>
      </Box>
      <br />
      <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
        <FormSelect
          control={control}
          name="temporaryStateId"
          label="State"
          placeholder="Select State"
          options={[
            { label: 'Bagmati', value: 'bagmati' },
            { label: 'Gandaki', value: 'gandaki' },
          ]}
        />
        <FormSelect
          control={control}
          name="temporaryDistrictId"
          label="District"
          placeholder="Select District"
          options={[
            { label: 'Lalitpur', value: 'lalitpur' },
            { label: 'Kathmandu', value: 'kathmandu' },
          ]}
        />
        <FormSelect
          control={control}
          name="temporaryLocalityId"
          label="VDC / Muncipality"
          placeholder="Select VDC / Muncipality"
          options={[
            { label: 'Lalitpur-16', value: 'lalitpur16' },
            { label: 'Kathmandu-5', value: 'kathmandu5' },
          ]}
        />
        <FormInput
          control={control}
          type="number"
          name="teamporaryWardId"
          label="Ward No"
          placeholder="Enter Ward No"
        />
        <FormInput
          control={control}
          type="text"
          name="temporaryTole"
          label="Locality"
          placeholder="Enter Locality"
        />
      </Grid>
      <br />
      <Button leftIcon={<Icon size="md" as={FaMap} />} mt={2}>
        Pin on Map
      </Button>
      <br /> <br />
      <Text fontSize="r1" fontWeight="SemiBold">
        INCASE RESIDING IN RENTED HOUSE
      </Text>
      <br />
      <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
        <FormInput
          control={control}
          type="text"
          name="landlordsName"
          label="Landlords Name"
          placeholder="Landlords Name"
        />
        <FormInput
          control={control}
          type="text"
          name="landlordsContactNo"
          label="Contact No"
          placeholder="Contact No"
        />
      </Grid>
    </>
  );
};
