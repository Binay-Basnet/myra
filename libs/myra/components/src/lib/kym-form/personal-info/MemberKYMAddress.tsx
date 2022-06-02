import { FaMap } from 'react-icons/fa';
import { Box, Button, Icon, Switch, Text } from '@saccos/myra/ui';

import { GroupContainer, InputGroupContainer } from '../containers';
import { FormInput, FormSelect } from '../../newFormComponents';

export const MemberKYMAddress = ({ control }: any) => {
  return (
    <GroupContainer>
      <Text fontSize="r1" fontWeight="SemiBold">
        PERMANENT ADDRESS
      </Text>
      <InputGroupContainer>
        <FormSelect
          control={control}
          name="permanentAddress.state"
          label="State"
          placeholder="Select State"
          options={[
            { label: 'Bagmati', value: 'bagmati' },
            { label: 'Gandaki', value: 'gandaki' },
          ]}
        />
        <FormSelect
          control={control}
          name="permanentAddress.district"
          label="District"
          placeholder="Select District"
          options={[
            { label: 'Lalitpur', value: 'lalitpur' },
            { label: 'Kathmandu', value: 'kathmandu' },
          ]}
        />
        <FormSelect
          control={control}
          name="permanentAddress.vdc"
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
      </InputGroupContainer>

      <Button
        alignSelf="start"
        mt="-16px"
        leftIcon={<Icon size="md" as={FaMap} />}
      >
        Pin on Map
      </Button>

      <Text fontSize="r1" fontWeight="SemiBold">
        TEMPORARY ADDRESS
      </Text>
      <Box display="flex" flexDirection="row" alignItems="center" mb="-16px">
        <Switch mr={5} />
        <Text fontSize="r1">Temporary Address same as permanent</Text>
      </Box>
      <InputGroupContainer>
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
      </InputGroupContainer>
      <Button
        mt="-16px"
        alignSelf="start"
        leftIcon={<Icon size="md" as={FaMap} />}
      >
        Pin on Map
      </Button>
      <Text fontSize="r1" fontWeight="SemiBold">
        INCASE RESIDING IN RENTED HOUSE
      </Text>
      <InputGroupContainer>
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
      </InputGroupContainer>
    </GroupContainer>
  );
};
