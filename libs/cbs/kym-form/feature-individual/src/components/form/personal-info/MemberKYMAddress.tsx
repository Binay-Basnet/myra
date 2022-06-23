import { useMemo, useState } from 'react';
import { Control, UseFormWatch } from 'react-hook-form';
import { FaMap } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import dynamic from 'next/dynamic';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  KymIndMemberInput,
  useAllAdministrationQuery,
} from '@coop/shared/data-access';
import { FormInput, FormSelect, FormSwitch } from '@coop/shared/form';
import { Box, Button, Icon, IconButton, Modal, Text } from '@coop/shared/ui';

const Map = dynamic(() => import('./Map'), {
  ssr: false,
});

interface IMemberKYMAddress {
  control: Control<KymIndMemberInput | any>;
  watch: UseFormWatch<KymIndMemberInput | any>;
}

export const MemberKYMAddress = ({ control, watch }: IMemberKYMAddress) => {
  const [openModal, setOpenModal] = useState(false);
  const [permanentAddressPosition, setPermanentAddressPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  const setPermanentAddressPositionValues = (prop: {
    latitude: number;
    longitude: number;
  }) => {
    const { latitude, longitude } = prop;
    setPermanentAddressPosition({
      ...permanentAddressPosition,
      latitude,
      longitude,
    });
  };

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };
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
  console.log('hello', permanentAddressPosition);
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
              label="Province"
              placeholder="Select Province"
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
              label="Local Government"
              placeholder="Select Local Government"
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
            <FormInput
              control={control}
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
            onClick={() => {
              onOpenModal();
            }}
          >
            Pin on Map
          </Button>
          <Modal
            open={openModal}
            onClose={onCloseModal}
            isCentered={true}
            size="3xl"
            title={
              <Text
                fontSize="r2"
                color="neutralColorLight.Gray-80"
                fontWeight="SemiBold"
              >
                Pin on map
              </Text>
            }
            footerPrimary1Props={
              <Box px={5} display="flex" justifyContent="flex-end" h={50}>
                <Button onClick={() => setOpenModal(false)}>Save</Button>
              </Box>
            }
          >
            <Map
              position={permanentAddressPosition}
              setPosition={setPermanentAddressPositionValues}
            />
          </Modal>
        </Box>
        {permanentAddressPosition.longitude !== 0 &&
          permanentAddressPosition.latitude !== 0 && (
            <Box
              p={2}
              display="flex"
              border="1px"
              borderColor="gray.200"
              width={455}
              h={70}
              borderRadius={5}
              justifyContent="space-between"
              alignItems="center"
            >
              <Box display="flex" flexDirection="column">
                <Text fontSize="r2">Manbawan, Lalitpur</Text>
                <Text fontSize="s2" color="gray.600">
                  {permanentAddressPosition?.latitude},{' '}
                  {permanentAddressPosition?.longitude}
                </Text>
              </Box>
              <IconButton
                variant={'ghost'}
                aria-label="close"
                icon={<GrClose />}
                onClick={() =>
                  setPermanentAddressPosition({ longitude: 0, latitude: 0 })
                }
              />
            </Box>
          )}
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

        {!isPermanentAndTemporaryAddressSame && (
          <>
            <InputGroupContainer>
              <FormSelect
                control={control}
                name="temporaryStateId"
                label="Province"
                placeholder="Select Province"
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
                label="Local Government"
                placeholder="Select Local Government"
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
              <FormInput
                control={control}
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
