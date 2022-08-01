import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  KymInsInput,
  useAllAdministrationQuery,
} from '@coop/shared/data-access';
import { FormInput, FormMap, FormSelect } from '@coop/shared/form';
import { Box, GridItem, Text } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

import { useInstitution } from '../hooks/institutionHook';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}
export const RegisteredDetailsInstitution = (props: IProps) => {
  const { t } = useTranslation();

  const methods = useForm<KymInsInput>();
  const { setSection } = props;

  const { watch } = methods;
  useInstitution({ methods });

  const { data } = useAllAdministrationQuery();

  const province = useMemo(() => {
    return (
      data?.administration?.all?.map((d) => ({
        label: d.name,
        value: d.id,
      })) ?? []
    );
  }, [data?.administration?.all]);

  const currentProvinceId = watch('registeredAddress.provinceId');
  const currentDistrictId = watch('registeredAddress.districtId');
  const currentLocalityId = watch('registeredAddress.localGovernmentId');

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
  return (
    <FormProvider {...methods}>
      <form
        // onChange={debounce(() => {
        //   console.log('hello', getValues());
        //   mutate({ id, data: getValues() });
        // }, 800)}
        // onSubmit={handleSubmit((data) => {
        //   console.log('data', data);
        // })}
        onFocus={(e) => {
          const kymSection = getKymSectionInstitution(e.target.id);
          setSection(kymSection);
        }}
      >
        <GroupContainer id="kymInsRegisteredDetails" scrollMarginTop={'200px'}>
          <Text
            fontSize="r1"
            fontWeight="semibold"
            color="neutralColorLight.Gray-80"
          >
            {t['kymInsRegisteredDetails']}
          </Text>
          <InputGroupContainer>
            <FormInput
              type="number"
              name="registeredNumber"
              label={t['kymInsRegisteredNumber']}
              placeholder={t['kymInsEnterRegisteredNumber']}
            />
            <GridItem colSpan={2}>
              <FormInput
                type="text"
                name="issuingOffice"
                label={t['kymInsIssuingOffice']}
                placeholder={t['kymInsEnterIssuingOffice']}
              />
            </GridItem>
            <FormSelect
              name="registeredAddress.provinceId"
              label={t['kymIndProvince']}
              placeholder={t['kymIndSelectProvince']}
              options={province}
            />
            <FormSelect
              name="registeredAddress.districtId"
              label={t['kymIndDistrict']}
              placeholder={t['kymIndSelectDistrict']}
              options={districtList.map((d) => ({
                label: d.name,
                value: d.id,
              }))}
            />
            <FormSelect
              name="registeredAddress.localGovernmentId"
              label={t['kymIndLocalGovernment']}
              placeholder={t['kymIndSelectLocalGovernment']}
              options={localityList.map((d) => ({
                label: d.name,
                value: d.id,
              }))}
            />
            <FormSelect
              name="registeredAddress.wardNo"
              label={t['kymIndWardNo']}
              placeholder={t['kymIndEnterWardNo']}
              options={wardList?.map((d) => ({
                label: d,
                value: d,
              }))}
            />
            <FormInput
              type="text"
              name="registeredAddress.locality"
              label={t['kymIndLocality']}
              placeholder={t['kymIndEnterLocality']}
            />
            <FormInput
              type="text"
              name="registeredAddress.houseNo"
              label={t['kymIndHouseNo']}
              placeholder={t['kymIndEnterHouseNo']}
            />
          </InputGroupContainer>

          <Box mt="-16px">
            <FormMap name="registeredAddress.coordinates" />
          </Box>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
