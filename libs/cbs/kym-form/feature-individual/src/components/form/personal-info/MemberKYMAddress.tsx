import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  KymIndMemberInput,
  useAllAdministrationQuery,
  useGetIndividualKymEditDataQuery,
  useSetMemberDataMutation,
} from '@coop/shared/data-access';
import { FormInput, FormMap, FormSelect, FormSwitch } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { getKymSection, useTranslation } from '@coop/shared/utils';

interface IMemberKYMAddressProps {
  setKymCurrentSection: (section?: {
    section: string;
    subSection: string;
  }) => void;
}

export const MemberKYMAddress = ({
  setKymCurrentSection,
}: IMemberKYMAddressProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const id = String(router?.query?.['id']);

  const methods = useForm<KymIndMemberInput>();

  const { watch, control, reset } = methods;

  const isPermanentAndTemporaryAddressSame = watch(
    'sameTempAsPermanentAddress'
  );
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
  const currentProvinceId = watch('permanentAddress.provinceId');
  const currentDistrictId = watch('permanentAddress.districtId');
  const currentLocalityId = watch('permanentAddress.localGovernmentId');

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

  const wardList = useMemo(
    () => localityList.find((d) => d.id === currentLocalityId)?.wards ?? [],
    [currentLocalityId]
  );
  // FOR TEMPORARY ADDRESS
  const currentTempProvinceId = watch('temporaryAddress.provinceId');
  const currentTemptDistrictId = watch('temporaryAddress.districtId');
  const currentTempLocalityId = watch('temporaryAddress.localGovernmentId');

  const districtTempList = useMemo(
    () =>
      data?.administration.all.find((d) => d.id === currentTempProvinceId)
        ?.districts ?? [],
    [currentTempProvinceId]
  );

  const localityTempList = useMemo(
    () =>
      districtTempList.find((d) => d.id === currentTemptDistrictId)
        ?.municipalities ?? [],
    [currentTemptDistrictId]
  );

  const wardTempList = useMemo(
    () =>
      localityTempList.find((d) => d.id === currentTempLocalityId)?.wards ?? [],
    [currentTempLocalityId]
  );

  const { data: editValues, isLoading: editLoading } =
    useGetIndividualKymEditDataQuery({
      id: id,
    });

  console.log({
    ind: 'address info',
    data: {
      permanentAddress:
        editValues?.members?.individual?.formState?.data?.formData
          ?.permanentAddress,
      temporaryAddress:
        editValues?.members?.individual?.formState?.data?.formData
          ?.temporaryAddress,
      sameTempAsPermanentAddress:
        editValues?.members?.individual?.formState?.data?.formData
          ?.temporaryAddress?.sameTempAsPermanentAddress,
    },
  });

  useEffect(() => {
    if (editValues) {
      const editValueData =
        editValues?.members?.individual?.formState?.data?.formData;
      console.log('edit value', editValueData);

      console.log({
        permanentAddress: {
          ...editValueData?.permanentAddress,
          locality: editValueData?.permanentAddress?.locality?.local,
        },
        temporaryAddress: {
          ...editValueData?.temporaryAddress?.address,
          locality: editValueData?.temporaryAddress?.address?.locality?.local,
        },
        sameTempAsPermanentAddress:
          editValueData?.temporaryAddress?.sameTempAsPermanentAddress,
      });

      reset({
        permanentAddress: {
          ...editValueData?.permanentAddress,
          locality: editValueData?.permanentAddress?.locality?.local,
        },
        temporaryAddress: {
          ...editValueData?.temporaryAddress?.address,
          locality: editValueData?.temporaryAddress?.address?.locality?.local,
        },
        sameTempAsPermanentAddress:
          editValueData?.temporaryAddress?.sameTempAsPermanentAddress,
        ...editValueData?.rentedHouse,
        landlordName: editValueData?.rentedHouse?.landlordName?.local,
      });
    }
  }, [editValues]);

  const { mutate } = useSetMemberDataMutation({
    onSuccess: (res) => {
      // setError('firstName', {
      //   type: 'custom',
      //   message: res?.members?.individual?.add?.error?.error?.['firstName'][0],
      // });
      console.log(res);
    },
    //   onError: () => {
    //     setError('firstName', { type: 'custom', message: 'gg' });
    //   },
  });

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        mutate({ id: router.query['id'] as string, data });
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSection(e.target.id);
          setKymCurrentSection(kymSection);
        }}
      >
        <GroupContainer>
          <Box
            id="kymAccIndPermanentAddress"
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
                  name="permanentAddress.provinceId"
                  label={t['kymIndProvince']}
                  placeholder={t['kymIndSelectProvince']}
                  options={province}
                />
                <FormSelect
                  name="permanentAddress.districtId"
                  label={t['kymIndDistrict']}
                  placeholder={t['kymIndSelectDistrict']}
                  options={districtList.map((d) => ({
                    label: d.name,
                    value: d.id,
                  }))}
                />
                <FormSelect
                  name="permanentAddress.localGovernmentId"
                  label={t['kymIndLocalGovernment']}
                  placeholder={t['kymIndSelectLocalGovernment']}
                  options={localityList.map((d) => ({
                    label: d.name,
                    value: d.id,
                  }))}
                />
                <FormSelect
                  name="permanentAddress.wardNo"
                  label={t['kymIndWardNo']}
                  placeholder={t['kymIndEnterWardNo']}
                  options={wardList?.map((d) => ({
                    label: d,
                    value: d,
                  }))}
                />
                {/* <FormInput
              type="number"
              name="permanentWardId"
              label={t['kymIndWardNo']}
              placeholder={t['kymIndEnterWardNo']}
            /> */}
                <FormInput
                  type="text"
                  name="permanentAddress.locality"
                  label={t['kymIndLocality']}
                  placeholder={t['kymIndEnterLocality']}
                />
                <FormInput
                  type="text"
                  name="permanentAddress.houseNo"
                  label={t['kymIndHouseNo']}
                  placeholder={t['kymIndEnterHouseNo']}
                />
              </InputGroupContainer>

              <Box mt="-16px">
                <FormMap name="permanentAddress.coordinates" />
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
              {t['kymIndTemporaryAddress']}
            </Text>

            <FormSwitch
              name="sameTempAsPermanentAddress"
              label={t['kymIndTemporaryAddressPermanent']}
            />

            {!isPermanentAndTemporaryAddressSame && (
              <>
                <InputGroupContainer>
                  <FormSelect
                    name="temporaryAddress.provinceId"
                    label={t['kymIndProvince']}
                    placeholder={t['kymIndSelectProvince']}
                    options={province}
                  />
                  <FormSelect
                    name="temporaryAddress.districtId"
                    label={t['kymIndDistrict']}
                    placeholder={t['kymIndSelectDistrict']}
                    options={districtTempList.map((d) => ({
                      label: d.name,
                      value: d.id,
                    }))}
                  />
                  <FormSelect
                    name="temporaryAddress.localGovernmentId"
                    label={t['kymIndLocalGovernment']}
                    placeholder={t['kymIndSelectLocalGovernment']}
                    options={localityTempList.map((d) => ({
                      label: d.name,
                      value: d.id,
                    }))}
                  />
                  <FormSelect
                    name="temporaryAddress.wardNo"
                    label={t['kymIndWardNo']}
                    placeholder={t['kymIndEnterWardNo']}
                    options={wardTempList.map((d) => ({
                      label: d,
                      value: d,
                    }))}
                  />
                  <FormInput
                    type="text"
                    name="temporaryAddress.locality"
                    label={t['kymIndLocality']}
                    placeholder={t['kymIndEnterLocality']}
                  />
                  <FormInput
                    type="text"
                    name="temporaryAddress.houseNo"
                    label={t['kymIndHouseNo']}
                    placeholder={t['kymIndEnterHouseNo']}
                  />
                </InputGroupContainer>

                <Box mt="-16px">
                  <FormMap name="temporaryAddress.coordinates" />
                </Box>
              </>
            )}
          </Box>
          <Box
            id="kymAccIndIncaseofresidinginRentedHouse"
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
      </form>
    </FormProvider>
  );
};
