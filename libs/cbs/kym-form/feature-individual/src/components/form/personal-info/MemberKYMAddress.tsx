import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';
import pickBy from 'lodash/pickBy';

import {
  KymIndMemberInput,
  useAllAdministrationQuery,
  useGetIndividualKymEditDataQuery,
  useSetMemberDataMutation,
} from '@coop/cbs/data-access';
import { FormInput, FormMap, FormSelect, FormSwitch } from '@coop/shared/form';
import { FormSection, GridItem } from '@coop/shared/ui';
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

  const id = router?.query?.['id'];

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

  const { data: editValues } = useGetIndividualKymEditDataQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );

  useEffect(() => {
    if (editValues) {
      const editValueData =
        editValues?.members?.individual?.formState?.data?.formData;

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

  const { mutate } = useSetMemberDataMutation();

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        if (id) {
          mutate({
            id: String(id),
            data: {
              ...data,
              permanentAddress: {
                ...pickBy(data?.permanentAddress ?? {}, (v) => v !== 0),
              },
              temporaryAddress: {
                ...pickBy(data?.temporaryAddress ?? {}, (v) => v !== 0),
              },
            },
          });
        }
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
        <FormSection
          id="kymAccIndPermanentAddress"
          header="kymIndPermanentAddress"
        >
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
          <FormInput
            type="text"
            name="permanentAddress.locality"
            label={t['kymIndLocality']}
            placeholder={t['kymIndEnterLocality']}
          />
          <FormInput
            type="number"
            name="permanentAddress.houseNo"
            label={t['kymIndHouseNo']}
            placeholder={t['kymIndEnterHouseNo']}
          />
          <GridItem colSpan={2}>
            <FormMap name="permanentAddress.coordinates" />
          </GridItem>
        </FormSection>

        {/* <FormSection
          id="kymAccIndTemporaryAddress"
          header="kymIndTemporaryAddress"
        > */}

        <FormSection
          id="kymAccIndTemporaryAddress"
          header="kymIndTemporaryAddress"
        >
          <GridItem colSpan={3}>
            <FormSwitch
              name="sameTempAsPermanentAddress"
              label={t['kymIndTemporaryAddressPermanent']}
            />
          </GridItem>
          {!isPermanentAndTemporaryAddressSame && (
            <>
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
                type="number"
                name="temporaryAddress.houseNo"
                label={t['kymIndHouseNo']}
                placeholder={t['kymIndEnterHouseNo']}
              />
              <GridItem colSpan={2}>
                <FormMap name="temporaryAddress.coordinates" />
              </GridItem>
            </>
          )}
        </FormSection>
        {/* <Box
          id="kymAccIndTemporaryAddress"
          gap="s16"
          display={'flex'}
          flexDirection="column"
          scrollMarginTop={'200px'}
        >
          <Box
            borderBottom={'1px solid'}
            borderBottomColor="border.layout"
            p="s20"
            display="flex"
            flexDirection="column"
            gap="s16"
          >
            <Text
              fontSize="r1"
              fontWeight="semibold"
              color="neutralColorLight.Gray-80"
            >
              {t['kymIndTemporaryAddress']}
            </Text>
            <FormSwitch
              name="sameTempAsPermanentAddress"
              label={t['kymIndTemporaryAddressPermanent']}
            />
          </Box>

         
        </Box> */}
        {/* </FormSection> */}

        <FormSection
          header="kymIndINCASERESIDINGINRENTEDHOUSE"
          id="kymAccIndIncaseofresidinginRentedHouse"
        >
          <FormInput
            type="text"
            name={'landlordName'}
            label={t['kymIndLandlordName']}
            placeholder={t['kymIndLandlordName']}
          />
          <FormInput
            control={control}
            type="number"
            name={'landlordContact'}
            label={t['kymIndContactNo']}
            placeholder={t['kymIndContactNo']}
          />
        </FormSection>
      </form>
    </FormProvider>
  );
};
