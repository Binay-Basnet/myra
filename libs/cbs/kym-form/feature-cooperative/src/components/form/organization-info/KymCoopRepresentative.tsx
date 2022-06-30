import React from 'react';
import { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { GridItem } from '@chakra-ui/react';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { useAllAdministrationQuery } from '@coop/shared/data-access';
import {
  FormEmailInput,
  FormInput,
  FormMap,
  FormPhoneNumber,
  FormSelect,
  FormSwitch,
} from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const KymCoopRepresentative = () => {
  const { control, watch } = useFormContext();
  const isPermanentAndTemporaryAddressSame = watch(
    'isPermanentAndTemporaryAddressRepresentativeSame'
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
  const currentProvinceId = watch('representativePermanentStateID');
  const currentDistrictId = watch('representativePermanentDistrictId');

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
  const currentTempProvinceId = watch('representativeTemporaryStateId');
  const currentTemptDistrictId = watch('representativeTemporaryDistrictId');

  const districtTempList = useMemo(
    () =>
      data?.administration.all.find((d) => d.id === currentTempProvinceId)
        ?.districts ?? [],
    [currentTempProvinceId]
  );

  const localityTempList = useMemo(
    () =>
      districtList.find((d) => d.id === currentTemptDistrictId)
        ?.municipalities ?? [],
    [currentTemptDistrictId]
  );

  const { t } = useTranslation();
  return (
    <>
      <GroupContainer id="kymCoopAccRepresentative" scrollMarginTop={'200px'}>
        <Text
          fontSize="r1"
          fontWeight="semibold"
          color="neutralColorLight.Gray-80"
        >
          {t['kymCoopRepresentative']}
        </Text>
        <InputGroupContainer>
          <GridItem colSpan={2}>
            <FormInput
              type="text"
              name="representativeFullName"
              label={t['kymCoopName']}
              placeholder={t['kymCoopEnterName']}
            />
          </GridItem>
          <FormInput
            type="text"
            name="representativeDesignatiton"
            label={t['kymCoopDesignation']}
            placeholder={t['kymCoopEnterDesignation']}
          />
          <FormEmailInput
            name={'representativeEmail'}
            label={t['kymCoopRepresentativeEmail']}
            placeholder={t['kymCoopRepresentativeEnterEmail']}
          />
          <FormPhoneNumber
            name={'representativeContact'}
            label={t['kymCoopRepresentativePhone']}
            placeholder={t['kymCoopRepresentativeEnterPhone']}
          />
          <FormInput
            name="representativePanOrVatNo"
            label={t['kymCoopRepresentativePanOrVat']}
            placeholder={t['kymCoopRepresentativeEnterPan']}
          />
        </InputGroupContainer>
      </GroupContainer>
      <GroupContainer>
        <Box
          id="kymAccIndPermanentAddress"
          gap="s32"
          display={'flex'}
          flexDirection="column"
          scrollMarginTop={'200px'}
        >
          <Text fontSize="r1" fontWeight="SemiBold">
            {t['kymCoopRepresentativePermanentAddress']}
          </Text>
          <Box
            id="Permanent Address"
            gap="s32"
            display={'flex'}
            flexDirection="column"
          >
            <InputGroupContainer>
              <FormSelect
                name="representativePermanentStateID"
                label={t['kymCoopRepresentativeProvince']}
                placeholder={t['kymCoopRepresentativeSelectProvince']}
                options={province}
              />
              <FormSelect
                name="representativePermanentDistrictId"
                label={t['kymCoopRepresentativeDistrict']}
                placeholder={t['kymCoopRepresentativeSelectDistrict']}
                options={districtList.map((d) => ({
                  label: d.name,
                  value: d.id,
                }))}
              />
              <FormSelect
                name="representativePermanentLocalityId"
                label={t['kymCoopRepresentativeLocalGovernment']}
                placeholder={t['kymCoopRepresentativeSelectLocalGovernment']}
                options={localityList.map((d) => ({
                  label: d.name,
                  value: d.id,
                }))}
              />
              <FormInput
                type="number"
                name="representativePermanentWardId"
                label={t['kymCoopRepresentativeWardNo']}
                placeholder={t['kymCoopRepresentativeEnterWardNo']}
              />
              <FormInput
                type="text"
                name="representativePermanentTole"
                label={t['kymCoopRepresentativeLocality']}
                placeholder={t['kymCoopRepresentativeEnterLocality']}
              />
              <FormInput
                type="text"
                name="representativePermanentHouseNo"
                label={t['kymCoopRepresentativeHouseNo']}
                placeholder={t['kymCoopRepresentativeEnterHouseNo']}
              />
            </InputGroupContainer>

            <Box mt="-16px">
              <FormMap name="representativePermanentAddressLocation" />
            </Box>
          </Box>
        </Box>
        <Box
          id="kymAccIndTemporaryAddress"
          gap="s32"
          display={'flex'}
          flexDirection="column"
          scrollMarginTop={'200px'}
        >
          <Text fontSize="r1" fontWeight="SemiBold">
            {t['kymCoopRepresentativeTemporaryAddress']}
          </Text>

          <FormSwitch
            name="isPermanentAndTemporaryAddressRepresentativeSame"
            label={t['kymCoopRepresentativeTemporaryAddressPermanent']}
          />

          {!isPermanentAndTemporaryAddressSame && (
            <>
              <InputGroupContainer>
                <FormSelect
                  name="representativeTemporaryStateId"
                  label={t['kymCoopRepresentativeProvince']}
                  placeholder={t['kymCoopRepresentativeSelectProvince']}
                  options={province}
                />
                <FormSelect
                  name="representativeTemporaryDistrictId"
                  label={t['kymCoopRepresentativeDistrict']}
                  placeholder={t['kymCoopRepresentativeSelectDistrict']}
                  options={districtTempList.map((d) => ({
                    label: d.name,
                    value: d.id,
                  }))}
                />
                <FormSelect
                  name="representativeTemporaryLocalityId"
                  label={t['kymCoopRepresentativeLocalGovernment']}
                  placeholder={t['kymCoopRepresentativeSelectLocalGovernment']}
                  options={localityTempList.map((d) => ({
                    label: d.name,
                    value: d.id,
                  }))}
                />
                <FormInput
                  type="number"
                  name="representativeTemporaryWardId"
                  label={t['kymCoopRepresentativeWardNo']}
                  placeholder={t['kymCoopRepresentativeEnterWardNo']}
                />
                <FormInput
                  type="text"
                  name="representativeTemporaryTole"
                  label={t['kymCoopRepresentativeLocality']}
                  placeholder={t['kymCoopRepresentativeEnterLocality']}
                />
                <FormInput
                  type="text"
                  name="representativeTemporaryHouseNo"
                  label={t['kymCoopRepresentativeHouseNo']}
                  placeholder={t['kymCoopRepresentativeEnterHouseNo']}
                />
              </InputGroupContainer>

              <Box mt="-16px">
                <FormMap name="representativeTemporaryAddressLocation" />
              </Box>
            </>
          )}
        </Box>
      </GroupContainer>
    </>
  );
};
