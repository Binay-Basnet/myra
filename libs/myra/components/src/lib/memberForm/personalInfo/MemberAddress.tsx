import React from 'react';
import { FaMap } from 'react-icons/fa';
import { Box, Button, Grid, Icon, Switch, Text } from '@saccos/myra/ui';

import { FormInput, FormSelect } from '../../newFormComponents';

export const MemberAddress = ({ control }: any) => {
  return (
    <>
      <Text fontSize="r1" fontWeight="SemiBold">
        PERMANENT ADDRESS
      </Text>
      <br />
      <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
        <FormSelect
          control={control}
          name="permananetAddressState"
          label="State"
          placeholder="Select State"
          options={[
            { label: 'Bagmati', value: 'bagmati' },
            { label: 'Gandaki', value: 'gandaki' },
          ]}
        />
        <FormSelect
          control={control}
          name="permanantAddressDistrict"
          label="District"
          placeholder="Select District"
          options={[
            { label: 'Lalitpur', value: 'lalitpur' },
            { label: 'Kathmandu', value: 'kathmandu' },
          ]}
        />
        <FormSelect
          control={control}
          name="permanantAddressVdc"
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
          name="temporaryWardNo"
          label="Ward No"
          placeholder="Enter Ward No"
        />
        <FormInput
          control={control}
          type="text"
          name="temporaryLocality"
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
        <Switch mr={5} />
        <Text fontSize="r1">Temporary Address same as permanent</Text>
      </Box>
      <br />
      <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
        <FormSelect
          control={control}
          name="temporaryAddressState"
          label="State"
          placeholder="Select State"
          options={[
            { label: 'Bagmati', value: 'bagmati' },
            { label: 'Gandaki', value: 'gandaki' },
          ]}
        />
        <FormSelect
          control={control}
          name="temporaryAddressDistrict"
          label="District"
          placeholder="Select District"
          options={[
            { label: 'Lalitpur', value: 'lalitpur' },
            { label: 'Kathmandu', value: 'kathmandu' },
          ]}
        />
        <FormSelect
          control={control}
          name="temporaryAddressVdc"
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
          name="teamporaryAddressWardNo"
          label="Ward No"
          placeholder="Enter Ward No"
        />
        <FormInput
          control={control}
          type="text"
          name="temporaryAddressLocality"
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
