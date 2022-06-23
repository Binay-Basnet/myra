import { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FaMap } from 'react-icons/fa';
import dynamic from 'next/dynamic';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { useAllAdministrationQuery } from '@coop/shared/data-access';
import { FormInput, FormSelect, FormSwitch } from '@coop/shared/form';
import { Box, Button, Icon, Modal, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

const MapContainer = dynamic(() => import('./Map'), {
  ssr: false,
});

export const MemberKYMAddress = () => {
  const { t } = useTranslation();
  const { control, watch } = useFormContext();

  const [openModal, setOpenModal] = useState(false);

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
  const position = [51.505, -0.09];
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
          >
            <MapContainer />
          </Modal>
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
