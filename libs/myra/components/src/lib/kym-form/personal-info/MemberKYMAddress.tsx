import { useMemo } from 'react';
import { Control, UseFormWatch } from 'react-hook-form';
import { FaMap } from 'react-icons/fa';
import {
  KymIndMemberInput,
  useAllAdministrationQuery,
} from '@coop/myra/graphql';
import { Box, Button, Icon, Text } from '@coop/myra/ui';

import { GroupContainer, InputGroupContainer } from '../containers';
import { FormInput, FormSelect, FormSwitch } from '../../newFormComponents';

interface IMemberKYMAddress {
  control: Control<KymIndMemberInput | any>;
  watch: UseFormWatch<KymIndMemberInput | any>;
}

export const MemberKYMAddress = ({ control, watch }: IMemberKYMAddress) => {
  const { data } = useAllAdministrationQuery();

  const province = useMemo(() => {
    return (
      data?.administration?.all?.map((d) => ({
        label: d.name,
        value: d.id,
      })) ?? []
    );
  }, [data?.administration?.all]);

  // FOR PERMANENT ADDRESS
  const currentProvinceId = watch('permanentStateId');
  const currentDistrictId = watch('permanentDistrictId');

  const districtList = useMemo(
    () =>
      data?.administration.all.find((d) => d.id === currentProvinceId)
        ?.districts ?? [],
    [currentProvinceId]
  );

  const localityList = useMemo(
    () =>
      districtList.find((d) => d.id === currentDistrictId)?.municipalities ??
      [],
    [currentDistrictId]
  );

  // FOR TEMPORARY ADDRESS
  const currentTempProvinceId = watch('temporaryStateId');
  const currentTemptDistrictId = watch('temporaryDistrictId');

  const districtTempList = useMemo(
    () =>
      data?.administration.all.find((d) => d.id === currentProvinceId)
        ?.districts ?? [],
    [currentTempProvinceId]
  );

  const localityTempList = useMemo(
    () =>
      districtList.find((d) => d.id === currentDistrictId)?.municipalities ??
      [],
    [currentTemptDistrictId]
  );

  return (
    <GroupContainer>
      <Box
        id="Permanent Address"
        gap="s32"
        display={'flex'}
        flexDirection="column"
        scrollMarginTop={'200px'}
      >
        <Text fontSize="r1" fontWeight="SemiBold">
          PERMANENT ADDRESS
        </Text>
        <Box
          id="Permanent Address"
          gap="s32"
          display={'flex'}
          flexDirection="column"
        >
          <InputGroupContainer>
            <FormSelect
              control={control}
              name="permanentStateId"
              label="State"
              placeholder="Select State"
              options={province}
            />
            <FormSelect
              control={control}
              name="permanentDistrictId"
              label="District"
              placeholder="Select District"
              options={districtList.map((d) => ({
                label: d.name,
                value: d.id,
              }))}
            />
            <FormSelect
              control={control}
              name="permanentLocalityId"
              label="VDC / Municipality"
              placeholder="Select VDC / Municipality"
              options={localityList.map((d) => ({
                label: d.name,
                value: d.id,
              }))}
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
          </InputGroupContainer>

          <Button
            alignSelf="start"
            mt="-16px"
            leftIcon={<Icon size="md" as={FaMap} />}
          >
            Pin on Map
          </Button>
        </Box>
      </Box>

      <Box
        id="Temporary Address"
        gap="s32"
        display={'flex'}
        flexDirection="column"
        scrollMarginTop={'200px'}
      >
        <Text fontSize="r1" fontWeight="SemiBold">
          TEMPORARY ADDRESS
        </Text>

        <FormSwitch
          control={control}
          name="isPermanentAndTemporaryAddressSame"
          label="Temporary Address same as permanent"
        />

        <InputGroupContainer>
          <FormSelect
            control={control}
            name="temporaryStateId"
            label="State"
            placeholder="Select State"
            options={province}
          />
          <FormSelect
            control={control}
            name="temporaryDistrictId"
            label="District"
            placeholder="Select District"
            options={districtTempList.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />
          <FormSelect
            control={control}
            name="temporaryLocalityId"
            label="VDC / Muncipality"
            placeholder="Select VDC / Muncipality"
            options={localityTempList.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />
          <FormInput
            control={control}
            type="number"
            name="temporaryWardId"
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
        </InputGroupContainer>
        <Button
          mt="-16px"
          alignSelf="start"
          leftIcon={<Icon size="md" as={FaMap} />}
        >
          Pin on Map
        </Button>
      </Box>
      <Box
        id="Incase of residing in Rented House"
        gap="s32"
        display={'flex'}
        flexDirection="column"
        scrollMarginTop={'200px'}
      >
        <Text fontSize="r1" fontWeight="SemiBold">
          INCASE RESIDING IN RENTED HOUSE
        </Text>
        <InputGroupContainer>
          <FormInput
            control={control}
            type="text"
            name={'landlordName'}
            label="Landlord's Name"
            placeholder="Landlord's Name"
          />
          <FormInput
            control={control}
            type="text"
            name={'landlordContact'}
            label="Contact No"
            placeholder="Contact No"
          />
        </InputGroupContainer>
      </Box>
    </GroupContainer>
  );
};
