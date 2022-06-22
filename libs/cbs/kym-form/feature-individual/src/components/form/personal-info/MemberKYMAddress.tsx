import { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FaMap } from 'react-icons/fa';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { useAllAdministrationQuery } from '@coop/shared/data-access';
import { FormInput, FormSelect, FormSwitch } from '@coop/shared/form';
import { Box, Button, Icon, Text } from '@coop/shared/ui';

export const MemberKYMAddress = () => {
  const { control, watch } = useFormContext();

  const isPermanentAndTemporaryAddressSame = watch(
    'isPermanentAndTemporaryAddressSame'
  );
  const { data } = useAllAdministrationQuery();
  const [temporaryAddress, setTemporaryAddress] = useState(false);

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
              name="permanentStateId"
              label="Province"
              placeholder="Select Province"
              options={province}
            />
            <FormSelect
              name="permanentDistrictId"
              label="District"
              placeholder="Select District"
              options={districtList.map((d) => ({
                label: d.name,
                value: d.id,
              }))}
            />
            <FormSelect
              name="permanentLocalityId"
              label="Local Government"
              placeholder="Select Local Government"
              options={localityList.map((d) => ({
                label: d.name,
                value: d.id,
              }))}
            />
            <FormInput
              type="number"
              name="permanentWardId"
              label="Ward No"
              placeholder="Enter Ward No"
            />
            <FormInput
              type="text"
              name="permanentTole"
              label="Locality"
              placeholder="Enter Locality"
            />
            <FormInput
              type="text"
              name="permanentHouseNo"
              label="House No"
              placeholder="Enter House No"
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
          name="isPermanentAndTemporaryAddressSame"
          label="Temporary Address same as permanent"
        />

        {!isPermanentAndTemporaryAddressSame && (
          <>
            <InputGroupContainer>
              <FormSelect
                name="temporaryStateId"
                label="Province"
                placeholder="Select Province"
                options={province}
              />
              <FormSelect
                name="temporaryDistrictId"
                label="District"
                placeholder="Select District"
                options={districtTempList.map((d) => ({
                  label: d.name,
                  value: d.id,
                }))}
              />
              <FormSelect
                name="temporaryLocalityId"
                label="Local Government"
                placeholder="Select Local Government"
                options={localityTempList.map((d) => ({
                  label: d.name,
                  value: d.id,
                }))}
              />
              <FormInput
                type="number"
                name="temporaryWardId"
                label="Ward No"
                placeholder="Enter Ward No"
              />
              <FormInput
                type="text"
                name="temporaryTole"
                label="Locality"
                placeholder="Enter Locality"
              />
              <FormInput
                type="text"
                name="temporaryHouseNo"
                label="House No"
                placeholder="Enter House No"
              />
            </InputGroupContainer>
            <Button
              mt="-16px"
              alignSelf="start"
              leftIcon={<Icon size="md" as={FaMap} />}
            >
              Pin on Map
            </Button>
          </>
        )}
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
            type="text"
            name={'landlordName'}
            label="Landlord's Name"
            placeholder="Landlord's Name"
          />
          <FormInput
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
