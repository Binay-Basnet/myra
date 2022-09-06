import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  KymCooperativeFormInput,
  useAllAdministrationQuery,
} from '@coop/cbs/data-access';
import { FormInput, FormMap, FormSelect } from '@coop/shared/form';
import { FormSection, GridItem } from '@coop/shared/ui';
import { getKymCoopSection, useTranslation } from '@coop/shared/utils';

import { useCooperative } from '../../hooks/useCooperative';

interface IProps {
  setSection: (section: { section: string; subSection: string }) => void;
}

export const KymCoopRegdAddress = (props: IProps) => {
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
  // useCooperative({ methods });
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
  //     });
  //   }
  // }, [editLoading]);

  // useEffect(() => {
  //   if (id) {
  //     refetch();
  //
  //   }
  // }, [id]);
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
  const currentProvinceId = watch('registeredAddress.provinceId');
  const currentDistrictId = watch('registeredAddress.districtId');
  const currentLocalityId = watch('registeredAddress.localGovernmentId');

  const districtList = useMemo(
    () =>
      data?.administration.all.find((d) => d.id === currentProvinceId)
        ?.districts ?? [],
    [currentProvinceId, data]
  );

  const muncipalityList = useMemo(
    () =>
      districtList.find((d) => d.id === currentDistrictId)?.municipalities ??
      [],
    [currentDistrictId, districtList]
  );
  const wardList = useMemo(
    () => muncipalityList.find((d) => d.id === currentLocalityId)?.wards ?? [],
    [currentLocalityId, muncipalityList]
  );
  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymCoopSection(e.target.id);
          setSection(kymSection);
        }}
      >
        <FormSection
          gridLayout={true}
          id="kymCoopAccRegisteredAddress"
          header="kymCoopRegisteredAddress"
        >
          <FormSelect
            id="registeredCoopAddress"
            name="registeredAddress.provinceId"
            label={t['kymCoopProvince']}
            __placeholder={t['kymCoopSelectState']}
            options={province}
          />
          <FormSelect
            id="registeredCoopAddress"
            name="registeredAddress.districtId"
            label={t['kymCoopDistrict']}
            __placeholder={t['kymCoopSelectDistrict']}
            options={districtList.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />
          <FormSelect
            id="registeredCoopAddress"
            name="registeredAddress.localGovernmentId"
            label={t['kymCoopMunicipality']}
            __placeholder={t['kymCoopSelectMunicipality']}
            options={muncipalityList.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />

          <FormSelect
            id="registeredCoopAddress"
            name="registeredAddress.wardNo"
            label={t['kymCoopWardNo']}
            __placeholder={t['kymCoopEnterWardNo']}
            options={wardList?.map((d) => ({
              label: d,
              value: d,
            }))}
          />
          <FormInput
            id="registeredCoopAddress"
            type="text"
            name="registeredAddress.locality"
            label={t['kymCoopLocality']}
            __placeholder={t['kymCoopEnterLocality']}
          />
          <FormInput
            id="registeredCoopAddress"
            type="text"
            name="registeredAddress.houseNo"
            label={t['kymCoopRepresentativeHouseNo']}
            __placeholder={t['kymCoopRepresentativeEnterHouseNo']}
          />

          <GridItem colSpan={2}>
            <FormMap name="registeredAddress.coordinates" />
          </GridItem>
        </FormSection>
      </form>
    </FormProvider>
  );
};
