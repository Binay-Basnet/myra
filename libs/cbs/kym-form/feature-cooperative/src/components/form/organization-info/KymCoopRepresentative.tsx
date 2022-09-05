import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { GridItem } from '@chakra-ui/react';

import {
  KymCooperativeFormInput,
  useAllAdministrationQuery,
} from '@coop/cbs/data-access';
import {
  FormEmailInput,
  FormInput,
  FormMap,
  FormPhoneNumber,
  FormSelect,
  FormSwitch,
} from '@coop/shared/form';
import { FormSection } from '@coop/shared/ui';
import { getKymCoopSection, useTranslation } from '@coop/shared/utils';

import { useCooperative } from '../../hooks/useCooperative';

interface IProps {
  setSection: React.Dispatch<
    React.SetStateAction<{ section: string; subSection: string }>
  >;
}

export const KymCoopRepresentative = (props: IProps) => {
  const { t } = useTranslation();
  const { setSection } = props;
  const methods = useForm<KymCooperativeFormInput>({
    defaultValues: {},
  });
  const { watch } = methods;
  useCooperative({ methods });
  // const router = useRouter();
  // const id = String(router?.query?.['id']);

  // const { mutate } = useSetCooperativeDataMutation();
  // const {
  //   data: editValues,
  //   isLoading: editLoading,
  //   refetch,
  // } = useGetCoOperativeKymEditDataQuery(
  //   {
  //     id: id,
  //   },
  //   { enabled: id !== 'undefined' }
  // );

  // useEffect(() => {
  //   const subscription = watch(
  //     debounce((data) => {
  //       if (editValues && data) {
  //         mutate({ id: router.query['id'] as string, data });
  //         refetch();
  //       }
  //     }, 800)
  //   );

  //   return () => subscription.unsubscribe();
  // }, [watch, router.isReady, editValues]);

  // useEffect(() => {
  //   if (editValues) {
  //     const editValueData =
  //       editValues?.members?.cooperative?.formState?.data?.formData;

  //     reset({
  //       ...pickBy(
  //         editValues?.members?.cooperative?.formState?.data?.formData ?? {},
  //         (v) => v !== null
  //       ),
  //       permanentRepresentativeAddress: {
  //         ...editValueData?.permanentRepresentativeAddress,
  //         locality:
  //           editValueData?.permanentRepresentativeAddress?.locality?.local,
  //       },
  //       temporaryRepresentativeAddress: {
  //         ...editValueData?.temporaryRepresentativeAddress,
  //         locality:
  //           editValueData?.temporaryRepresentativeAddress?.locality?.local,
  //       },
  //     });
  //   }
  // }, [editLoading]);
  // // useEffect(() => {
  // //   if (id) {
  // //     refetch();
  // //
  // //   }
  // // }, [id]);
  // const isPermanentAndTemporaryAddressSame = watch(
  //   'isPermanentAndTemporaryAddressSame'
  // );
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
  const currentProvinceId = watch('permanentRepresentativeAddress.provinceId');
  const currentDistrictId = watch('permanentRepresentativeAddress.districtId');
  const currentLocalityId = watch(
    'permanentRepresentativeAddress.localGovernmentId'
  );
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
  const currentTempProvinceId = watch(
    'temporaryRepresentativeAddress.provinceId'
  );
  const currentTemptDistrictId = watch(
    'temporaryRepresentativeAddress.districtId'
  );
  const currentTempLocalityId = watch(
    'temporaryRepresentativeAddress.localGovernmentId'
  );

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
  const isPermanentAndTemporaryAddressSame = watch(
    'isPermanentAndTemporaryAddressSame'
  );
  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymCoopSection(e.target.id);
          setSection((prev) =>
            prev?.subSection !== kymSection.subSection ? kymSection : prev
          );
        }}
      >
        <FormSection
          gridLayout={true}
          id="kymCoopAccRepresentative"
          header="kymCoopRepresentative"
        >
          <GridItem colSpan={2}>
            <FormInput
              type="text"
              name="representativeFullName"
              label={t['kymCoopName']}
              __placeholder={t['kymCoopEnterName']}
            />
          </GridItem>
          <FormInput
            type="text"
            name="representativeDesignatiton"
            label={t['kymCoopDesignation']}
            __placeholder={t['kymCoopEnterDesignation']}
          />
          <FormEmailInput
            name={'representativeEmail'}
            label={t['kymCoopRepresentativeEmail']}
            __placeholder={t['kymCoopRepresentativeEnterEmail']}
          />
          <FormPhoneNumber
            name={'representativeContactNumber'}
            label={t['kymCoopRepresentativePhone']}
            __placeholder={t['kymCoopRepresentativeEnterPhone']}
          />
          <FormInput
            name="representativePanNo"
            label={t['kymCoopRepresentativePanOrVat']}
            __placeholder={t['kymCoopRepresentativeEnterPan']}
          />
        </FormSection>

        <FormSection
          gridLayout={true}
          id="kymAccIndPermanentAddress"
          header="kymCoopRepresentativePermanentAddress"
        >
          <FormSelect
            name="permanentRepresentativeAddress.provinceId"
            label={t['kymCoopRepresentativeProvince']}
            __placeholder={t['kymCoopRepresentativeSelectProvince']}
            options={province}
          />
          <FormSelect
            name="permanentRepresentativeAddress.districtId"
            label={t['kymCoopRepresentativeDistrict']}
            __placeholder={t['kymCoopRepresentativeSelectDistrict']}
            options={districtList.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />
          <FormSelect
            name="permanentRepresentativeAddress.localGovernmentId"
            label={t['kymCoopRepresentativeLocalGovernment']}
            __placeholder={t['kymCoopRepresentativeSelectLocalGovernment']}
            options={localityList.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />
          <FormSelect
            name="permanentRepresentativeAddress.wardNo"
            label={t['kymCoopRepresentativeWardNo']}
            __placeholder={t['kymCoopRepresentativeEnterWardNo']}
            options={wardList?.map((d) => ({
              label: d,
              value: d,
            }))}
          />
          <FormInput
            type="text"
            name="permanentRepresentativeAddress.locality"
            label={t['kymCoopRepresentativeLocality']}
            __placeholder={t['kymCoopRepresentativeEnterLocality']}
          />
          <FormInput
            type="text"
            name="permanentRepresentativeAddress.houseNo"
            label={t['kymCoopRepresentativeHouseNo']}
            __placeholder={t['kymCoopRepresentativeEnterHouseNo']}
          />

          <GridItem colSpan={2}>
            <FormMap name="permanentRepresentativeAddress.coordinates" />
          </GridItem>
        </FormSection>

        <FormSection
          gridLayout={true}
          id="kymAccIndTemporaryAddress"
          header="kymCoopRepresentativeTemporaryAddress"
        >
          <GridItem colSpan={3}>
            <FormSwitch
              name="isPermanentAndTemporaryAddressSame"
              label={t['kymCoopRepresentativeTemporaryAddressPermanent']}
            />
          </GridItem>

          {!isPermanentAndTemporaryAddressSame && (
            <>
              <FormSelect
                name="temporaryRepresentativeAddress.provinceId"
                label={t['kymCoopRepresentativeProvince']}
                __placeholder={t['kymCoopRepresentativeSelectProvince']}
                options={province}
              />
              <FormSelect
                name="temporaryRepresentativeAddress.districtId"
                label={t['kymCoopRepresentativeDistrict']}
                __placeholder={t['kymCoopRepresentativeSelectDistrict']}
                options={districtTempList.map((d) => ({
                  label: d.name,
                  value: d.id,
                }))}
              />
              <FormSelect
                name="temporaryRepresentativeAddress.localGovernmentId"
                label={t['kymCoopRepresentativeLocalGovernment']}
                __placeholder={t['kymCoopRepresentativeSelectLocalGovernment']}
                options={localityTempList.map((d) => ({
                  label: d.name,
                  value: d.id,
                }))}
              />
              <FormSelect
                name="temporaryRepresentativeAddress.wardNo"
                label={t['kymCoopRepresentativeWardNo']}
                __placeholder={t['kymCoopRepresentativeEnterWardNo']}
                options={wardTempList.map((d) => ({
                  label: d,
                  value: d,
                }))}
              />
              <FormInput
                type="text"
                name="temporaryRepresentativeAddress.locality"
                label={t['kymCoopRepresentativeLocality']}
                __placeholder={t['kymCoopRepresentativeEnterLocality']}
              />
              <FormInput
                type="text"
                name="temporaryRepresentativeAddress.houseNo"
                label={t['kymCoopRepresentativeHouseNo']}
                __placeholder={t['kymCoopRepresentativeEnterHouseNo']}
              />

              <GridItem colSpan={2}>
                <FormMap name="temporaryRepresentativeAddress.coordinates" />
              </GridItem>
            </>
          )}
        </FormSection>
      </form>
    </FormProvider>
  );
};
