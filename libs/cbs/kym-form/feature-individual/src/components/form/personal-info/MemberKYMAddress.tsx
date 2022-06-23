import { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FaMap } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import dynamic from 'next/dynamic';
import axios from 'axios';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { useAllAdministrationQuery } from '@coop/shared/data-access';
import { FormInput, FormSelect, FormSwitch } from '@coop/shared/form';
import { Box, Button, Icon, IconButton, Modal, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

const Map = dynamic(() => import('./Map'), {
  ssr: false,
});

export const MemberKYMAddress = () => {
  const { t } = useTranslation();
  const { control, watch } = useFormContext();

  const [openModal, setOpenModal] = useState(false);
  const [permanentAddressPosition, setPermanentAddressPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [permanentAddress, setPermanentAddress] = useState('');
  const getAddress = (lat: number, lon: number) =>
    axios.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    );
  useEffect(() => {
    const getPermanentAddress = async () => {
      try {
        const data = await getAddress(
          permanentAddressPosition?.latitude,
          permanentAddressPosition?.longitude
        );
        const address = data?.data?.address;
        setPermanentAddress(
          `${address?.amenity ? address?.amenity + ', ' : ''}${
            address?.road ? address?.road + ', ' : ''
          }${address?.neighbourhood ? address?.neighbourhood + ', ' : ''}${
            address?.suburb ? address?.suburb + ', ' : ''
          }${address?.town ? address?.town + ', ' : ''}${
            address?.city ? address?.city + ', ' : ''
          }${address?.country ? address?.country : ''}`
        );
      } catch (e) {
        console.error('Error:', e);
      }
    };
    getPermanentAddress();
  }, [permanentAddressPosition?.latitude, permanentAddressPosition?.longitude]);

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
          {t['kymIndPermanentAddress']}
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
              label={t['kymIndProvince']}
              placeholder={t['kymIndSelectProvince']}
              options={province}
            />
            <FormSelect
              name="permanentDistrictId"
              label={t['kymIndDistrict']}
              placeholder={t['kymIndSelectDistrict']}
              options={districtList.map((d) => ({
                label: d.name,
                value: d.id,
              }))}
            />
            <FormSelect
              name="permanentLocalityId"
              label={t['kymIndLocalGovernment']}
              placeholder={t['kymIndSelectLocalGovernment']}
              options={localityList.map((d) => ({
                label: d.name,
                value: d.id,
              }))}
            />
            <FormInput
              type="number"
              name="permanentWardId"
              label={t['kymIndWardNo']}
              placeholder={t['kymIndEnterWardNo']}
            />
            <FormInput
              type="text"
              name="permanentTole"
              label={t['kymIndLocality']}
              placeholder={t['kymIndEnterLocality']}
            />
            <FormInput
              type="text"
              name="permanentHouseNo"
              label={t['kymIndHouseNo']}
              placeholder={t['kymIndEnterHouseNo']}
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
            {t['pinOnMap']}
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
                {t['pinOnMap']}
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
                <Text fontSize="r2">{permanentAddress}</Text>
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
          {t['kymIndTemporaryAddress']}
        </Text>

        <FormSwitch
          name="isPermanentAndTemporaryAddressSame"
          label={t['kymIndTemporaryAddressPermanent']}
        />

        {!isPermanentAndTemporaryAddressSame && (
          <>
            <InputGroupContainer>
              <FormSelect
                name="temporaryStateId"
                label={t['kymIndProvince']}
                placeholder={t['kymIndSelectProvince']}
                options={province}
              />
              <FormSelect
                name="temporaryDistrictId"
                label={t['kymIndDistrict']}
                placeholder={t['kymIndSelectDistrict']}
                options={districtTempList.map((d) => ({
                  label: d.name,
                  value: d.id,
                }))}
              />
              <FormSelect
                name="temporaryLocalityId"
                label={t['kymIndLocalGovernment']}
                placeholder={t['kymIndSelectLocalGovernment']}
                options={localityTempList.map((d) => ({
                  label: d.name,
                  value: d.id,
                }))}
              />
              <FormInput
                type="number"
                name="temporaryWardId"
                label={t['kymIndWardNo']}
                placeholder={t['kymIndEnterWardNo']}
              />
              <FormInput
                type="text"
                name="temporaryTole"
                label={t['kymIndLocality']}
                placeholder={t['kymIndEnterLocality']}
              />
              <FormInput
                type="text"
                name="temporaryHouseNo"
                label={t['kymIndHouseNo']}
                placeholder={t['kymIndEnterHouseNo']}
              />
            </InputGroupContainer>
            <Button
              mt="-16px"
              alignSelf="start"
              leftIcon={<Icon size="md" as={FaMap} />}
            >
              {t['pinOnMap']}
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
          {t['kymIndINCASERESIDINGINRENTEDHOUSE']}
        </Text>
        <InputGroupContainer>
          <FormInput
            type="text"
            name={'landlordName'}
            label={t['kymIndLandlordName']}
            placeholder={t['kymIndLandlordName']}
          />
          <FormInput
            control={control}
            type="text"
            name={'landlordContact'}
            label={t['kymIndContactNo']}
            placeholder={t['kymIndContactNo']}
          />
        </InputGroupContainer>
      </Box>
    </GroupContainer>
  );
};
